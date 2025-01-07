# Employee Management App - Frontend

This is the frontend for an **Employee Management Application** built with **React**, **Firebase**, and **Axios**. It allows users to manage employee data, including adding, editing, deleting, and viewing employee profiles. Users can also log in and manage roles based on their permissions.

---

## 🌐 Live Links

- **Frontend**: [https://employee-registration-app-eta.vercel.app](https://employee-registration-app-eta.vercel.app)
- **API**: [https://employee-app-nodejs-2-ycr8.onrender.com/api/employees](https://employee-app-nodejs-2-ycr8.onrender.com/api/employees)

---

## 🚀 Features

1. **Employee Form**: Add and edit employee details including name, age, surname, ID number, role, email, password, and image.
2. **Employee List**: View all employees with the ability to search by ID, edit, delete, and toggle admin roles.
3. **Authentication**: Secure login for users with role-based redirection (employees and admins).
4. **Image Upload**: Upload and preview employee images.
5. **Admin Verification Badge**: Admins are marked with a verified badge (✅) in the employee list.

---

## 🛠️ Tech Stack

- **React**: JavaScript library for building user interfaces.
- **Firebase**: Backend services for authentication and Firestore database.
- **Axios**: HTTP client for making API requests to a backend server.
- **Font Awesome**: Icons for enhancing UI.

---

## 🛠️ Setup

### Prerequisites

- Node.js and npm installed on your machine.
- Firebase project set up with Firestore and Authentication.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/TshepoMadira/Employee-Registration-App.git
Navigate to the project directory:


cd Employee-Registration-App
Switch to the dev branch:


git checkout dev
Install dependencies:


npm install
Run the app:


npm start
🖥️ Usage
Navigate to the login page and sign in using the following credentials:

Employee Login:

Email: johndoe@gmail.com

Password: employee221

Admin Login:

Email: losbi@gmail.com

Password: TI200&11y

Upon successful login:

If you are an Employee, you'll be redirected to the employee list.

If you are an Admin, you'll be redirected to the employee admin dashboard with additional privileges.

Use the Employee Form to add new employees or edit existing ones.

Manage employee roles directly from the employee list.

Admins can remove or demote other admins in the Employee dashboard.

Admins are marked with a verified badge (✅) in the employee list.

📂 Folder Structure
Copy
src/
├── components/
│   ├── EmployeeForm.js
│   ├── EmployeeList.js
│   ├── Login.js
├── FirebaseConfig.js
├── App.js
├── index.js
🎨 Styling
The app uses custom CSS files for styling components located in the respective component folders (e.g., EmployeeForm.css, EmployeeList.css, Login.css).

🤝 Contributing
If you'd like to contribute, feel free to fork the repository and submit a pull request. Contributions are welcome!