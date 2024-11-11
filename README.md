# PassOp - Password Manager

## Overview

PassOp is a secure password management application built with React and Vite, featuring a MongoDB backend.

## Features

- Secure password storage
- Password generation
- User authentication via GitHub OAuth
- Responsive UI with Tailwind CSS
- Real-time notifications using React Toastify

## Tech Stack

### Frontend
- **React** - UI framework
- **Vite** - Fast build tool
- **Tailwind CSS** - Styling framework
- **React Toastify** - Notification system
- **UUID** - Unique identifier generator

### Backend
- **Express.js** - Server framework
- **MongoDB** - Database
- **Passport.js** - GitHub OAuth authentication
- **CORS** - Cross-origin requests
- **dotenv** - Environment variable management

## Getting Started

### Prerequisites
- **Node.js** - [Download Node.js](https://nodejs.org/)
- **MongoDB** - [Download MongoDB](https://www.mongodb.com/try/download/community)
- **Git** - [Download Git](https://git-scm.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/TheUzair/PassOP.git](https://github.com/TheUzair/PassOP.git)
   ```

2. **Install frontend dependencies:**
   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies:**
   ```bash
   cd ../backend
   npm install
   ```

4. **Configure environment variables:**
   Create a `.env` file in the backend directory with:
   ```plaintext
   MONGO_URI=your_mongodb_connection_string
   ```

### Running the Application

1. **Start the backend server:**
   ```bash
   cd backend
   node server.js
   ```

2. **Start the frontend development server:**
   ```bash
   cd ../frontend
   npm run dev
   ```

   - The frontend application will be available at [http://localhost:5173](http://localhost:5173)
   - The backend server runs on [http://localhost:3000](http://localhost:3000)

## Development Scripts

- **`npm run dev`** - Start development server
- **`npm run build`** - Build for production
- **`npm run preview`** - Preview production build
- **`npm run lint`** - Run ESLint

## Contributing

1. **Fork the repository**
2. **Create your feature branch:** `git checkout -b feature/AmazingFeature`
3. **Commit your changes:** `git commit -m 'Add AmazingFeature'`
4. **Push to the branch:** `git push origin feature/AmazingFeature`
5. **Open a Pull Request**

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.