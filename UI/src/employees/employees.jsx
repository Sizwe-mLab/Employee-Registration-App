import './employees.css'
import Edit from './Edit';
import { useState } from 'react';
import App from '../edit/App';
import { worker } from '../Data/employees';

export default function Employees({emp}){
    let [em ,setEmp ] = useState(emp);
    let editSet = (id)=>{
       worker.push(id);
    }
    let setSubmit = (evn)=>{
       
       //evn.preventDefault();
    }
  

    let deleteHandle = (id)=>{
        
       setEmp(oldEmp => oldEmp.filter(e => e.id !== id))
       console.log(emp)
        
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
                               
                        <button onClick={() => deleteHandle(e.id)} type='delete'>Delete</button>
                    
                    </div>

                 </div> )      
        }

        </div>
        </>
    )

}

