# Attendance app

## Overview

This app allows users and admins to keep track of attendance and store and download attendance records in a systematic manner.

## Features

1. Mark attendance and recieve data of students present on admin side on daily basis.
2. Login sessions using JWT.
3. Filter student's attendance with date.
4. Auto absent at end of the day when not marked present by an user.
   Note - For users(students), the username and passwords already stored in database, and provided to them to login. For admins(profs), a username is provided only, to enter admin dashboard and see users' attendance.

## Deployment

Link - https://attendance-app-pc5m.vercel.app/
Frontend on Vercel
Backend on Render

## Technologies Used

ReactJS, Tailwind CSS, NodeJS, ExpressJS, MongoDB, JWT, BcryptJS, JSON2CSV, Cron.

## Running the Project Locally

- Clone the GitHub Repository

```bash
git clone https://github.com/AadityaRaj77/Attendance-app.git
```

- Install required packages in frontend and backend

```bash
npm install
```

- Create `.env` file in `backend/` and add

```bash
MONGO_URI=mongodb://localhost:27017/attendance
JWT_SECRET=mysecretkey
ADMIN_PASSWORD=admin123
```

- Create `.env` file in `frontend` and add

```bash
VITE_API_URL=http://localhost:3000
```

- Now, run the frontend and backend with `npm run dev` and `node app.js` respectively.

## Testing

- For Admin login,
  Username - admin1
- For User login,
  Username - student1
  Password - 123456
  &
  Username - student2
  Password - hello123
