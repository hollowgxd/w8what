// EmptyPage.js
import React, { useState, useEffect } from "react";
import { useSearchContext } from "../searchEngine/SearchContext";
import StatisticsTable from "../searchEngine/StatisticsTable";
import axios from "axios";
import JobStatistics, { fetchJobData } from "../searchEngine/JobStatistics";


function EmptyPage() {
    const { searchQuery } = useSearchContext(); // Получаем запрос из контекста
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

    const fetchToken = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/auth/token");
            return response.data.access_token;
        } catch (error) {
            console.error("Ошибка при получении токена:", error);
            throw error;
        }
    };


    const handleJobData = (jobs) => {
        const skills = [];
        const keywords = [];

        jobs.forEach((job) => {
            const jobSkills = job.snippet?.requirement?.split(",") || [];
            const jobKeywords = job.snippet?.responsibility?.split(" ") || [];

            skills.push(...jobSkills.map((skill) => skill.trim()));
            keywords.push(...jobKeywords.map((word) => word.trim()));
        });

        const skillCounts = countOccurrences(skills);
        const keywordCounts = countOccurrences(keywords);

        setSkills(Object.entries(skillCounts).map(([title, amount]) => ({ title, amount })));
        setKeywords(Object.entries(keywordCounts).map(([title, amount]) => ({ title, amount })));

        setLoading(false);
    };

    // Запрашиваем данные, когда searchQuery изменяется
    useEffect(() => {
        if (searchQuery) {
            JobStatistics(searchQuery).then((jobs) => {
                if (jobs) {
                    handleJobData(jobs);
                }
            });
        }
    }, [searchQuery]);

    return (
        <div className="job-statistics">
            <h1>Анализ вакансий для "{searchQuery}"</h1>
            {loading && <p>Загрузка...</p>}
            {error && <p>{error}</p>}

            <StatisticsTable title="Навыки" data={skills} />
            <StatisticsTable title="Ключевые слова" data={keywords} />
        </div>
    );
}

export default EmptyPage;
