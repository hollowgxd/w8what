import React, { useState } from "react";
import "./App.css";
/*import axios from "axios";*/
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from "./components/Header";
import Hero from "./components/Hero";
//import Footer from "./components/Footer";

import ParseResults from './components/nav/ParseResults';




function App() {
  const [skills, setSkills] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const countOccurrences = (arr) => {
    return arr.reduce((acc, item) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {});
  };



  return (

      <Router>
        <div className="wrapper">
          <Header />
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/empty-page" element={<ParseResults />} />
          </Routes>
        </div>
      </Router>

  );
}

export default App;
