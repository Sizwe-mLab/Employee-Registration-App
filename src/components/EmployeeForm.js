import React, { useState, useEffect } from "react";
import { db } from "./FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faTrash } from "@fortawesome/free-solid-svg-icons";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"; 
import "./Employeeform.css";

const EmployeeForm = ({ updateEmployee, employeeToEdit }) => {
  const [employee, setEmployee] = useState({
    name: "",
    age: "",
    surname: "",
    idnumber: "",
    role: "",
    email: "",
    password: "",
    image: "",
  });

  const navigate = useNavigate();
  const auth = getAuth(); 
  useEffect(() => {
    if (employeeToEdit) {
      setEmployee({
        name: employeeToEdit.name || "",
        age: employeeToEdit.age || "",
        surname: employeeToEdit.surname || "",
        idnumber: employeeToEdit.idnumber || "",
        role: employeeToEdit.role || "",
        email: employeeToEdit.email || "",
      
        image: employeeToEdit.image || "",
      });
    }
  }, [employeeToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const addEmployee = async (newEmployee) => {
    try {
     
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        newEmployee.email,
        newEmployee.password
      );
      
      const user = userCredential.user;

    
      await addDoc(collection(db, "employees"), {
        name: newEmployee.name,
        age: newEmployee.age,
        surname: newEmployee.surname,
        idnumber: newEmployee.idnumber,
        role: newEmployee.role,
        email: newEmployee.email,
        image: newEmployee.image,
        uid: user.uid, 
      });

      console.log("Employee added with ID: ", user.uid);
    } catch (error) {
      console.error("Error adding employee: ", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (employeeToEdit) {
      updateEmployee(employee);
    } else {
      addEmployee(employee);
    }

    setEmployee({
      name: "",
      age: "",
      surname: "",
      idnumber: "",
      role: "",
      email: "",
      password: "",
      image: "",
    });
    navigate("/employeelist");
  };

  const handleEmployeeList = () => {
    navigate("/employeelist");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEmployee((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setEmployee((prev) => ({ ...prev, image: "" }));
  };

  return (
    <div className="employee-form-container">
      <button
        type="button"
        onClick={handleEmployeeList}
        className="view-staff-button"
      >
        View Staff
      </button>
      <form onSubmit={handleSubmit} className="employee-form">
        <h2>{employeeToEdit ? "Edit Employee" : "Add Employee"}</h2>

        <div className="form-layout">
          <div className="image-upload-container">
            <div className="image-placeholder">
              {employee.image ? (
                <>
                  <img src={employee.image} alt="Employee" />
                  <button
                    type="button"
                    onClick={handleDeleteImage}
                    className="remove-button"
                    aria-label="Remove image"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                    <span>Remove</span>
                  </button>
                </>
              ) : (
                <span>Upload</span>
              )}
            </div>
            <input
              type="file"
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="upload-button"
              aria-label="Upload image"
            >
              <FontAwesomeIcon icon={faUpload} />
              <span>Upload</span>
            </label>
          </div>

          <div className="input-items">
            <input
              type="text"
              name="name"
              value={employee.name}
              onChange={handleChange}
              placeholder="__Name______________________ "
              required
            />
            <input
              type="number"
              name="age"
              value={employee.age}
              onChange={handleChange}
              placeholder="__Age_______________________ "
              required
            />
            <input
              type="text"
              name="surname"
              value={employee.surname}
              onChange={handleChange}
              placeholder="__Surname______________________ "
              required
            />
            <input
              type="text"
              name="idnumber"
              value={employee.idnumber}
              onChange={handleChange}
              placeholder="__idNumber_______________________ "
              required
            />
            <input
              type="text"
              name="role"
              value={employee.role}
              onChange={handleChange}
              placeholder="__Role_______________________ "
              required
            />
            <input
              type="email"
              name="email"
              value={employee.email}
              onChange={handleChange}
              placeholder="__Email_______________________ "
              required
            />
            <input
              type="password"
              name="password"
              value={employee.password}
              onChange={handleChange}
              placeholder="__Password_______________________ "
              required
            />
          </div>
        </div>

        <button className='submitted'type="submit">
          {employeeToEdit ? "Update Employee" : "Add Employee"}
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
