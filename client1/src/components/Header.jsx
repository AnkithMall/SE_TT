import logo from './images/University_of_Hyderabad_Logo.png' ;
function Header(){
    return (
        <div class="header">
  	    <div class="logo">
            <img src={logo} alt="uoh"/>
 	    </div>   
        <ul>
            <li><a class="active" href="#home">Float Details</a></li>
            <li><a href="#news">Class</a></li>
            <li><a href="#contact">new</a></li>
            <li><a href="#about">search</a></li>
        </ul>
        </div>
    );
}

export default Header ;