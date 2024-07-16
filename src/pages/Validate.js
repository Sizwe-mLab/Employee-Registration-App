export default function Validation(input) {
  let { id, value } = input;
  let specialChar = (`0123456789!@#$%^&*()_+[]{}|;:'",.<>?/~\`-=` + "\\").split(
    ""
  );

  if (id != "Age" && id != "phone") {
    value = value.trim();
    //checks if the the input does not start with space or special character then return true;
    return (
      value.length != 0 && specialChar.some((char) => char != value.at(-1))
    );
  } else {
    if (id != "Age") {
      return value.slice(0, 1) != "0" || value.length != 10 ? false : true;
    } else {
      return value >= 18 && value <= 75;
    }
  }
}
