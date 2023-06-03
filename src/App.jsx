import React from "react";
import Navbar from "./components/Navbar";
import { Routes, Route, BrowserRouter } from "react-router-dom"; //importing reactrouter dom for routing
//Importing pages for routing
import Home from "./pages/Home";
import ApplyTransfer from "./pages/ApplyTransfer";
import ViewTransfer from "./pages/ViewTransfers";
import Settings from "./pages/Settings";
import Login from "./pages/Login";


function App() {
  return (
  <>
  {/* Routes added */}
    <BrowserRouter>
      <Routes>
        <Route path ="/" exact element={<Home/>}></Route>
        <Route path ="/applytransfer" exact element={<ApplyTransfer/>}></Route>
        <Route path ="/viewtransfers" exact element={<ViewTransfer/>}></Route>
        <Route path ="/settings" exact element={<Settings/>}></Route>
        <Route path ="/login" exact element={<Login/>}></Route>
      </Routes>
    </BrowserRouter>

  {/* <Navbar/> */}
  </>
      
    
      
  )
}

export default App;
