import workers, { getData, getOneEmployee, mapData } from "../Data/employees.js";
import Employee from "./employee.jsx";
import '../style/App.css'
import Navbar from "./navbar.jsx";
import { useState } from "react"
import Validation from "../pages/Validate.js";


function App() {
  let data = JSON.parse(localStorage.getItem('Workers'))
 
  let [employee] =data.filter(emp => emp.id == localStorage.getItem('id'));

  const [change , setChange] = useState(employee); 
  const [validate , setValidate] = useState({name:true,surname:true, position:true,email:true, Age:true , phone:true})

  let confirmValid  = ()=>{
    return validate.Age && validate.email && validate.name && validate.surname && validate.position && validate.phone
 }

 function HandleChange(evn){

  const {id , value} =evn.target;
  //console.log(evn.target)
  //console.log([id])
  setChange( previousChanges => ({...previousChanges , [id]: value }))

  setValidate( previousChanges => ({...previousChanges , [id]: Validation(evn.target) }));
 }

function update(evn){
//evn.preventDefault();
let values = [...evn.target];
//console.log('values:',values);
mapData(values ,localStorage.getItem('id'));

//let employee = em.filter(e => e.id == localStorage.getItem('id'));
employee = getData()
//.log('employees' ,employee)
let k =employee.filter(e => e.id == localStorage.getItem('id'))
//console.log('last:' ,k)
//k[0].id ==JSON.parse(localStorage.getItem('employee'))[0].id?
localStorage.setItem('employee',JSON.stringify(k))

//localStorage.setItem('employee' , JSON.stringify(employee));

}


return (
  <>  
    <Navbar/>
      <div className="box">
      <form action="/employees" onSubmit={update}>

        <div>
          <div className='names'>
          <label htmlFor="name">Name</label>
          <br />
          <input type="text" id="name"  name="name" value={change.name} onChange={HandleChange} required/>
          {!validate.name && <p style={{color:'red'}}>Name can not be empty or start with special character</p>} 
          </div>
          <div>
          <label htmlFor="surname">Surname</label>
          <br />
          <input type="text" id="surname"  value={change.surname} onChange={HandleChange} required/>
          {!validate.surname && <p style={{color:'red'}}>Surname can not be empty or start with special character</p>}
          </div>
        </div>

        <div>
          <label htmlFor="Age">Age</label>
          <br />
          <input type="Number" id="Age" value={change.Age} onChange={HandleChange}required/>
          {!validate.Age && <p style={{color:'red'}}>Age can not be empty and age can only be between 18 and 75</p>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <br />
          <input type="email" id="email" value={change.email} onChange={HandleChange}required/>
          {!validate.email && <p style={{color:'red'}}>Email can not be empty or start with special character</p>}
        </div>
        <div>
          <label htmlFor="position">Position</label>
          <br />
          <input type="text" id="position" value={change.position} onChange={HandleChange}required/>
          {!validate.position && <p style={{color:'red'}}>Position can not be empty or start with special character</p>}
        </div>

        <div>
          <label htmlFor="phone">Phone</label>
          <br />
          <input type="tel" id="phone" value={change.phone} onChange={HandleChange}required/>
          {!validate.phone && <p style={{color:'red'}}>phone number can not be empty or phone number must start with 0</p>}
        </div>
       {confirmValid() ? <button className='btn btn-success' type="submit" >Submit</button>: <button className='btn btn-success' type="submit" disabled>Submit</button>}
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
