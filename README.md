This is a Task Manager Application that allows users to manage their tasks with different statuses (active/completed) and priorities. The app consists of a frontend built with React and a backend powered by Node.js and Express, with a MongoDB database to store user tasks.

Table of Contents:
Setup Instructions
Frontend:
Navigate to the frontend folder:
cd Frontend
npm install
npm start
The app will be available at http://localhost:3000 or any other local port .


Backend setup:
Navigate to the backend folder:
cd backend
npm install
Create a .env file in the backend folder with the following content:
MONGO_URI=mongodb://localhost:298017/taskmanager
JWT_SECRET=your_secret_key
PORT=5000
npm start



Technical Choices & Architecture
This project uses a MERN stack:
MongoDB for the database.
Express.js as the backend framework.
React for the frontend.
Node.js as the runtime environment.
The frontend communicates with the backend via RESTful APIs, and JWT authentication is used to handle user login and session management.
The architecture follows a Model-View-Controller (MVC) pattern for the backend, which keeps the business logic, routing, and database operations well separated.


Database Schema
Tasks Collection
{
  _id: ObjectId,
  title: String,
  description: String,
  status: { type: String, enum: ['incomplete', 'complete'] },
  priority: { type: String, enum: ['low', 'medium', 'high'] },
  user: { type: ObjectId, ref: 'User' },
  createdAt: Date,
  updatedAt: Date
}

Users Collection
{
  _id: ObjectId,
  username: String,
  email: String,
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}



How to Run the Application Locally
clone the repo:
git clone https://github.com/your-username/task-manager.git
Set up the backend:

Navigate to the backend folder.

Install dependencies and configure the environment.

Start the backend server.

Set up the frontend:

Navigate to the frontend folder.

Install dependencies and run the frontend server.

Access the application:

Open the browser and navigate to http://localhost:3000 for the frontend.

The backend is running on http://localhost:5000.


Seed Data


email:pihu@xyz.com
password:pihu123

email:tushar@example.com
password:teshu123

