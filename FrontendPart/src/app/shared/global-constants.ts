export class GlobalConstants{

  //msg
  public static genricError:string = "Something went wrong please try again later";
  public static unauthorized:string="You are not authorized person to access this page.";
  public static productExistError:string="Product already exist.";
  public static productAdded:string="product added succesfully...";
  public static submitSuccess:string="Submit Successfully";
  public static thankyYou:string="Thanks for visiting Here :-)";



  //regex
  public static nameRegex:string = "[a-zA-Z ]{3,19}";
  public static emialRegex:string = "[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}";
  public static contactNumberRegex:string = "^[e0-9]{10,10}$";
  public static price:string = "^[e0-9]{1,}$";

  //error
  public static error:string = "error";


}
