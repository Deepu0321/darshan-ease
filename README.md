# DarshanEase – Temple Appointment Booking System

## 📖 Project Description

**DarshanEase** is a web-based temple appointment booking system developed using the **MERN Stack (MongoDB, Express.js, React.js, and Node.js)**. The application enables devotees to register, log in, browse temple details, book darshan slots, make donations, and manage their bookings online. It also provides dedicated dashboards for organizers and administrators to efficiently manage temples, slots, bookings, donations, and users.

The project aims to reduce long waiting queues, eliminate manual booking processes, and provide a secure, convenient, and user-friendly online appointment management system.

---

# 🚀 Features

* User Registration and Login
* JWT Authentication
* Role-Based Access Control (User, Organizer, Admin)
* Temple Management
* Darshan Slot Management
* Online Darshan Booking
* Donation Management
* User Profile Management
* Booking History
* Organizer Dashboard
* Admin Dashboard
* RESTful APIs
* MongoDB Database Integration

---

# 🛠 Technologies Used

### Frontend

* React.js
* HTML5
* CSS3
* JavaScript
* Axios

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* JSON Web Token (JWT)
* bcrypt.js

### Testing

* Postman
* Thunder Client

### Development Tools

* Visual Studio Code
* Git
* GitHub

---

# 📂 Project Structure

```
darshan-ease/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/darshan-ease.git
```

```
cd darshan-ease
```

---

## Backend Setup

```
cd backend
```

Install dependencies

```
npm install
```

Create a **.env** file

```
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

Run backend

```
npm start
```

or

```
node server.js
```

---

## Frontend Setup

```
cd frontend
```

Install packages

```
npm install
```

Run React application

```
npm start
```

Frontend runs on

```
http://localhost:3000
```

Backend runs on

```
http://localhost:5000
```

---

# 📌 API Endpoints

## User

```
POST   /api/users/register
POST   /api/users/login
```

## Profile

```
GET    /api/profile
PUT    /api/profile
```

## Temples

```
GET    /api/temples
POST   /api/temples
PUT    /api/temples/:id
DELETE /api/temples/:id
```

## Slots

```
GET    /api/slots
POST   /api/slots
```

## Bookings

```
POST   /api/bookings
GET    /api/bookings/my-bookings
PUT    /api/bookings/cancel/:id
```

## Donations

```
POST   /api/donations
GET    /api/donations
```

## Organizer

```
GET    /api/organizer/dashboard
```

## Admin

```
GET    /api/admin/dashboard
```

---

# 👥 User Roles

### User

* Register/Login
* View Temples
* Book Darshan Slots
* Cancel Booking
* Make Donations
* Update Profile

### Organizer

* Manage Temple Slots
* View Organizer Dashboard
* Manage Temple Information

### Admin

* Manage Users
* Manage Temples
* Manage Bookings
* Manage Donations
* View Admin Dashboard

---

# 🔐 Security Features

* JWT Authentication
* Password Encryption using bcrypt
* Role-Based Authorization
* Protected Routes
* Input Validation
* Error Handling Middleware

---

# 🧪 Testing

The application was tested using:

* Functional Testing
* API Testing
* Performance Testing
* Postman
* Thunder Client

---

# 📈 Future Enhancements

* Online Payment Gateway
* Email Notifications
* SMS Alerts
* QR Code Entry Verification
* Cloud Deployment (AWS/Azure)
* Mobile Application
* AI-based Slot Recommendation

---

# 📷 System Workflow

```
User Registration/Login
        ↓
Authentication
        ↓
View Temples
        ↓
Select Temple
        ↓
View Available Slots
        ↓
Book Darshan
        ↓
Booking Confirmation
        ↓
Make Donation (Optional)
        ↓
View Booking History
        ↓
Logout
```

---

# 👨‍💻 Team Members

* **Charan N.** – Team Lead & Backend Developer
* **Kuruba Harshitha** – Frontend Developer
* **Vallepu Hemalatha** – Testing & Performance Engineer
* **Sandhya** – Database & Integration Developer
* **Salman** – Backend Developer

---

# 📜 License

This project is developed for **academic and educational purposes** as part of a college major project.

---

# ⭐ Acknowledgement

We sincerely thank our **project guide, faculty members, mentors, and teammates** for their continuous support, guidance, and valuable suggestions throughout the development of the **DarshanEase – Temple Appointment Booking System**. Their encouragement and feedback played an important role in the successful completion of this project.
