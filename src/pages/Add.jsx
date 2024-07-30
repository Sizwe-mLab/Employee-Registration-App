
import { useState } from 'react';
import '../style/App.css'
import Navbar from '../components/navbar.jsx'
import { newEmployee, uploadData } from '../Data/employees.js';
import validation from './Validate.js';


function Add() {
  const [change , setChange] = useState({name:'',surname:'',email:'',position:'', Age:null , phone:null}); 
  const [validate , setValidate] = useState({name:true,surname:true, position:true,email:true, Age:true , phone:true})

  let confirmValid  = ()=>{
    return validate.Age && validate.email && validate.name && validate.surname && validate.position && validate.phone
 }

 function HandleChange(evn){
  
  const {id , value} =evn.target;
  setChange( previousChanges => ({...previousChanges , [id]: value }))

  setValidate( previousChanges => ({...previousChanges , [id]: validation(evn.target) }));
 }

function update(evn){
  let values= [...evn.target];
  let data = {
    name :values[0].value,
    surname : values[1].value,
    Age : values[2].value,
    position:  values[4].value,
    email : values[3].value,
    phone :values[5].value,  
    id : null
  };
  newEmployee(data)

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
          {confirmValid()? <button className='btn btn-success' type="submit">Submit</button>: <button className='btn btn-success' type="submit" disabled>Submit</button>}
        </form>
        </div>
    </>
  )
}

export default Add

