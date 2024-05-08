const words = [ // массив случайных слов
    "солнце",
    "успех",
    "любовь",
    "семья",
    "океан",
    "достопримечательность",
    "порядочность",
    "турне",
    "лайнер",
    "путешествие",
    "щенок",
    "бриз",
    "веселье",
    "дружба",
    "радуга",
    "возможность",
    "удача",
    "цветок",
    "улыбка",
    "радость"
];


function getword() { // функция генерации случайного слова

    index = Math.round(Math.random() * words.length);

    return words[index];
}

const content = document.querySelector(".content");
const wordContent = document.querySelector(".word");


let word = getword(); // случайное слово
renderWord(word);

function renderWord(el) { // рендеринг слова по <span>
    wordContent.innerHTML = el.split("").map((char) => `<span>${char}</span>`).join("");
}

const spans = wordContent.querySelectorAll("span"); // spanы для каждой буквы

let i = 0;

document.addEventListener("keydown", function(event) {

    let downSymbol = event.key;

    if (downSymbol.toLowerCase() === spans[i].textContent) {
        spans[i].classList.remove("w");
        spans[i].classList.add("c");
        i++;

    } else {
        spans[i].classList.add("w");
    }

});