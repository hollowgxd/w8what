import React, { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmptyPage from './temporary/EmptyPage';  // Ваш компонент пустой страницы
import axios from "axios";
import { SearchProvider } from "./searchEngine/SearchContext";
import Search from "./searchEngine/Search";
/*
const fetchToken = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/auth/token");
    return response.data.access_token;
  } catch (error) {
    console.error("Ошибка при получении токена:", error);
    throw error;
  }
};*/


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
        <SearchProvider>
        <div className="wrapper">
          <Header />
          <div className="hero container">
            <Hero />
          </div>
          <Search /> {/* Здесь компонент Search */}
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/empty-page" element={<EmptyPage />} />
          </Routes>
        </div>
        </SearchProvider>
      </Router>

  );
}

export default App;
