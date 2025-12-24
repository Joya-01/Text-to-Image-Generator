# Imagify

**Imagify** is a full-stack web application that allows users to generate stunning images from text prompts using AI-powered tools. The project is built with a **React** frontend and a **Node.js** backend, integrated with **PostgreSQL** for database management. It also includes user authentication, a credit-based image generation system, and a seamless user experience.

---

## Features

- **AI-Powered Image Generation**: Generate high-quality images from text prompts using the ClipDrop API.
- **User Authentication**: Secure login and registration with JWT-based authentication.
- **Credit System**: Users can generate images based on their available credits and purchase additional credits.
- **Responsive Design**: Fully responsive UI built with TailwindCSS.
- **Dynamic Routing**: Smooth navigation using React Router.
- **Toast Notifications**: Real-time feedback for user actions using React Toastify.

---

## Tech Stack

### Frontend
- React – Component-based UI development
- Vite – Fast development server and build tool
- TailwindCSS – Utility-first CSS framework
- React Router – Routing and navigation
- React Toastify – Toast notifications

### Backend
- Node.js – JavaScript runtime for server-side logic
- Express.js – Web framework for RESTful APIs
- PostgreSQL – Relational database for user and credit management
- JWT – Secure user authentication
- Axios – For making HTTP requests to the ClipDrop API

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/imagify.git
cd imagify
```
### 2. Install Dependencies
- Frontend:
```
cd client
npm install
```

- Backend
```
cd ../server
npm install
```

### 3. Environment Variables
- Create .env files in both the client and server directories.
#### Client .env
- VITE_BACKEND_URL=http://localhost:4000

#### Server .env
- POSTGRE_URL=your_postgresql_connection_string
- JWT_SECRET_KEY=your_jwt_secret_key
- CLIPDROP_API=your_clipdrop_api_key

### Run the Application:
- Backend:
```
cd server
npm run server
```

- Frontend:
```
cd client
npm run dev
```

## Access the Application
- Open your browser and navigate to:
http://localhost:5173 
