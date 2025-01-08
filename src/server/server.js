// server
const express = require("express");
const { getVacancies } = require("./requests.js"); // Импортируем сервис для получения вакансий
const cors = require("cors");

const app = express();
const port = 8000;

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
}));
// Эндпоинт для получения вакансий
app.get("/api/vacancies", async (req, res) => {
    const query = req.query.query;

    if (!query) {
        return res.status(400).json({ error: "Параметр query не найден" });
    }

    try {
        const vacancies = await getVacancies(query); // Получаем вакансии с использованием функции
        res.json(vacancies); // Отправляем вакансии клиенту
    } catch (error) {
        console.error("Ошибка при получении вакансий:", error);
        res.status(500).json({ error: "Ошибка при получении вакансий" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
