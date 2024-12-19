import React, { useState } from "react";
import StatisticsTable from "./StatisticsTable";
import axios from "axios";
import { useSearchContext } from "../searchEngine/SearchContext";

const JobStatistics = () => {
    const { searchQuery } = useSearchContext(); // Получаем запрос из контекста
    const [skills, setSkills] = useState([]);
    const [keywords, setKeywords] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Функция для подсчета количества упоминаний каждого элемента
    const countOccurrences = (arr) => {
        return arr.reduce((acc, item) => {
            acc[item] = (acc[item] || 0) + 1;
            return acc;
        }, {});
    };

    // Запрос для получения токена
    const fetchToken = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/auth/token");
            return response.data.access_token;
        } catch (error) {
            console.error("Ошибка при получении токена:", error);
            throw error;
        }
    };

    // Получение данных о вакансиях
    const fetchJobData = async (searchTerm) => {
        setLoading(true);
        setError(""); // Сброс ошибок

        try {
            const token = await fetchToken();
            const response = await axios.get("https://api.hh.ru/vacancies", {
                params: { text: searchTerm },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.items;
        } catch (error) {
            console.error("Ошибка при запросе вакансий:", error);
            setError("Произошла ошибка при получении данных.");
            setLoading(false);
        }

    };

    // Обработка данных вакансий
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

    // При поиске по запросу
    React.useEffect(() => {
        if (searchQuery) {
            fetchJobData(searchQuery).then((jobs) => {
                if (jobs) {
                    handleJobData(jobs);
                }
            });
        }
    }, [searchQuery]);

    return (
        <div className="job-statistics">
            <h1>Анализ вакансий</h1>
            {loading && <p>Загрузка...</p>}
            {error && <p>{error}</p>}

            <StatisticsTable title="Навыки" data={skills} />
            <StatisticsTable title="Ключевые слова" data={keywords} />
        </div>
    );
};

export default JobStatistics;
