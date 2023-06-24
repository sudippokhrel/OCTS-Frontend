import React from "react";
import Navbar from "./components/Navbar";
import { Routes, Route, BrowserRouter } from "react-router-dom"; //importing reactrouter dom for routing
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./components/context/UserAuthContext";


//Importing pages for routing
import Home from "./pages/Home";
import "./App.css";
import ApplyTransfer from "./components/ApplyTransfer";
import ViewTransfer from "./pages/ViewTransfers";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DeanPage from "./components/DeanPage";


function App() {
  return (
    <UserAuthContextProvider>
      <Routes>
        <Route path ="/"  element={<Home/>}></Route>
        <Route  path ="/applytransfer"  element={<ProtectedRoute><ApplyTransfer/></ProtectedRoute>}></Route>
        <Route path ="/viewtransfers"  element={<ProtectedRoute><ViewTransfer/></ProtectedRoute>}></Route>
        <Route path ="/settings"  element={<ProtectedRoute><Settings/></ProtectedRoute>}></Route>
        <Route path ="/login"  element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/deanpage" element={<DeanPage/>}></Route>
      </Routes>
    </UserAuthContextProvider>

  )
}

export default App;