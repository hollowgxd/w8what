import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ParseResults = ({/* searchQuery*/ }) => {
    const location = useLocation();
    const searchQuery = location.state?.searchQuery || "";
    const [vacancies, setVacancies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchVacancies = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:8000/api/vacancies?query=${encodeURIComponent(searchQuery)}`);

                if (!response.ok) {
                    throw new Error("Ошибка получения вакансий");
                }
                const data = await response.json();
                setVacancies(data.items); // Обработка ответа HH API
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (searchQuery) {
            fetchVacancies();
        }
    }, [searchQuery]);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    return (
        <div>
            <h1>Результаты поиска для: {searchQuery}</h1>
            {vacancies.length > 0 ? (
                <ul>
                    {vacancies.map((vacancy) => (
                        <li key={vacancy.id}>
                            <a href={vacancy.alternate_url} target="_blank" rel="noopener noreferrer">
                                {vacancy.name}
                            </a>
                            <p>{vacancy.employer.name}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Вакансий не найдено</p>
            )}
        </div>
    );
};

export default ParseResults;
