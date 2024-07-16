export default function Validation(input,) {
  let { id, value } = input;
  
  let type = typeof value;

  //id == 'Age' || id == 'phone'? value = Number(value):null
   //console.log(value)
    
    if(id != 'Age' && id != 'phone')
    {
      value = value.trim();
      if(value.length == 0)
      {
        return false
      }
      else{
        let specialChar = `0123456789!@#$%^&*()_+[]{}|;:'",.<>?/~\`-=` + '\\';
        
            if(!specialChar.includes(value.at(-1)))
            {
                return true
            }
            else{
                return false
            }
        
        
      }
    }
    else{
        if(id != 'Age')
        {
           
            console.log(value.length);
            return value.slice(0,1) != '0' || value.length != 10 ? false : true

        }
        else{
            
            return value >= 18 && value <=75
        }
    }



}
