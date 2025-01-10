import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getKeySkills } from "../../server/requests.js";

const ParseResults = () => {
    const location = useLocation();
    const searchQuery = location.state?.searchQuery || "";

    const [vacancies, setVacancies] = useState([]); // Состояние для вакансий
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
                    const { enrichedVacancies, skillCounts } = await getKeySkills(searchQuery); // Декомпозируем объект
                    setVacancies(enrichedVacancies);
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

            {/* Данные из vacancies */}
            {vacancies.length > 0 ? (
                <div className="row">
                    {/* Таблица вакансий */}
                    <div className="col-md-12">
                        <h3 className="table-title">Список вакансий</h3>
                        <table className="table table-bordered table-hover">
                            <thead className="table-light">
                            <tr>
                                <th>Название</th>
                                <th>Компания</th>
                                <th>Город</th>
                                <th>Ссылка</th>
                                <th>Ключевые навыки</th>
                            </tr>
                            </thead>
                            <tbody>
                            {vacancies.map((vacancy, index) => (
                                <tr key={index}>
                                    <td>{vacancy.name}</td>
                                    <td>{vacancy.employer?.name || "Не указано"}</td>
                                    <td>{vacancy.area?.name || "Не указан"}</td>
                                    <td>
                                        <a
                                            href={vacancy.alternate_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Открыть
                                        </a>
                                    </td>
                                    <td>{vacancy.skills || "Не указано"}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Таблица подсчёта ключевых навыков */}
                    <div className="col-md-12 mt-5">
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
