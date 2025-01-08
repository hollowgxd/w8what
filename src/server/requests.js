// Запросы
const axios = require('axios');
const fetch = require('node-fetch')
const { accessToken } = require("./apiOauth.js");

// Функция для получения вакансий

const getVacancies = async (query) => {
    try {
        const url = new URL("https://api.hh.ru/vacancies");
        url.searchParams.append("text", query);
        url.searchParams.append("per_page", 20);
        url.searchParams.append("page", 1);


        const response = await fetch(url.toString(), {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },

        });
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        // Преобразуем ответ в JSON
        const data = await response.json();
        const vacancies = data.items;

        //return data.items;
    } catch (error) {
        console.error("Ошибка при получении вакансий:", error);
        throw new Error("Ошибка при получении вакансий");
    }

//Функция подсчета в этом списке ключевых слов, так как таковые присутствуют не во всех вакансиях, она будет отдельной
const keySkillsList = [];
for (const vacancy of vacancies) {
    const vacancyResponse = await fetch(
        `https://api.hh.ru/vacancies/${vacancy.id}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    if (!vacancyResponse.ok) {
        console.error(`Ошибка при запросе вакансии ${vacancy.id}`);
        continue;
    }

    const vacancyData = await vacancyResponse.json();
    const skills = vacancyData.key_skills || [];
    keySkillsList.push(...skills.map((skill) => skill.name)); // Извлекаем только название навыка
}
    const skillCounts = keySkillsList.reduce((acc, skill) => {
        acc[skill] = (acc[skill] || 0) + 1;
        return acc;
    }, {});

    // Вернуть отсортированный список навыков
    const sortedSkills = Object.entries(skillCounts)
        .sort((a, b) => b[1] - a[1]) // Сортируем по убыванию количества
        .map(([skill, count]) => ({ skill, count }));

    return sortedSkills;}

catch (error) {
    console.error("Ошибка при получении ключевых навыков:", error.message);
    throw new Error("Ошибка при получении ключевых навыков");
}

};
module.exports = { getVacancies };
