# Task Manager Fullstack

A full-stack task management app where users can add, edit, and delete tasks. Built with Node.js, MongoDB, and React.

![License](https://img.shields.io/badge/license-MIT-green)

---

## Table of Contents

- [About the Project](#about-the-project)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contact](#contact)

---

## About the Project

The **Task Manager Fullstack** application allows users to manage their daily tasks efficiently. The app provides:

- User authentication for secure task management.
- CRUD operations to add, edit, delete, and view tasks.
- A responsive user interface built with React.

---

## Getting Started

To get a local copy up and running, follow these steps:

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community)
- A Git client (e.g., Git Bash, Terminal, etc.)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/task-manager-fullstack.git
   cd task-manager-fullstack
   ```

2. Navigate to the backend directory and install dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Navigate to the frontend directory and install dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

4. Start the MongoDB server on your machine.

5. Create a `.env` file in the `backend` directory and configure environment variables:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/taskmanager
   JWT_SECRET=your_jwt_secret
   ```

---

## Usage

1. Run the backend server:
   ```bash
   cd backend
   npm start
   ```

2. Run the frontend server:
   ```bash
   cd ../frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000` to use the application.

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

## Contact

Your Name - [mostafameerzad@gmail.com](mostafameerzad@gmail.com)

Repository Link: [GitHub](https://github.com/mostafa-meerzad/Task-Manager-fullstack)
