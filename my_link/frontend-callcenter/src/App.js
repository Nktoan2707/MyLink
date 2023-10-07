import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage/IndexPage";
import Login from "./pages/Login/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/dashboard" element={<IndexPage />}></Route>
      </Routes>
      {/* <Login /> */}
      {/* <IndexPage /> */}
      <ToastContainer />
    </div>
  );
}

export default App;
