const wordContent = document.querySelector(".word");
const сorrectWords = document.querySelector(".correct-count"); // правильно введенные слова
const wrongWords = document.querySelector(".wrong-count"); // слова, введенные с ошибкой
const mistakes = document.querySelector(".word-mistakes"); // количество ошибок в слове
const timer = document.querySelector("#timer");


let word = getword(); // случайное слово
renderWord(word);

function getword() { // функция генерации случайного слова
    const words = [ // массив случайных слов
        "солнце",
        "успех",
        "любовь",
        "семья",
        "океан",
        "жизнь",
        "ум",
        "турне",
        "лайнер",
        "путь",
        "щенок",
        "бриз",
        "веселье",
        "дружба",
        "радуга",
        "деньги",
        "удача",
        "цветок",
        "улыбка",
        "радость"
    ];

    const index = Math.floor(Math.random() * words.length - 1);
    return words[index];
}

function renderWord(el) { // рендеринг слова по <span>

    wordContent.innerHTML = el.split("").map((char) => `<span>${char}</span>`).join("");
}

let i = 0;
let timerId;
let seconds = 0;
let minutes = 0;

function startTimer() {

    seconds++;

    if (seconds === 59) {
        minutes++;
        seconds = 0;
    }
    timer.textContent = `${format(minutes)}:${format(seconds)}`
}

//добавление незначащих нулей
function format(val) {
    if (val < 10) {
        return `0${val}`
    }
    return val;
}

// таймер при загрузке страницы
window.addEventListener("load", () => {
    timerId = setInterval(startTimer, 1000);
});

function paintLetter(event) { //  функция окрашивания букв

    const spans = wordContent.querySelectorAll("span"); // spanы для каждой буквы

    if (event.key.toLowerCase() === word[i]) { // если нажата верная клавиша
        spans[i].className = "c";
        i++;


        if (i === word.length) { // ввели все слово

            if (mistakes.textContent >= 1) { // если есть ошибки
                wrongWords.textContent++; // добавить 1 к неправильным словам 

            } else { // если нет ошибок
                сorrectWords.textContent++; // добавить к правильным словам
            }

            setTimeout(nextWord, 0); // функция nextWord, обернутая в setTimeout, дает возможность отработать окрашиванию последней буквы

        }

    } else { // если нажата неверная клавиша

        spans[i].className = "w";
        mistakes.textContent++; // добавлять к ошибкам

    }
}

function nextWord() { // функция следующего слова
    //проверка - не закончилась ли игра
    checkWordsCount();

    // рендерим новое слово, перезаписав его в переменную word
    word = getword();
    renderWord(word);

    // обнуляем индекс
    i = 0;
    // обнуляем ошибки в слове
    mistakes.textContent = 0;

}

function startNewGame() { //функция начала следующей игры, обнуление
    minutes = 0;
    seconds = 0;
    timerId = setInterval(startTimer, 1000);
    сorrectWords.textContent = 0;
    wrongWords.textContent = 0;
}


function checkWordsCount() { // проверка на окончание игры
    // Если количество неправильно введенных 5
    if (wrongWords.textContent == 5) {

        clearTimeout(timerId);
        alert("Вы проиграли");
        startNewGame() // начало новой игры
    }

    // Если количество правильно введенных слов 5
    if (сorrectWords.textContent == 5) {

        clearTimeout(timerId);
        alert(`Победа. Ваше время: ${timer.textContent}`);
        startNewGame() // начало новой игры

    }
}

document.addEventListener("keydown", paintLetter); // обработчик на нажатие клавиши