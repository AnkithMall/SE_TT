import logo from './images/University_of_Hyderabad_Logo.png' ;
function Header(){
    return (
        <div class="header">
  	    <div class="logo">
            <img src={logo} alt="uoh"/>
 	     </div>   
        </div>
    );
}

export default Header ;