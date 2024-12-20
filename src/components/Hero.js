import React, {useState} from "react";
import "./styles/Hero.css"
import { useNavigate } from "react-router-dom";

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

const Hero = () => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();
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
    const handleSearch = (searchQuery) => {
        /*setSearchQuery(searchQuery);*/
        console.log("Поиск по запросу: ", searchQuery);
        navigate("/empty-page", { state: { searchQuery } });

    };
    return (
        <div className="hero--info">
            <h2>Что умеет w8what</h2>
            <h1>Станьте востребованным на рынке труда, овладев нужными технологиями</h1>
            <p>
                На старте тяжело бывает понять, что от нас хочет работодатель? Какие
                технологии востребованы на рынке? С чем сейчас работают крупные
                предприятия? Сайт поможет вам найти информацию с крупных сервисов
                по поиску вакансий, чтобы вы получили ответы на все эти вопросы.
            </p>

            <div className="action-row">
                <button className="btn">Перейти к списку вакансий</button>

            </div>
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
                                onClick={() => handleSuggestionClick(suggestion)}>
                                {suggestion}

                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Hero;
