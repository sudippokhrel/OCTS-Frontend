import React from "react";
import Navbar from "./components/sidebar/Navbar";
import { Routes, Route, BrowserRouter } from "react-router-dom"; //importing reactrouter dom for routing
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./components/context/UserAuthContext";



//Importing pages for routing
import Home from "./pages/home/Home";
import "./App.css";
import ApplyTransfer from "./pages/applytransfer/ApplyTransfer";
import ViewTransfers from "./pages/viewtransfers/ViewTransfers";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Logout from "./pages/logout/Logout";
import Students from "./pages/students/Students";
import StudentProfile from "./pages/students/studentProfile";
import AddStudent from "./pages/students/AddStudent";
import Directors from "./pages/directors/Directors"
import DirectorProfile from "./pages/directors/DirectorProfile";
import Coordinators from "./pages/coordinators/Coordinators";
import CoordinatorProfile from "./pages/coordinators/CoordinatorProfile";
import SeatList from "./pages/seats/SeatList";



function App() {
  return (
    <UserAuthContextProvider>
      <Routes>
        <Route path ="/"  element={<Home/>}></Route>
        <Route  path ="/applytransfer"  element={<ProtectedRoute><ApplyTransfer/></ProtectedRoute>}></Route>
        <Route path ="/viewtransfers"  element={<ProtectedRoute><ViewTransfers/></ProtectedRoute>}></Route>
        <Route path ="/settings"  element={<ProtectedRoute><Settings/></ProtectedRoute>}></Route>
        <Route path ="/login"  element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/logout" element={<Logout/>}></Route>

        {/* Add User for admin */}
        <Route path="/students">
          <Route index element={<Students />} />
              <Route path="profile" element={<StudentProfile />} />
              <Route
                path="new"
                element={<AddStudent />}
              />
         </Route>

         <Route path="/directors">
          <Route index element={<Directors />} />
              <Route path="profile" element={<DirectorProfile />} />
         </Route>

         <Route path="/coordinators">
          <Route index element={<Coordinators />} />
              <Route path="profile" element={<CoordinatorProfile />} />
         </Route>
         
         <Route path="/seats" element={<SeatList/>}>

         </Route>

      </Routes>
    </UserAuthContextProvider>
    

  )
}

export default App;