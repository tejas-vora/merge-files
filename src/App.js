import logo from "./logo.svg";
import "./App.css";
import ExcelReader from "./components/ExcelReader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <ExcelReader />
      <ToastContainer pauseOnFocusLoss={false} autoClose={3000} />
    </div>
  );
}

export default App;
