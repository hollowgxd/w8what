import React, { useState } from "react";

function Search() {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const jobs = ["1C Developer",
        "Android Developer",
        "BI Analyst",
        "Business Analyst",
        "C/C++ Developer",
        "C# Developer",
        "Data Analyst",
        "Database Administrator",
        "Database Developer",
        "Data Engineer",
        "Data Scientist",
        "DevOps",
        "Embedded Developer",
        "Flutter Developer",
        "Frontend Developer",
        "Golang Developer",
        "HR Manager",
        "iOS Developer",
        "Java Developer",
        "Machine Learning Engineer",
        "Network Engineer",
        "Node.js Developer",
        "Pentester",
        "PHP Developer",
        "Product Analyst",
        "Product Designer",
        "Product Manager",
        "Project Manager",
        "Python Developer",
        "QA Engineer",
        "Ruby Developer",
        "Rust Developer",
        "Scala Developer",
        "System Administrator",
        "System Analyst",
        "Unity Developer",
        "Unreal Engine Developer",
        "UX/UI Designer"];
    const handleInputChange = (event) => {
        const value = event.target.value;
        setQuery(value);

        if (value.trim()) {
            const filteredJobs = jobs.filter((job) =>
                job.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filteredJobs);
        } else {
            setSuggestions([]);
        }
    };

    return (
        <div className="search-container">
            <input
                type="text"
                id="search"
                value={query}
                placeholder="Поиск по названию вакансии..."
                onChange={handleInputChange}
            />
            <div
                id="suggestions"
                className="suggestions-list"
                style={{ display: suggestions.length > 0 ? "block" : "none" }}
            >
                {suggestions.map((suggestion, index) => (
                    <div key={index} onClick={() => setQuery(suggestion)}>
                        {suggestion}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Search;
