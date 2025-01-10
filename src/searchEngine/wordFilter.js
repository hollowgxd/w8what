const excludedWords = [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "etc",
    "it", "00", "10", "100", "quot", "11", "12", "13", "14", "15", "16", "17", "18",
    "and", "the", "to", "end", "39", "ru", "of", "000", "you", "in", "skills", "back", "with", "for",
    "we", "on",
    "19", "e", "er", "30", "20", "0", "a", "o", "50",
    "be", "our", "will", "is", "your", "as", "that",
    "including", "an", "new", "are", "at", "by",
    "other", "have", "all", "about", "us", "ozon", "music",
    "s7", "on", "1000", "or", "off", "70", "200",
    "based", "ready", "60", "80", "90", "400", "what",
    "from", "40", "war", "24", "skyeng", "tinkoff", "09",
    "2015", "wildberries", "08", "300", "25", "45", "need",
    "do", "28", "500", "2017", "112", "103",
    "122", "2008", "232", "485", "3000", "ll", "2022",
    "400"
];

const wordFilter = (word) => {
    // Сравниваем слово с исключёнными словами
    return !excludedWords.includes(word.toLowerCase());
};

export default wordFilter;
