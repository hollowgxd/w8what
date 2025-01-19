import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getKeySkills } from "../../server/requests.js";

const ParseResults = () => {
    const location = useLocation();
    const searchQuery = location.state?.searchQuery || "";

    const [skillCounts, setSkillCounts] = useState([]); // Состояние для подсчитанных навыков
    const [loading, setLoading] = useState(false); // Состояние для загрузки
    const [error, setError] = useState(null); // Состояние для ошибок

    // Загружаем вакансии при изменении searchQuery
    useEffect(() => {
        const fetchData = async () => {
            if (searchQuery) {
                setLoading(true);
                setError(null);
                try {
                    const { skillCounts } = await getKeySkills(searchQuery); // Декомпозируем объект
                    setSkillCounts(skillCounts);
                } catch (err) {
                    setError("Произошла ошибка при загрузке вакансий");
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [searchQuery]);

    // Если данные загружаются или произошла ошибка
    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container my-5">
            <div className="header text-center mb-4">
                <h1 className="title">Требования на должность {searchQuery || "Не выбрана профессия"} (Все)</h1>
                <p className="subtitle">Анализ вакансий, основанный на данных HeadHunter</p>
            </div>

            {/* Таблица подсчёта ключевых навыков */}
            {skillCounts.length > 0 ? (
                <div className="row">
                    <div className="col-md-12">
                        <h3 className="table-title">Частота упоминания ключевых навыков</h3>
                        <table className="table table-bordered table-hover">
                            <thead className="table-light">
                            <tr>
                                <th>Ранг</th>
                                <th>Навык</th>
                                <th>Упоминаний</th>
                            </tr>
                            </thead>
                            <tbody>
                            {skillCounts.map(({ rank, skill, count }) => (
                                <tr key={rank}>
                                    <td>{rank}</td>
                                    <td>{skill}</td>
                                    <td>{count}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="text-center">Нет данных для отображения</div>
            )}
        </div>
    );
};

export default ParseResults;
