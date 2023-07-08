import React from "react";
import Navbar from "./components/sidebar/Navbar";
import { Routes, Route} from "react-router-dom"; //importing reactrouter dom for routing
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./components/context/UserAuthContext";
import Appbar from "./components/navbar/Appbar";

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
import CollegeHeadDashboard from "./pages/Dashboard/CollegeHeadDashboard";



function App() {

  return (
    <UserAuthContextProvider>
    <Appbar/>
      <Routes>
        <Route path ="/"  
        element={
          <Home/>
          }>
        </Route>


        <Route  path ="/applytransfer"  
          element={
          <ProtectedRoute>
          <ApplyTransfer/>
          </ProtectedRoute>}>
        </Route>

        <Route  path ="/viewtransfers"  
          element={
          <ProtectedRoute>
          <ViewTransfer/>
          </ProtectedRoute>}>
        </Route>

        <Route  path ="/settings"  
          element={
          <ProtectedRoute>
          <Settings/>
          </ProtectedRoute>}>
        </Route>

        <Route  path ="/login"  
          element={
          <Login/>
          }>
        </Route>

        <Route  path ="/signup"  
          element={
          <Signup/>
          }>
        </Route>

        <Route  path ="/logout"  
          element={
          <ProtectedRoute>
          <Login/>
          </ProtectedRoute>}>
        </Route>


        {/* Add User for admin */}
        <Route path="/students">
          <Route index element={<Students />} />
              <Route path="profile" element={<StudentProfile />} />
              <Route
                path="new"
                element={<AddStudent />}
              />
         </Route>

         {/*  for CollegeHead  */}
        <Route
          path="/collegehead"
          element={
          <ProtectedRoute >
          <CollegeHeadDashboard />
          </ProtectedRoute>
          }
        ></Route>



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