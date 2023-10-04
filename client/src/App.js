import { Routes, Route } from "react-router-dom";
import SignUpForm from "./components/SignUpForm";
import UniversityAPI from "./components/UniversityAPI";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignUpForm />}/>
        <Route path="/api" element={<UniversityAPI />}/>
      </Routes>
    </div>
  );
}

export default App;
