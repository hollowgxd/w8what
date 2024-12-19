const express = require("express");
const axios = require("axios");

const app = express();
const port = 8000;

// Эндпоинт для получения токена
app.get("/api/auth/token", async (req, res) => {
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

        res.json(response.data); // Возвращаем токен клиенту
    } catch (error) {
        res.status(500).json({ error: "Ошибка при получении токена" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
