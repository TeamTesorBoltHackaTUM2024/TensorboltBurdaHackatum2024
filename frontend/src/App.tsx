import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Test from "./components/Test";

function App() {
  return (
    <BrowserRouter>
      {/* Main layout wrapper */}
      <div className="flex flex-col">
        {/* Main content wrapper */}
        <div className="flex flex-grow">
          {/* Main content */}
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/test" element={<Test />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
