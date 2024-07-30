
import './style/App.css'
import {BrowserRouter, Route,Routes}from 'react-router-dom'
import { useState } from 'react'
//pages
import Employees from './pages/employees.jsx'
import Add from './pages/Add.jsx'
import Home from './pages/home.jsx'


//hidden page
import Edit from './components/Edit.jsx'
import Employee from './components/employee'






function App() {

  let [id , setId] = useState(localStorage.getItem('id'))
  console.log(id)
  return (
    
    <div className='root'>
    <BrowserRouter>
    <Routes>
    <Route   path='/'   element={<Home/>} />  
    <Route   path='/employees'   element={<Employees/>} /> 
    <Route   path='/employees/add'   element={<Add/>} /> 
    <Route   path={`/employees/${id}`}   element={<Employee/>} /> 
    <Route   path={`/employees/${id}/edit`}   element={<Edit/>} />
    <Route   path={`/employees/employee`}   element={<Employee/>} />  

    </Routes>
    </BrowserRouter>  
    </div>
  )
}

export default App

// let workers = [
//   {name: "Lerato", Age: 20, email: "lerato@gmail.com", phone: 27768699754, position: "Secretary", id: 1},
//   {name: "Thabo", Age: 25, email: "thabo@gmail.com", phone: 27768765432, position: "Manager", id: 2},
//   {name: "Mbali", Age: 22, email: "mbali@gmail.com", phone: 27768324567, position: "Accountant", id: 3},
//   {name: "Sipho", Age: 28, email: "sipho@gmail.com", phone: 27768234567, position: "Engineer", id: 4},
//   {name: "Naledi", Age: 24, email: "naledi@gmail.com", phone: 27768987654, position: "Designer", id: 5},
//   {name: "Kagiso", Age: 30, email: "kagiso@gmail.com", phone: 27768123456, position: "HR", id: 6},
//   {name: "Palesa", Age: 26, email: "palesa@gmail.com", phone: 27768098765, position: "Marketing", id: 7},
//   {name: "Lungile", Age: 27, email: "lungile@gmail.com", phone: 27767987654, position: "Sales", id: 8},
//   {name: "Bongani", Age: 23, email: "bongani@gmail.com", phone: 27767876543, position: "IT Support", id: 9},
//   {name: "Nandi", Age: 29, email: "nandi@gmail.com", phone: 27767765432, position: "Consultant", id: 10},
//   {name: "Khumo", Age: 21, email: "khumo@gmail.com", phone: 27767654321, position: "Receptionist", id: 11},
//   {name: "Tshepo", Age: 32, email: "tshepo@gmail.com", phone: 27767543210, position: "Project Manager", id: 12}
// ];