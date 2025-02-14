import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Ticket from "./Components/pages/Ticket";
import Navbar from "./Components/Navbar/Navbar";
import About from "./Components/pages/AboutUs";
import Event from "./Components/Home/Event";

function App() {
    return (
        <Router>
            <Navbar/>
          
            <Routes>
                <Route path="/" element={  <Event/>} />
                <Route path="/about" element={<About/>} />
                <Route path="/tickets" element={<Ticket/>} />
            </Routes>
        </Router>
    );
}

export default App;
