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

function getword() { // функция генерации случайного слова
    index = Math.floor(Math.random() * words.length);
    return words[index];
}

const content = document.querySelector(".content");
const wordContent = document.querySelector(".word");
const сorrectWords = document.querySelector(".correct-count"); // правильно введенные слова
const wrongWords = document.querySelector(".wrong-count"); // слова, введенные с ошибкой
const mistakes = document.querySelector(".word-mistakes"); // количество ошибок в слове
const timer = document.querySelector("#timer");

let word = getword(); // случайное слово
renderWord(word);

function renderWord(el) { // рендеринг слова по <span>
    const wordContent = document.querySelector(".word");
    wordContent.innerHTML = el.split("").map((char) => `<span>${char}</span>`).join("");
}

const spans = wordContent.querySelectorAll("span"); // spanы для каждой буквы

let i = 0;
let timerId;
let seconds = 0;
let minutes = 0;
mistakes.textContent = 0;
сorrectWords.textContent = 0;
wrongWords.textContent = 0;


function startTimer() {
    let [minutes, seconds] = timer.textContent.split(":").map(Number);
    seconds++;

    if (seconds === 60) {
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

    if (event.key === "Shift" || event.key === "Control" || event.key === "CapsLock") return; // не принимать за ошибку нажатие смены языка и капслок

    if (event.key.toLowerCase() === spans[i].textContent) { // если нажата верная клавиша
        spans[i].classList.remove("w");
        spans[i].classList.add("c");
        i++;


        if (i === spans.length) { // ввели все слово

            if (mistakes.textContent >= 1) { // если есть ошибки
                wrongWords.textContent++; // добавить 1 к неправильным словам 

            } else { // если нет ошибок
                сorrectWords.textContent++; // добавить к правильным словам

            }

            spans.innerHTML = ""
            renderWord(getword());

        }


    } else { // если нажата неверная клавиша
        spans[i].classList.add("w");
        mistakes.textContent++; // добавлять к ошибкам

    }
}

document.addEventListener("keydown", paintLetter);