
import { useState } from 'react';
import '../edit/App.css'
import Navbar from './navbar.jsx'
import { newEmployee, uploadData } from '../Data/employees.js';


function App() {
  let [em , setEm] = useState({}); 

 function setName(evn){
  let Iname = evn.target.value
   setEm(Iname);
  
   
 }
 function setSurname(evn){
  setEm(evn.target.value);
  
}
function setAge(evn){
  setEm(evn.target.value);
  
}
function setEmail(evn){
  setEm(evn.target.value);
  
}
function setPhone(evn){
  setEm(evn.target.value);

}
function setPosition(evn){
  setEm(evn.target.value);
}

function update(evn){
  let values = [...evn.target];
  let data = {
    name :values[0].value,
    surname : values[1].value,
    Age : values[2].value,
    position:  values[3].value,
    email : values[4].value,
    phone :values[5].value,  
    id : null
  };
 //console.log(data);
  newEmployee(data)
  
  //console.log(values);
  
}  

  return (
    <>  
      <Navbar/>
        <div className="box">
        <form action="employees.html" onSubmit={update} method="post">
          <div>
            <label htmlFor="name">Name</label>
            <br />
            <input type="text" id="name"  name="name" value={em.name} onChange={setName} required/>
          </div>
          <div>
            <label htmlFor="surname">Surname</label>
            <br />
            <input type="text" id="surname" value={em.surname} onChange={setSurname} required/>
          </div>
          <div>
            <label htmlFor="Age">Age</label>
            <br />
            <input type="Number" id="Age" value={em.Age} onChange={setAge}required/>
          </div>
          <div>
            <label htmlFor="position">Position</label>
            <br />
            <input type="text" id="position" value={em.position} onChange={setPosition}required/>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <br />
            <input type="email" id="email" value={em.email} onChange={setEmail}required/>
          </div>
          <div>
            <label htmlFor="phone">Phone</label>
            <br />
            <input type="Number" id="phone" value={em.phone} onChange={setPhone}required/>
          </div>
          <button className='btn btn-success' type="submit">Submit</button>
        </form>
        </div>
    </>
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