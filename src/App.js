import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header"; // Assuming these are correct imports
import Hero from "./components/Hero";
import ParseResults from "./components/nav/ParseResults";

import {getToken,accessToken} from "./server/apiOauth";

function App() {
  const [error, setError] = useState(null);



    if (!accessToken)(getToken(accessToken));

  return (
      <Router>
        <div className="wrapper">
          <Header />
          {error && <div className="error">Error: {error}</div>}
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/results" element={<ParseResults />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;