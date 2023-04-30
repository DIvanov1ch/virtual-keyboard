import writingSystemKeys from './writing-system-keys.json' assert {type: "json"};
import functionalKeys from './functional-keys.json' assert {type: "json"};
import arrowPadSection from './arrow-pad-section.json' assert {type: "json"};
import keyOrder from './key-order.json' assert {type: "json"};
import { Key } from './Key.js';

const BODY = document.querySelector('body');
BODY.className = 'body';
const CONTAINER = document.createElement('div');
CONTAINER.className = 'container';
const TEXT_AREA = document.createElement('textarea');
TEXT_AREA.className = 'text-area';
TEXT_AREA.textContent = '';
BODY.insertAdjacentElement('afterbegin', CONTAINER);
const TITLE = document.createElement('h1');
TITLE.className = 'title';
TITLE.textContent = 'RSS Virtual Keyboard';
CONTAINER.insertAdjacentElement('afterbegin', TITLE);
CONTAINER.insertAdjacentElement('beforeend', TEXT_AREA);
const KEYBOARD = document.createElement('div');
KEYBOARD.className = 'keyboard';
CONTAINER.insertAdjacentElement('beforeend', KEYBOARD);
const INFO = document.createElement('p');
INFO.className = 'info';
CONTAINER.insertAdjacentElement('beforeend', INFO);
INFO.textContent = 'This Keyboard was created in Windows OS';
const LANG_INFO = document.createElement('p');
LANG_INFO.className = 'lang';
CONTAINER.insertAdjacentElement('beforeend', LANG_INFO);
LANG_INFO.textContent = 'To switch between keyboard layouts, press Ctrl+Shift';
const FIRST_LINE = document.createElement('div');
FIRST_LINE.className = 'first-line';
const SECOND_LINE = document.createElement('div');
SECOND_LINE.className = 'second-line';
const THIRD_LINE = document.createElement('div');
THIRD_LINE.className = 'third-line';
const FOURTH_LINE = document.createElement('div');
FOURTH_LINE.className = 'fourth-line';
const FIFTH_LINE = document.createElement('div');
FIFTH_LINE.className = 'fifth-line';

const BOARD_LINES = [FIRST_LINE, SECOND_LINE, THIRD_LINE, FOURTH_LINE, FIFTH_LINE];
for (let i = 0; i < BOARD_LINES.length; i++) {
    KEYBOARD.insertAdjacentElement('beforeend', BOARD_LINES[i]);
}

function createButton() {
    const BUTTON = document.createElement('button');
    BUTTON.className = 'key';
    return BUTTON;
}

for (let i = 0; i < 65; i++) {
    let element = createButton();
    element.classList.add(`${keyOrder[i]}`);
    if (i < 14) {
        FIRST_LINE.insertAdjacentElement('beforeend', element);
    } else if (i < 29) {
        SECOND_LINE.insertAdjacentElement('beforeend', element);
    } else if (i < 42) {
        THIRD_LINE.insertAdjacentElement('beforeend', element);
    } else if (i < 55) {
        FOURTH_LINE.insertAdjacentElement('beforeend', element);
    } else {
        FIFTH_LINE.insertAdjacentElement('beforeend', element);
    }
}

const KEYS = document.getElementsByClassName('key');

function createArrayOfKeys(set, language = "en", isCapsOn = false) {
    return set.map(item => item.description
        ? new Key(item.key, item.code, item.description)
        : isCapsOn
            ? new Key((item.key[language][1]), item.code, (`${language} ${isCapsOn}`))
            : new Key((item.key[language][0]), item.code, (`${language} ${isCapsOn}`)));
}

function fillKeyboard(setOfKeys, description = false) {
    for (let i = 0; i < setOfKeys.length; i++) {
        for (let j = 0; j < KEYS.length; j++) {
            if (setOfKeys[i].code === KEYS[j].classList[1]) {
                KEYS[j].textContent = description ? setOfKeys[i].description : setOfKeys[i].key;
            }
        }
    }
}

const functionalButtons = createArrayOfKeys(functionalKeys);
fillKeyboard(functionalButtons, true);
const arrowButtons = createArrayOfKeys(arrowPadSection);
fillKeyboard(arrowButtons, true);
const lowerCaseEN = createArrayOfKeys(writingSystemKeys, "en", false);
const upperCaseEN = createArrayOfKeys(writingSystemKeys, "en", true);
const lowerCaseRU = createArrayOfKeys(writingSystemKeys, "ru", false);
const upperCaseRU = createArrayOfKeys(writingSystemKeys, "ru", true);
let currentLayout = lowerCaseEN;
fillKeyboard(currentLayout);

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);
document.addEventListener('click', mouseHandler);

function keyDownHandler(event) {
    //console.log('key -> ', event.key, 'code -> ', event.code, event);

    if (!keyOrder.includes(event.code)) {
        event.preventDefault();
        console.log(event);
    } else {
        event.preventDefault();
        TEXT_AREA.focus();
        insertContent(event);
    }
}

function keyUpHandler(event) {
    if (!keyOrder.includes(event.code)) {
        event.preventDefault();
        console.log(event);
    } else {
        let button = [...KEYS].filter(item => item.classList.contains(event.code)).pop();
        button.classList.remove('active');
    }
}

function mouseHandler(event) {
    console.log(TEXT_AREA.selectionStart, TEXT_AREA.selectionEnd);
}

function insertContent(event) {
    let button = [...KEYS].filter(item => item.classList.contains(event.code)).pop();
    button.classList.add('active');
    let keyCode = button.classList[1];
    let content = currentLayout.filter(item => item.code === keyCode).pop().key.trim();
    let selectionStart = TEXT_AREA.selectionStart;
    let selectionEnd = TEXT_AREA.selectionEnd;
    if (selectionStart) {
        let value = TEXT_AREA.value.split('');
        value.splice(selectionStart, 0, content);
        value = value.join('');
        TEXT_AREA.value = value;
        const newSelectionStart = selectionStart + content.length;
        const newSelectionEnd = selectionEnd + content.length;
        TEXT_AREA.setSelectionRange(newSelectionStart, newSelectionEnd);
    } else {
        TEXT_AREA.value += content;
    }
}