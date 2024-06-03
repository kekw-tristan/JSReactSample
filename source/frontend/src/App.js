import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages and components
import Home from './pages/Home'
import Login from './pages/Login'
import Navbar from './components/Navbar'

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <div className="pages">
                    <Routes>
                        <Route
                            path="/pages/Home"
                            element={<Home />}
                        />
                        <Route
                            path="/pages/Login"
                            element={<Login />}
                            />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
