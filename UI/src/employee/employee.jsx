export default function Employee(){

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
        <div className='emps'>
        
        {
                em.map(e =>
                <div className='emp'  key={e.id} >
                    <h2>Position: {e.position}</h2>
                    <h3>Name: {e.name}</h3> 
                    <h4>Surname: {e.surname}</h4>
                    <h4>Age: {e.Age}</h4>
                    <h4>Email: {e.email}</h4>
                    <h4>Phone: {e.phone}</h4>


                    <div className='forms'>
                      <form action="edit.html" onSubmit={setSubmit} id={e.id}>
                        <button type='submit' onClick={()=> editSet(e.id)}>Edit</button>
                     </form>
                               
                        <button onClick={() => deleteHandle(e.id)} type='delete'>Delete</button>
                    
                    </div>

                 </div> )     
        }

        </div>
        </>)
}