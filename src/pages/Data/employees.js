import uniqid from 'uniqid';
import Employee from '../employee/employee';

let workers = [
    {name: "Lerato" ,surname:"Rapula", Age: 20, email: "lerato@gmail.com", phone: 27768699754, position: "Secretary", id: 1},
    {name: "Thabo" ,surname:"Maleka", Age: 25, email: "thabo@gmail.com", phone: 27768765432, position: "Manager", id: 2},
    {name: "Mbali",surname:"Sewewe", Age: 22, email: "mbali@gmail.com", phone: 27768324567, position: "Accountant", id: 3},
    {name: "Sipho" ,surname:"Raitlhana",Age: 28, email: "sipho@gmail.com", phone: 27768234567, position: "Engineer", id: 4},
    {name: "Naledi" ,surname:"Rapula", Age: 24, email: "naledi@gmail.com", phone: 27768987654, position: "Designer", id: 5},
    {name: "Kagiso" ,surname:"Onel", Age: 30, email: "kagiso@gmail.com", phone: 27768123456, position: "HR", id: 6},
    {name: "Palesa" ,surname:"Sebatane", Age: 26, email: "palesa@gmail.com", phone: 27768098765, position: "Marketing", id: 7},
    {name: "Lungile" ,surname:"Malepe", Age: 27, email: "lungile@gmail.com", phone: 27767987654, position: "Sales", id: 8},
    {name: "Bongani" ,surname:"Malepe", Age: 23, email: "bongani@gmail.com", phone: 27767876543, position: "IT Support", id: 9},
    {name: "Nandi" ,surname:"Kok", Age: 29, email: "nandi@gmail.com", phone: 27767765432, position: "Consultant", id: 10},
    {name: "Khumo" ,surname:"Modupi", Age: 21, email: "khumo@gmail.com", phone: 27767654321, position: "Receptionist", id: 11},
    {name: "Tshepo" ,surname:"Maidula", Age: 32, email: "tshepo@gmail.com", phone: 27767543210, position: "Project Manager", id: 12}
];



let uploadData = (data = workers)=>{
    
    localStorage.setItem('Workers' , JSON.stringify(data));
    //console.log("Data uploaded")
}

function getData(){
   
    return JSON.parse(localStorage.getItem('Workers'));
    
}
let mappedData = (data)=> data;

let mapData=(data, id = null)=>{
    let employees = getData();
   // console.log('all employees',employees)
   // console.log(data)
    if(id !=null)
    {
//console.log('id:',id)
        //console.log('work:',employees);
       let worker =  employees.filter(e => Number(id) === Number(e.id));
       //console.log(worker)

       worker[0].name =  data[0].value;
       worker[0].surname =  data[1].value;
       worker[0].Age = data[2].value;
       worker[0].position=  data[3].value;
       worker[0].email = data[4].value;
       worker[0].phone = data[5].value;   
       worker[0].id = id

       //console.log('after mapping' ,worker[0]);

      let index = employees.findIndex(obj => obj.id === id);
        if (index !== -1) {
         employees[index] = worker[0];
        }
        //employee
        uploadData(employees);
       // console.log('data mapped with provided id')
       // console.log(employees)
    }
    else{
        mappedData(data)
        //console.log('data mapped without id')
        uploadData(data)
       // console.log(getData())
       

    }    
    
}

let getOneEmployee =()=>{
    return JSON.parse(localStorage.getItem('employee'));
}

let newEmployee = (data) =>{
    //console.log([data])
    data.id = uniqid.time();
    if(localStorage.getItem('Workers') == null || !localStorage.getItem('Workers')) 
        {
            uploadData([data]);
            //console.log('Data is empty and employee added');
        }
        else{
            workers = JSON.parse(localStorage.getItem('Workers'));
            workers.push(data);
            uploadData(workers);
           // console.log('Data is updated with new employee');
        }  
  
}



export {uploadData , getData,mapData , newEmployee,getOneEmployee};
export default workers;
