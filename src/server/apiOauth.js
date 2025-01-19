    let accessToken = process.env.REACT_APP_ACCESS_TOKEN;
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
                        client_id: process.env.REACT_APP_CLIENT_ID,

                        client_secret: process.env.REACT_APP_CLIENT_SECRET,
                    }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`Ошибка получения токена: ${errorData.error_description || "Неизвестная ошибка"}`);
                }

                const data = await response.json();


                accessToken = data.access_token;
                tokenExpiresAt = currentTime + data.expires_in;

                console.log("Токен успешно получен:", accessToken);
            } catch (error) {
                console.error("Ошибка получения токена:", error.message);
                throw new Error("Ошибка авторизации HH API");
            }
        } else if ((tokenExpiresAt - currentTime) <= 360) {
            // Если срок жизни токена менее 6 минут, не обновляем его
            throw new Error("Вы пытаетесь получить токен слишком рано");
        } else {
            console.log("Используем кэшированный токен");
        }

        return accessToken;
    };

    module.exports = { getToken, accessToken };
