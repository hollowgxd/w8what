import fs from "fs/promises";
import {getKeySkills, getTopSkills} from "./requests.js";

const updateSkillsData = async () => {
    try {
        const query = "Frontend Developer"; //заменить в будущем
        const { skillCounts } = await getKeySkills(query);

        //объект для сохранения
        const data = {
            updated_at: new Date().toISOString(),
            skills: getTopSkills
        };

        // Сохраняем в JSON-файл
        await fs.writeFile("skills.json", JSON.stringify(data, null, 2));
        console.log("Данные успешно обновлены");
    } catch (error) {
        console.error("Ошибка при обновлении данных:", error.message);
    }
};

// Запуск скрипта
updateSkillsData();
