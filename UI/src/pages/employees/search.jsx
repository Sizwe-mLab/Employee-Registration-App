import { getData } from '../Data/employees';
import './search.css'
import { useState } from 'react'
export default function Search(){
    let [name, setName] = useState();
    let [options, setOptions] = useState();
    let employees = getData();

    let nameHandle = evn => setName(evn.target.value);

    let submitHandle = (e)=>{ searchHandle() }

    let selectHandle = (e)=>{
        setOptions(e.target.value)
    }

    let employee ;

    let searchHandle = (name = name)=>{

    if(options === 'id'){
    employee = employees.filter(e => e.id == name);
    }
    else if(options === 'position')
    {
        employee = employees.filter(e => e.position === name.charAt(0).toUpperCase() + name.slice(1));
        localStorage.removeItem('results');
    }
    else 
    {
        employee = employees.filter(e => e.name === name.charAt(0).toUpperCase() + name.slice(1));
        localStorage.removeItem('results');
    }

    if(employee[0])
    {
            console.log(employee)
            localStorage.setItem('employee' , JSON.stringify([...employee]));
            localStorage.removeItem('results');
    }
    else{
        localStorage.removeItem('employee');
        localStorage.setItem('employee' , JSON.stringify([{position:"Employee Not found",}]));
        

    }
        //console.log(employee);
        //console.log('employee is passed to localStorage');
        //console.log(getOneEmployee())  
    }
    

    return (<>
    <form action="./employee.html" onSubmit={submitHandle}>
    <select name="options" id="option" onChange={selectHandle} defaultChecked = 'name'>
        <option value='name'  selected >Name</option>
        <option value= 'position'>Position</option>
        <option value='id' >ID</option>
    </select>
    <div>
    <span><i class='bx bx-search'></i></span>
    <input type="text" placeholder="Search by Name" value={name} onChange={nameHandle} required/>
    </div>
    <button onClick={()=>searchHandle(name) }>Search</button>
    </form>

    </>)
}