import './employees.css'
import Edit from './Edit';
import { useState } from 'react';
import App from '../edit/App';
import { getData, mapData } from '../Data/employees';


export default function Employees(){
    let [em ,setEmp ] = useState(getData());
    let editSet = (id)=>{
       localStorage.setItem('id',`${id}`)
    }

    let setSubmit = (evn)=>{
        console.log(evn.target)
    }
  

    let deleteHandle = (id)=>{
        
       setEmp(oldEmp => oldEmp.filter(e => e.id !== id))

      mapData(getData().filter(e => e.id !== id));
        
    }

    return (
        <>
        <h1>Employees</h1>
        <div className='emps'>
        
        {
                em.map(e =>
                <div className='emp'  key={e.id} >

                    <h3>{e.name} {e.surname}</h3> 
                    <p>Position: {e.position}</p>

                    <div className='forms'>
                      <form action="edit.html" onSubmit={setSubmit} id={e.id}>
                        <button type='submit' onClick={()=> editSet(e.id)}>Edit</button>
                     </form>

                        <a href="employee.html">View</a>
                               
                        <button onClick={() => deleteHandle(e.id)} type='delete'>Delete</button>
                    
                    </div>

                 </div> )      
        }

        </div>
        </>
    )

}

