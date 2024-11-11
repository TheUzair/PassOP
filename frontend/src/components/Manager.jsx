import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";
import Modal from "./Modal";

const Manager = () => {
  const ref = useRef();
  const passwdRef = useRef();
  const [form, setForm] = useState({ site: "", userName: "", passWord: "" });
  const [passwdArray, setPasswdArray] = useState([]);
  const [showModal, setShowModal] = useState(false); 
  const [deleteId, setDeleteId] = useState(null); 
  const [editMode, setEditMode] = useState(false); 
  const [originalId, setOriginalId] = useState(null); 
  const [isUpdateDisabled, setIsUpdateDisabled] = useState(true); 
  const [originalForm, setOriginalForm] = useState({
    site: "",
    userName: "",
    passWord: "",
  });

  const getPasswords = async () => {
    let req = await fetch("https://passop-xfz3.onrender.com");
    let passwords = await req.json();
    setPasswdArray(passwords);
  };

  useEffect(() => {
    getPasswords();
  }, []);

  useEffect(() => {
    if (editMode) {
      if (
        form.site !== originalForm.site ||
        form.userName !== originalForm.userName ||
        form.passWord !== originalForm.passWord
      ) {
        setIsUpdateDisabled(false); 
      } else {
        setIsUpdateDisabled(true); 
      }
    } else {
      setIsUpdateDisabled(false); 
    }
  }, [form, originalForm, editMode]); 

  useEffect(() => {
    const allFieldsFilled = form.site.length > 0 && form.userName.length > 0 && form.passWord.length > 0;
    setIsUpdateDisabled(!allFieldsFilled || (editMode && (form.site === originalForm.site && form.userName === originalForm.userName && form.passWord === originalForm.passWord)));
  }, [form, originalForm, editMode]);



  const copyText = (text) => {
    toast("Copied to clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    if (passwdRef.current) {
      passwdRef.current.type =
        passwdRef.current.type === "password" ? "text" : "password";
      ref.current.src = ref.current.src.includes("visibility.png")
        ? "icons/visibility_off.png"
        : "icons/visibility.png";
    }
  };

  const editPasswd = (id) => {
    const itemToEdit = passwdArray.find((item) => item.id === id);
    setForm(itemToEdit);
    setOriginalForm(itemToEdit); 
    setOriginalId(id); 
    setEditMode(true); 
    setIsUpdateDisabled(true); 
  };

  const cancelEdit = () => {
    setForm({ site: "", userName: "", passWord: "" }); 
    setEditMode(false); 
    setIsUpdateDisabled(true); 
  };

  const savePassword = async () => {
    if (
      form.site.length > 3 &&
      form.userName.length > 3 &&
      form.passWord.length > 3
    ) {
      try {
        if (editMode) {
          
          await fetch("https://passop-xfz3.onrender.com", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: originalId, ...form }), 
          });
          setEditMode(false);
        } else {
          
          await fetch("https://passop-xfz3.onrender.com", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...form, id: uuidv4() }),
          });
        }
        setForm({ site: "", userName: "", passWord: "" });
        setOriginalId(null);
        getPasswords(); 
        toast("Saved successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } catch (error) {
        console.error("Error saving password:", error);
        toast("Error: Password not saved!!");
      }
    } else {
      toast("Error: Please fill in all fields!");
    }
  };

  const deletePasswd = async (id) => {
    setShowModal(true); 
    setDeleteId(id); 
  };

  const confirmDelete = async () => {
    if (deleteId === null) return;

    try {
      const response = await fetch("https://passop-xfz3.onrender.com", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: deleteId }),
      });
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      const data = await response.json();
      setPasswdArray(data.result); 
      toast("Deleted successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.error("Error deleting password:", error);
      toast.error("Error: Password not deleted!!");
    } finally {
      setShowModal(false); 
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition="Bounce"
      />
      <ToastContainer />

      <div className="md:mycontainer p-2 overflow-x-hidden min-h-screen mx-auto">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-500">&lt;</span>
          <span>Pass</span>
          <span className="text-green-500">OP/&gt;</span>
        </h1>

        <p className="text-green-900 text-lg text-center">
          Your own Password Manager
        </p>

        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input
            onChange={handleChange}
            type="text"
            placeholder="Enter the website"
            value={form.site}
            id="site"
            name="site"
            className="rounded-full border border-green-500 w-full p-4 py-3"
          />
          <div className="flex md:flex-row flex-col justify-between gap-8 w-full">
            <input
              onChange={handleChange}
              type="text"
              placeholder="Enter username"
              value={form.userName}
              id="username"
              name="userName"
              className="rounded-full border border-green-500 w-full p-4 py-3"
            />
            <div className="relative">
              <input
                ref={passwdRef}
                onChange={handleChange}
                type="password"
                placeholder="Enter password"
                value={form.passWord}
                id="password"
                name="passWord"
                className="rounded-full border border-green-500 w-full p-4 py-3"
              />

              <span
                onClick={showPassword}
                className="absolute right-[3px] top-[8px] cursor-pointer"
              >
                <img
                  ref={ref}
                  src="icons/visibility.png"
                  alt="eye"
                  className="p-1 eye-icon"
                  width={24}
                />
              </span>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={savePassword}
              disabled={editMode ? isUpdateDisabled : !form.site || !form.userName || !form.passWord}
              className={`flex justify-center items-center ${
                editMode
                  ? isUpdateDisabled
                    ? "bg-indigo-500 border-2 border-indigo-500 cursor-not-allowed opacity-50"
                    : "bg-indigo-600 border-2 border-indigo-500 hover:bg-indigo-300"
                  : isUpdateDisabled
                  ? "bg-green-400 border-2 border-green-500 cursor-not-allowed opacity-50"
                  : "bg-green-400 border-2 border-green-500 hover:bg-green-300" } px-5 py-3 gap-3 text-white rounded-full border-2 transition duration-300 ease-in-out`} > <span className="material-symbols-outlined">
                  {editMode ? "update" : "add_task"}
                </span>
                {editMode ? "Update" : "Save"}{" "} 
            </button>
            <button
              onClick={editMode ? cancelEdit : () => setForm({ site: "", userName: "", passWord: "" })}
              disabled={editMode ? false : !form.site && !form.userName && !form.passWord}
              className={`flex justify-center items-center ${editMode
                ? "bg-red-400 hover:bg-red-300"
                : form.site || form.userName || form.passWord
                  ? "bg-blue-400 hover:bg-blue-300"
                  : "bg-blue-400 cursor-not-allowed opacity-50"
                } rounded-full px-5 py-2 gap-2 border-2 ${editMode ? "border-red-500" : "border-blue-500"}`}
            >
                <span className="material-symbols-outlined">
                {editMode ? "cancel" : "clear"}
              </span>
              {editMode ? "Cancel" : "Clear"}
            </button>
          </div>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwdArray.length === 0 && <div>No passwords to show</div>}
          {passwdArray.length !== 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwdArray.map((item, idx) => (
                  <tr key={idx}>
                    <td className="text-center py-2 border border-white">
                      <div className="flex justify-center items-center">
                        <a href={item.site} target="_blank">
                          {item.site}
                        </a>
                        <div
                          className="size-7 cursor-pointer copy-icon"
                          onClick={() => {
                            copyText(item.site);
                          }}
                        >
                          <span className="material-symbols-outlined w-6 h-6 pl-1 hover:opacity-75">
                            content_copy
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="text-center py-2 border border-white">
                      <div className="flex justify-center items-center">
                        <span>{item.userName}</span>
                        <div
                          className="size-7 cursor-pointer copy-icon"
                          onClick={() => copyText(item.userName)}
                        >
                          <span className="material-symbols-outlined w-6 h-6 pl-1 hover:opacity-75">
                            content_copy
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="text-center py-2 border border-white">
                      <div className="flex justify-center items-center">
                        <span>{"*".repeat(item.passWord.length)}</span>
                        <div
                          className="size-7 cursor-pointer copy-icon"
                          onClick={() => copyText(item.passWord)}
                        >
                          <span className="material-symbols-outlined w-6 h-6 pl-1 hover:opacity-75">
                            content_copy
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-2 text-center border border-white">
                      <button
                        onClick={() => editPasswd(item.id)}
                        className="bg-yellow-400 hover:bg-yellow-300 icon rounded-full px-2 py-1 mx-1"
                      >
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                      <button
                        onClick={() => deletePasswd(item.id)}
                        className="bg-red-400 hover:bg-red-300 icon rounded-full px-2 py-1 mx-1"
                      >
                        <span className="material-symbols-outlined">
                          delete
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {showModal && (
        <Modal confirmDelete={confirmDelete} setShowModal={setShowModal} />
      )}
    </>
  );
};

export default Manager;
