import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useAuthContext } from "./hooks/useAuthContext"

// pages and components
import Home from './pages/Home'
import Posts from './pages/Posts'
import Statistics from './pages/UserStats'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
    const { user } = useAuthContext()

    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <div className="pages">
                    <Routes>
                        <Route
                            path="/home"
                            element={user ? <Home />: <Navigate to="/home" />}
                        />
                        <Route
                            path="/posts"
                            element={user ? <Posts /> : <Navigate to="/posts" />}
                        />
                        <Route
                            path="/statistics"
                            element={user ? <Statistics /> : <Navigate to="/statistics" />}
                        />
                        <Route
                            path="/login"
                            element={!user ? <Login /> : <Navigate to="/posts" />}
                        />
                        <Route
                            path="/signup"
                            element={!user ? <Signup />: <Navigate to="/posts" />}
                        />
                    </Routes>
                </div>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
