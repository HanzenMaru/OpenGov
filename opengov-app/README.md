# OpenGOV 24/7 - Transparency Platform

OpenGOV 24/7 is a digital transparency system designed to connect citizens to government project data in real-time. This platform features a citizen dashboard for tracking project progress and an admin panel for managing government contracts and procurement data.

## 📋 Prerequisites

Before running the application, ensure you have the following installed on your machine:

1. **Node.js & npm**: [Download Node.js](https://nodejs.org/) (Recommended: LTS version).
2. **XAMPP**: [Download XAMPP](https://www.apachefriends.org/index.html) (To run Apache and MySQL/phpMyAdmin).
3. **Code Editor**: [VS Code](https://code.visualstudio.com/) is recommended.

---

## 🚀 Installation & Setup

### 1. Database Configuration

1. Open the **XAMPP Control Panel** and start **Apache** and **MySQL**.
2. Go to `http://localhost/phpmyadmin` in your browser.
3. Create a new database named `opengov_db` (or the name specified in your backend config).
4. Create a table named `users` with the following columns:
* `id` (int, Primary Key, Auto Increment)
* `full_name` (varchar 255)
* `email` (varchar 255, Unique)
* `password` (varchar 255)
* `role` (varchar 50, Default: 'user')



### 2. Backend Setup

1. Navigate to your server/backend folder in the terminal.
2. Install dependencies:
bash
npm install express mysql2 cors body-parser



3. Ensure your database connection settings (host, user, password, database) in your server file match your XAMPP settings.
4. Start the server:
bash
node index.js  # or your specific server filename

### 3. Frontend Setup

1. Navigate to the React project folder in a new terminal window.
2. Install frontend dependencies:
bash
npm install axios react-icons




3. Start the React application:
```bash
npm start



## 🔐 Admin Credentials

*Email*  `admin@opengov.ph` 
*Password** `admin123` 



## 📁 Project Structure

* `App.js`: Main logic for routing and view management.
* `App.css`: Custom styling for the "Glass-card" and Dashboard themes.
* `Admin.js`: Separate component for administrative tasks.

