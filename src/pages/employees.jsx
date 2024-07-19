import '../style/employees.css'
import { useState } from 'react';
import { getData, getOneEmployee, mapData,uploadData } from '../Data/employees';
import Search from '../components/search';
import Navbar from '../components/navbar';


export default function Employees(){
    
    let [em ,setEmp ] = useState(getData());
    let [id , seId] = useState()
    let editSet = (id)=>{
       localStorage.setItem('id',`${id}`)
    }

    let deleteHandle = (id)=>{
        
       setEmp(oldEmp => oldEmp.filter(e => e.id !== id))

      mapData(getData().filter(e => e.id !== id));
        
    }
    let viewHandle = (id)=>{
        // event.preventDefault();
        console.log(id)
        localStorage.setItem('id',`${id}`)
        let employee = em.filter(e => e.id == id);
        
        localStorage.setItem('employee' , JSON.stringify([...employee]));

    }
    let results=localStorage.getItem('results');

    function defaultData(){
        uploadData();
        setEmp(getData('Worker'));
        
      }

    return (
        <>
        <Navbar/>
        <div className='top'>
        <h1>Employees</h1>
        
        {  em == null || em.length == 0?<button type='submit' onClick={defaultData}>Generate demo employees</button>:<Search/>}
        </div>
        
        
        {em != null&&
        <div className='emps'>
        
        {
                em.map(e =>
                <div className='emp'  key={e.id} >
                    <h3>{e.name} {e.surname}</h3>
                    <div className="details">
                     
                    <span>ID: {e.id}</span>
                    <p>Position: {e.position}</p>
                    </div>
                    
                    <div className='forms'>
                      <form action={`/employees/${e.id}/edit`} id={e.id}>
                        <button type='submit' onClick={()=> editSet(e.id)}>Edit</button>
                     </form>

                    <form action={`/employees/${e.id}`}>
                        <button onClick={()=>viewHandle(e.id) }className=' btn-successful'>View</button>
                    </form>
                               
                        <button onClick={() => deleteHandle(e.id)} type='delete'>Delete</button>
                    
                    </div>
               
        
                 </div> )      
}


        </div>
}
        </>
    )

}

