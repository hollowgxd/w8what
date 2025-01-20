import axios from 'axios';
import wordFilter from "./wordFilter";
const { accessToken } = require("./apiOauth.js");

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
// Функция для получения ключевых навыков из вакансий
const getKeySkills = async (query) => {
    let allVacancies = [];
    let page = 1;
    const per_page = 50;

    const url = "https://api.hh.ru/vacancies";

    try {
        // Запрос на все страницы вакансий
        while (true) {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: {
                    text: query,
                    per_page: per_page,
                    page: page,
                },
            });

            const vacancies = response.data.items;
            if (vacancies.length === 0) break;

            allVacancies.push(...vacancies);
            page++;
            if ((page+1) > response.data.pages) break;

            await delay(3000);
        }

        const allSkills = [];

        // Подробный запрос по каждой вакансии
        const enrichedVacancies = [];
        for (const vacancy of allVacancies) {
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
                // Нужный нам массив для вывода на фронт
            } catch (err) {
                console.error(
                    `Ошибка при запросе деталей вакансии ${vacancy.id}:`,
                    err.message
                );
                continue;
            }
        }

        // Фильтруем ключевые навыки
        const filteredSkills = allSkills.filter((skill) =>
            wordFilter(skill)
        );

        // Подсчитываем количество упоминаний каждого навыка
        const skillCounts = filteredSkills.reduce((acc, skill) => {
            acc[skill] = (acc[skill] || 0) + 1;

            return acc;
        }, {});

        // Сортируем по убыванию
        const sortedSkills = Object.entries(skillCounts)
            .sort((a, b) => b[1] - a[1])
            .map(([skill, count], index) => ({ rank: index + 1, skill, count }));


        return {
            enrichedVacancies: allVacancies,
            skillCounts: sortedSkills,
        };
    } catch (error) {
        console.error("Ошибка при получении ключевых навыков:", error.message);
        throw new Error("Ошибка при получении ключевых навыков");
    }
};

export { getKeySkills };
export const getTopSkills = async (query) => {
    const { skillCounts } = await getKeySkills(query);
    return skillCounts;
};