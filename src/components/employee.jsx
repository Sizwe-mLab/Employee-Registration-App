import { useState } from "react";
import { getData ,getOneEmployee,mapData} from "../Data/employees";
import '../style/employee.css'

export default function Employee(){
    
    let [em ,setEmp ] = useState(getOneEmployee(localStorage.getItem('id')));
    console.log(em);
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
                    {e.name ? <h3>Name: {e.name}</h3>:null}
                    { e.surname ? <h4>Surname: {e.surname}</h4>:null}
                    { e.Age ? <h4>Age: {e.Age}</h4>:null}
                    { e.email ? <h4>Email: {e.email}</h4>:null}
                    { e.phone ? <h4>Phone: {e.phone}</h4>:null}


                    <div className='forms'>
                    { e.name?
                      <form action="/employees/employee/edit" onSubmit={setSubmit} id={e.id}>
                      <button type='edit' onClick={()=> editSet(e.id)} >Edit</button> 
                     </form>
                     : null }
                     <form action="/employees">
                        <button>Back</button>
                     </form>

                    </div>
                    
                 </div> )     
        }

        </div>
        </>)
}