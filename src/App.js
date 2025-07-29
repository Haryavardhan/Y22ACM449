import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Shortener from "./Shortener";
import Statistics from "./Statistics";

function App() {
  return (
    <Router>
      <div style={{ padding: 20 }}>
        <nav style={{ marginBottom: 20 }}>
          <Link to="/" style={{ marginRight: 10 }}>Shortener</Link>
          <Link to="/stats">Statistics</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Shortener />} />
          <Route path="/stats" element={<Statistics />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
