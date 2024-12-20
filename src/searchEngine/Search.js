/* Тут мб что-то не критичное упустил что рушит верстку, перенес этот функционал в Hero.js
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

function Search() {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    /*const { setSearchQuery } = useSearchContext()

    const jobs = [
        "1C Developer", "Android Developer", "BI Analyst", "Business Analyst",
        "C/C++ Developer", "C# Developer", "Data Analyst", "Database Administrator",
        "Database Developer", "Data Engineer", "Data Scientist", "DevOps",
        "Embedded Developer", "Flutter Developer", "Frontend Developer",
        "Golang Developer", "HR Manager", "iOS Developer", "Java Developer",
        "Machine Learning Engineer", "Network Engineer", "Node.js Developer",
        "Pentester", "PHP Developer", "Product Analyst", "Product Designer",
        "Product Manager", "Project Manager", "Python Developer", "QA Engineer",
        "Ruby Developer", "Rust Developer", "Scala Developer", "System Administrator",
        "System Analyst", "Unity Developer", "Unreal Engine Developer", "UX/UI Designer"
    ];

    const handleInputChange = (event) => {
        const value = event.target.value;
        setQuery(value);

        if (value.trim()) {
            const filteredJobs = jobs.filter((job) =>
                job.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filteredJobs);
            console.log("Current suggestions: ", suggestions);

        } else {
            setSuggestions([]);
        }
    };


    const handleSuggestionClick = (suggestion) => {
        console.log("Clicked suggestion: ", suggestion)
        setQuery(suggestion);
        setSuggestions([]);
        handleSearch(suggestion);
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter" && query.trim()) {
            handleSearch(query); // Выполняем поиск при нажатии Enter
        }
    };

    return (
        <div className="search-container">
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                placeholder="Введите профессию"
            />

            {suggestions.length > 0 && (
                <div className="suggestions-list">
                    {suggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}

                        >
                            {suggestion}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Search;*/
