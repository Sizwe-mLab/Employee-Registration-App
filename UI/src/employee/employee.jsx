import { useState } from "react";
import { getData ,getOneEmployee,mapData} from "../Data/employees";
import './employee.css'

export default function Employee(){

    let [em ,setEmp ] = useState(getOneEmployee());
    let editSet = (id)=>{
       localStorage.setItem('id',`${id}`)
    }

    let setSubmit = (evn)=>{
        //console.log(evn.target)
    }
  

    let deleteHandle = (id)=>{
        
       setEmp(oldEmp => oldEmp.filter(e => e.id !== id))

      mapData(getData().filter(e => e.id !== id));
        
    }
    return (
        <>
        <div className='employee'>
        
        {
                em.map(e =>
                <div className='emp'  key={e.id} >
                    <h1>{e.position}</h1>
                    <h3>Name: {e.name}</h3> 
                    <h4>Surname: {e.surname}</h4>
                    <h4>Age: {e.Age}</h4>
                    <h4>Email: {e.email}</h4>
                    <h4>Phone: {e.phone}</h4>


                    <div className='forms'>
                      <form action="edit.html" onSubmit={setSubmit} id={e.id}>
                        <button type='edit' onClick={()=> editSet(e.id)}>Edit</button>
                     </form>
                        <form action="">  
                        <button onClick={() => deleteHandle(e.id)} type='delete'>Delete</button>
                        </form> 
                    </div>

                 </div> )     
        }

        </div>
        </>)
}