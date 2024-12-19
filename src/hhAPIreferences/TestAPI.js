// src/components/TestAPI.js
import React, { useEffect, useState } from "react";
import { fetchJobs } from "./searchEngine/JobStatistics"; // Убедитесь, что fetchJobs настроен правильно

const TestAPI = () => {
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const testAPI = async () => {
            try {
                const data = await fetchJobs("Developer"); // Пример поискового запроса
                setJobs(data);
            } catch (err) {
                setError("Ошибка при подключении к API");
                console.error(err);
            }
        };

        testAPI();
    }, []);

    return (
        <div>
            <h2>Тест API</h2>
            {error ? (
                <p>{error}</p>
            ) : (
                <ul>
                    {jobs.map((job, index) => (
                        <li key={index}>{job.name}</li> // Отображаем название вакансии
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TestAPI;
