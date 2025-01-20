const { getKeySkills } = require('./requests');
const fs = require('fs/promises');

const professions = [
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

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const processProfessions = async () => {
    for (const profession of professions) {
        try {
            console.log(`Запускаю запрос для профессии: ${profession}`);
            await getKeySkills(profession);
            console.log(`Данные для профессии "${profession}" успешно сохранены.`);
        } catch (error) {
            console.error(`Ошибка при обработке профессии "${profession}":`, error.message);
        }

        // Задержка между запросами (например, 10 секунд)
        await delay(10000);
    }

    console.log("Все профессии обработаны.");
};

processProfessions()
    .then(() => console.log("Скрипт завершён."))
    .catch(err => console.error("Ошибка при выполнении скрипта:", err.message));
