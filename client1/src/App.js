import {BrowserRouter, Routes ,Route} from "react-router-dom" ;
import Courseform from "./components/Courseform" ;
import Classform from "./components/Classform" ;
import Header from './components/Header' ;
import Home from "./components/Home";
import { Badge } from "react-bootstrap";
import Map from "./components/Map";
import Retrieve from "./components/Retrieve";

function App() {
    return (
    <>
        <BrowserRouter>
         <Header/> 
       {/*<a href="http://localhost:3001/template">Download</a>*/}
        <Routes>
            <Route path="/courseform" element={<Courseform/>}/>
            <Route path="/classform" element={<Classform/>}/>
            <Route path="/maptt" element={<Map/>}/>
            <Route path="/retrieve" element={<Retrieve/>} />
            <Route path="/" element={<Home/>}/>
            <Route path="*" element={<h1>
                        File not found <Badge bg="danger">404</Badge>
                        </h1>} />
        </Routes>
        </BrowserRouter>
    </>
    );
}

export default App;
