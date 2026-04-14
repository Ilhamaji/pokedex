import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./pages/Home";
import Details from "./pages/Details";
import About from "./pages/About";

function App() {
  return (
    <ThemeProvider>
      <Router basename={import.meta.env.VITE_BASE_PATH || "/"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:name" element={<Details />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
