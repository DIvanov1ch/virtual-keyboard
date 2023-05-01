import writingSystemKeys from './writing-system-keys.json' assert {type: "json"};
import functionalKeys from './functional-keys.json' assert {type: "json"};
import arrowKeys from './arrow-pad-section.json' assert {type: "json"};
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
LANG_INFO.textContent = 'To switch between keyboard layouts, press Alt+Ctrl';
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
const arrowButtons = createArrayOfKeys(arrowKeys);
fillKeyboard(arrowButtons, true);
const lowerCaseEN = createArrayOfKeys(writingSystemKeys, "en", false);
const upperCaseEN = createArrayOfKeys(writingSystemKeys, "en", true);
const lowerCaseRU = createArrayOfKeys(writingSystemKeys, "ru", false);
const upperCaseRU = createArrayOfKeys(writingSystemKeys, "ru", true);
let currentLayout = lowerCaseEN;
fillKeyboard(currentLayout);
// console.log(functionalKeys.map(item => item.code));

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);
document.addEventListener('mousedown', mouseDownHandler);
document.addEventListener('mouseup', mouseUpHandler);

let langKeys = ['Alt', 'Control'];
let pressed = new Set();
let isCapsLockOn = false;

function keyDownHandler(event) {
    if (!keyOrder.includes(event.code)) {
        event.preventDefault();
    } else if (functionalKeys.map(item => item.code).includes(event.code)) {
        event.preventDefault();
        TEXT_AREA.focus();
        setButtonActive(event.code);
        controlFunctionalKeys(event, event.code);
    } else {
        event.preventDefault();
        TEXT_AREA.focus();
        setButtonActive(event.code);
        insertContent(event.code);
    }
}

function keyUpHandler(event) {
    if (!keyOrder.includes(event.code)) {
        event.preventDefault();
    } else if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
        changeCase();
        setButtonInactive(event.code);
    } else if (event.code === 'AltLeft' || event.code === 'AltRight'
        || event.code === 'ControlLeft' || event.code === 'ControlRight') {
        pressed.delete(event.key);
        setButtonInactive(event.code);
    } else if (event.code === 'CapsLock') {
        isCapsLockOn = !isCapsLockOn;
        if (!isCapsLockOn) {
            setButtonInactive(event.code);
        }
    } else {
        setButtonInactive(event.code);
    }
}

function mouseDownHandler(event) {
    let target = event.target;
    if ([...KEYS].includes(target) && event.button === 0) {
        TEXT_AREA.focus();
        insertContent(target.classList[1]);
        //setButtonActive(target.classList[1]);
    }
}

function mouseUpHandler(event) {
    let target = event.target;
    if ([...KEYS].includes(target) && event.button === 0) {
        TEXT_AREA.focus();
        //setButtonInactive(target.classList[1]);
    }
}

function setButtonActive(eventCode) {
    let button = [...KEYS].filter(item => item.classList.contains(eventCode)).pop();
    button.classList.add('active');
}

function setButtonInactive(eventCode) {
    let button = [...KEYS].filter(item => item.classList.contains(eventCode)).pop();
    button.classList.remove('active');
}

function insertContent(eventCode) {
    let content;
    if (eventCode === 'Space') {
        content = ' ';
    } else if (eventCode === 'Tab') {
        content = '    ';
    } else if (eventCode === 'Enter') {
        content = '\n';
    } else if (arrowKeys.map(item => item.code).includes(eventCode)) {
        content = arrowButtons.filter(key => key.code === eventCode).pop().description;
    } else {
        content = currentLayout.filter(key => key.code === eventCode).pop().key.trim();
    }

    let selectionStart = TEXT_AREA.selectionStart;
    let selectionEnd = TEXT_AREA.selectionEnd;

    let value = TEXT_AREA.value.split('');
    value.splice(selectionStart, 0, content);
    value = value.join('');
    TEXT_AREA.value = value;

    let newSelectionStart = selectionStart + content.length;
    let newSelectionEnd = selectionEnd + content.length;
    TEXT_AREA.setSelectionRange(newSelectionStart, newSelectionEnd);
}

function deleteContent(eventCode) {
    let selectionStart = TEXT_AREA.selectionStart;
    let selectionEnd = TEXT_AREA.selectionEnd;
    let value = TEXT_AREA.value.split('');
    let newSelectionStart;
    let newSelectionEnd;

    if (eventCode === 'Delete') {
        value.splice(selectionStart, 1);
        newSelectionStart = selectionStart;
        newSelectionEnd = selectionEnd;
    } else {
        value.splice((selectionStart - 1), 1);
        if (selectionStart === 0) {
            return;
        }
        newSelectionStart = --selectionStart;
        newSelectionEnd = --selectionEnd;
    }

    value = value.join('');
    TEXT_AREA.value = value;

    TEXT_AREA.setSelectionRange(newSelectionStart, newSelectionEnd);
}

function controlFunctionalKeys(event, eventCode) {

    if (eventCode === 'Backspace' || eventCode === 'Delete') {
        deleteContent(eventCode);
    } else if (eventCode === 'Space' || eventCode === 'Tab' || eventCode === 'Enter') {
        insertContent(eventCode);
    } else if (eventCode === 'ShiftLeft' || eventCode === 'ShiftRight') {
        if (!event.repeat) {
            changeCase();
        }
    } else if (eventCode === 'AltLeft' || eventCode === 'AltRight'
        || eventCode === 'ControlLeft' || eventCode === 'ControlRight') {
        if (event.repeat) {
            return;
        }
        pressed.add(event.key);
        for (const key of langKeys) {
            if (!pressed.has(key)) {
                return;
            }
        }
        //pressed.clear();
        changeLanguage();
    } else if (event.code === 'CapsLock') {
        if (!event.repeat) {
            changeCase();
        }
    }
}

function changeCase() {
    let currentLanguage = currentLayout[0].description.split(' ').shift().toUpperCase();
    let currentCase = currentLayout[0].description.split(' ').pop() === 'true' ? 'upper' : 'lower';
    let currentLayoutStr = `${currentCase}Case${currentLanguage}`;
    switch (currentLayoutStr) {
        case 'lowerCaseEN':
            currentLayout = upperCaseEN;
            fillKeyboard(currentLayout);
            break;
        case 'upperCaseEN':
            currentLayout = lowerCaseEN;
            fillKeyboard(currentLayout);
            break;
        case 'lowerCaseRU':
            currentLayout = upperCaseRU;
            fillKeyboard(currentLayout);
            break;
        case 'upperCaseRU':
            currentLayout = lowerCaseRU;
            fillKeyboard(currentLayout);
            break;
        default:
            currentLayout = lowerCaseEN;
            fillKeyboard(currentLayout);
            break;
    }
}

function changeLanguage() {
    let currentLanguage = currentLayout[0].description.split(' ').shift().toUpperCase();
    let currentCase = currentLayout[0].description.split(' ').pop() === 'true' ? 'upper' : 'lower';
    let currentLayoutStr = `${currentCase}Case${currentLanguage}`;
    switch (currentLayoutStr) {
        case 'lowerCaseEN':
            currentLayout = lowerCaseRU;
            fillKeyboard(currentLayout);
            break;
        case 'upperCaseEN':
            currentLayout = upperCaseRU;
            fillKeyboard(currentLayout);
            break;
        case 'lowerCaseRU':
            currentLayout = lowerCaseEN;
            fillKeyboard(currentLayout);
            break;
        case 'upperCaseRU':
            currentLayout = upperCaseEN;
            fillKeyboard(currentLayout);
            break;
        default:
            currentLayout = lowerCaseEN;
            fillKeyboard(currentLayout);
            break;
    }
}