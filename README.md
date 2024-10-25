## Employee Management App - Frontend
This is the frontend for an Employee Management application built with React, Firebase, and Axios. It allows users to manage employee data, including adding, editing, deleting, and viewing employee profiles. Users can also log in and manage roles.



## Live Links

- **Frontend**: (https://employee-registration-app-eta.vercel.app)
- **API**: (https://employee-app-nodejs-1-1jjz.onrender.com/api/employees)


### Features
1. Employee Form: Add and edit employee details including name, age, surname, ID number, role, email, password, and image.
2. Employee List: View all employees with the ability to search by ID, edit, delete, and toggle admin roles.
3. Authentication: Secure login for users with role-based redirection (employees and admins).
4. Image Upload: Upload and preview employee images.

- **React**: JavaScript library for building user interfaces.
- **Firebase**: Backend services for authentication and Firestore database.
- **Axios**: HTTP client for making API requests to a backend server.
- **Font Awesome**: Icons for enhancing UI.


## Setup

### Prerequisites

- Node.js and npm installed on your machine.
- Firebase project set up with Firestore and Authentication.

#### Installation

1. Clone the repository:
git clone https://github.com/TshepoMadira/Employee-Registration-App.git

2. Navigate to the project directory:
cd Employee-Registration-App

3. Git checkout dev

4. Install dependencies:
 npm install

5. To run the app use :
 npm start



#### Usage
1. Navigate to the login page and sign in using the following credentials:

Email: danny@gmail.com
Password: admin1111
 OR
Email: beijing@gmail.com
Password: employee12

2. Upon successful login, you'll be redirected to the employee list if you are Employee or dashboard if you admin it is based on your role.
3. Use the Employee Form to add new employees or edit existing ones.
4. Manage employee roles directly from the employee list.
5. Remove or Demote admin in the Employee dashboard

#### Folder Structure
src/
├── components/
│   ├── EmployeeForm.js
│   ├── EmployeeList.js
│   ├── Login.js
├── FirebaseConfig.js
├── App.js
├── index.js


#### Styling
The app uses a custom CSS file for styling components located in the respective component folders (e.g., EmployeeForm.css, EmployeeList.css, Login.css).

##### Contributing
If you'd like to contribute, feel free to fork the repository and submit a pull request.



