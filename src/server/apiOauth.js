let accessToken = "APPLKT5LFOPK9RLLJMT30I78NQLRH884NI2KT1R5000UH1BU8DB3L19R53NIPDTU";
let tokenExpiresAt = null;

const getToken = async () => {
    const currentTime = Math.floor(Date.now() / 1000);

    if (!accessToken || (tokenExpiresAt && currentTime >= tokenExpiresAt)) {
        try {
            console.log("Запрашиваем новый токен...");

            const response = await fetch("https://hh.ru/oauth/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    grant_type: "client_credentials",
                    client_id: "QC74Q3IACC4D3N9REPMPQA5IN3JCGNKRTOADCGR7LMQE002SPEQGNGU3ADSCOOQ5",
                    client_secret: "NPMU0E474CIUJ751Q6NGSDBR955P84D8B5V91R3K4NOQG649SD4IA3H7D8JUI43G",
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Ошибка получения токена: ${errorData.error_description || "Неизвестная ошибка"}`);
            }

            const data = await response.json();

            // Сохраняем новый токен и время истечения
            accessToken = data.access_token;
            tokenExpiresAt = currentTime + data.expires_in;

            console.log("Токен успешно получен:", accessToken);
        } catch (error) {
            console.error("Ошибка получения токена:", error.message);
            throw new Error("Ошибка авторизации HH API");
        }
    } else if ((tokenExpiresAt - currentTime) <= 360) {
        // Если до истечения токена остаётся менее 6 минут, запрещаем его использование
        throw new Error("Вы пытаетесь получить токен слишком рано");
    } else {
        console.log("Используем кэшированный токен");
    }

    return accessToken;
};

module.exports = { getToken, accessToken };
