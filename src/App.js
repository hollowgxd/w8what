import React from "react";
import Header from "./components/header/Header";
import Hero from "./components/hero/Hero";
import Search from "./components/search/Search";
import "./App.css";

function App() {
    return (
        <div className="wrapper">
            <Header />
            <div className="hero container">
                <Hero />
            </div>
            <Search />
        </div>
    );
}

export default App;
