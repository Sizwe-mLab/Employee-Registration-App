export default function Validation(input) {
  let { id, value } = input;
 

  if(id == 'email')
  {
  
    return value.trim().length != 0
  }
  else if (id != "Age" && id != "phone" ){
    console.log('mailsssss')
    let specialChar = (`0123456789!@#$%^&*()_+[]{}|;:'",.<>?/~\`-=` + "\\");
    const re = new RegExp(`[${value}]`,'ig');
    //checks if the the input does not start with space or special character then return true;
    return value.trim().length != 0 && specialChar.match(re) == null
  } else {
    if (id != "Age") {
      console.log('nums')
      return value.slice(0, 1) != "0" || value.length != 10 ? false : true;
    } else {
      return value >= 18 && value <= 75;
    }
  }
}

