import axios from 'axios';  // для ES-модулей
import wordFilter from "../searchEngine/wordFilter";

const { accessToken } = require("./apiOauth.js"); // Импортируем токен
// Функция для получения ключевых навыков из вакансий
const getKeySkills = async (query) => {
    try {
        const url = "https://api.hh.ru/vacancies";

        // Основной запрос на список вакансий
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                text: query,
                per_page: 20,
                page: 1,
            },
        });

        const vacancies = response.data.items;
        const allSkills = [];

        // Подробный запрос по каждой вакансии
        const enrichedVacancies = [];
        for (const vacancy of vacancies) {
            try {
                const vacancyResponse = await axios.get(
                    `https://api.hh.ru/vacancies/${vacancy.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );

                const vacancyData = vacancyResponse.data;
                const skills =
                    vacancyData.key_skills?.map((skill) => skill.name).join(", ") ||
                    "Не указано";

                enrichedVacancies.push({
                    ...vacancy,
                    skills,
                });
                allSkills.push(...vacancyData.key_skills.map(skill => skill.name));
                //нужный нам массив для вывода на фронт
            } catch (err) {
                console.error(
                    `Ошибка при запросе деталей вакансии ${vacancy.id}:`,
                    err.message
                );
                continue;
            }
        }
        const filteredSkills = allSkills.filter((skill) =>
            wordFilter(skill)
        );

        // Подсчитываем количество упоминаний каждого навыка
        const skillCounts = filteredSkills.reduce((acc, skill) => {
            acc[skill] = (acc[skill] || 0) + 1;
            return acc;
        }, {});


        const sortedSkills = Object.entries(skillCounts)
            .sort((a, b) => b[1] - a[1]) // Сортируем по убыванию количества
            .map(([skill, count], index) => ({ rank: index + 1, skill, count }));

        return {
            enrichedVacancies: vacancies,
            skillCounts: sortedSkills,
        };
    } catch (error) {
        console.error("Ошибка при получении ключевых навыков:", error.message);
        throw new Error("Ошибка при получении ключевых навыков");
    }
};

export { getKeySkills };
