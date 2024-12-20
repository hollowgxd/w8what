const express = require("express");
const axios = require("axios");
const cors = require("cors");


const app = express();
const port = 8000;
let accessToken = null;


app.use(cors());
// Middleware для получения токена перед запросами
const getToken = async () => {
    if (!accessToken) {
        try {
            const response = await axios.post(
                "https://hh.ru/oauth/token",
                new URLSearchParams({
                    grant_type: "client_credentials",
                    client_id: "QC74Q3IACC4D3N9REPMPQA5IN3JCGNKRTOADCGR7LMQE002SPEQGNGU3ADSCOOQ5",
                    client_secret: "NPMU0E474CIUJ751Q6NGSDBR955P84D8B5V91R3K4NOQG649SD4IA3H7D8JUI43G",
                }),
                { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
            );
            accessToken = response.data.access_token;
        } catch (error) {
            console.error("Ошибка получения токена:", error);
            throw new Error("Ошибка авторизации HH API");
        }
    }
};

// Эндпоинт для получения вакансий
app.get("/api/vacancies", async (req, res) => {
    const query = req.query.query;  // Получаем запрос (searchQuery) из параметров

    if (!query) {
        return res.status(400).json({ error: "Параметр query не найден" });
    }

    try {
        await getToken(); // Убедитесь, что токен доступен

        // Запрос к API HH для получения вакансий
        const response = await axios.get("https://api.hh.ru/vacancies", {
            params: {
                text: query, // Поиск вакансий по запросу
                access_token: accessToken // Добавляем токен для авторизации
            }
        });

        res.json(response.data);  // Отправляем вакансии обратно клиенту
    } catch (error) {
        console.error("Ошибка получения вакансий:", error);
        res.status(500).json({ error: "Ошибка при получении вакансий" });
    }
});

// Сброс токена (для тестирования)
app.get("/api/auth/reset", (req, res) => {
    accessToken = null;
    res.json({ message: "Токен сброшен" });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
