import { useEffect, useState } from "react"
import { Routes, BrowserRouter, Route, useNavigate, Navigate } from "react-router-dom"
import Login from "./screens/Login"
import { LoginContext } from "./contexts/LoginContext"
import Home from "./screens/Home"
import Signup from "./screens/Signup"
import Profile from "./screens/Profile"
import ProtectedRoutes from "./utils/ProtectedRoutes"
import { getStoredUser, storeUser } from "./utils/localStorage"


function App() {
  const [user, setUser] = useState(false)
  const [userdata, setUserdata] = useState(null)
  const [authChecked, setAuthChecked] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const backendURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const saved = getStoredUser();
    if (saved) {
      setUserdata(saved)
      setUser(true)
    };
    setAuthChecked(true);
  }, []);


  const handleLogin = async (user) => {
    setLoading(true)
    try {
      const res = await fetch(`${backendURL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });

      const data = await res.json();
      if (data.success == "true") {
        setUserdata(data.user)
        storeUser(data.user)
        setUser(true)
        navigate("/profile")

      }
      else {
        alert(`Error: ${data.error}`);
      }


    } catch (err) {
      console.error('Login error:', err);
      alert('Something went wrong.');
    } finally {
      setLoading(false);
    }

  }

  const createUser = async (user) => {
    setLoading(true)
    try {
      const res = await fetch(`${backendURL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });

      const data = await res.json();
      if (data.success == "true") {
        setUserdata(user)
        storeUser(data.user)
        setUser(true)
        navigate("/profile")

      }
      else {
        alert(`Error: ${data.error}`);
      }


    } catch (err) {
      console.error('Login error:', err);
      alert('Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('authUser');
    setUserdata("")
    setUser(false)
    navigate("/login")
  }

  if (!authChecked) return null; // or loading spinner

  return (
    <>
      <div className="flex w-screen h-full justify-center bg-white">
        <div className="w-full max-w-[375px] h-screen overflow-y-auto p-5 bg-[#F7F8F9] relative">

          <LoginContext.Provider value={{ userdata, user }}>
            <Routes>
              <Route index element={<Home />} />
              <Route path="/login" element={user ? <Navigate to={"/profile"} /> : <Login handleLogin={handleLogin} loading={loading} />} />
              <Route path="/signup" element={user ? <Navigate to={"/profile"} /> : <Signup createUser={createUser} loading={loading} />} />
              <Route element={<ProtectedRoutes user={user} />}>
                <Route path="/profile" element={<Profile handleLogout={handleLogout} />} />
              </Route>
            </Routes>
          </LoginContext.Provider>
        </div>
      </div>

    </>
  )
}

export default App
