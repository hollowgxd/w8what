
//Список вакансий, можно будет сделать по другому но не придумал как
const data = [
    "1C Developer", 
"Android Developer", 
"BI Analyst", 
"Business Analyst", 
"C/C++ Developer", 
"C# Developer", 
"Data Analyst", 
"Database Administrator", 
"Database Developer", 
"Data Engineer", 
"Data Scientist", 
"DevOps", 
"Embedded Developer", 
"Flutter Developer", 
"Frontend Developer", 
"Golang Developer", 
"HR Manager", 
"iOS Developer", 
"Java Developer", 
"Machine Learning Engineer", 
"Network Engineer", 
"Node.js Developer", 
"Pentester", 
"PHP Developer", 
"Product Analyst", 
"Product Designer", 
"Product Manager", 
"Project Manager", 
"Python Developer", 
"QA Engineer", 
"Ruby Developer", 
"Rust Developer", 
"Scala Developer", 
"System Administrator", 
"System Analyst", 
"Unity Developer", 
"Unreal Engine Developer", 
"UX/UI Designer", 
];

function performSearch() {
    const input = document.getElementById("search").value.toLowerCase();
    const suggestionsBox = document.getElementById("suggestions");
    suggestionsBox.innerHTML = ""; // Очистить предыдущие предложения

    if (input) {
        const filteredData = data.filter(item => item.toLowerCase().includes(input));

        if (filteredData.length > 0) {
            suggestionsBox.style.display = "block"; // Показываем список
            filteredData.forEach(item => {
                const suggestionDiv = document.createElement("div");
                suggestionDiv.innerHTML = item;
                suggestionDiv.onclick = function() {
                    document.getElementById("search").value = item; // Установка значения при клике
                    suggestionsBox.style.display = "none"; // Скрыть список после выбора
                };
                suggestionsBox.appendChild(suggestionDiv);
            });
        } else {
            suggestionsBox.style.display = "none"; // Скрыть, если нет результатов
        }
    } else {
        suggestionsBox.style.display = "none"; // Скрыть при пустом вводе
    }
}
