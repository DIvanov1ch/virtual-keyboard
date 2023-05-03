import writingSystemKeys from './writing-system-keys.js';
import functionalKeys from './functional-keys.js';
import arrowKeys from './arrow-pad-section.js';
import keyOrder from './key-order.js';
import Key from './Key.js';

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
LANG_INFO.textContent = 'To switch between keyboard layouts, press Left Alt+Ctrl';
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
for (let i = 0; i < BOARD_LINES.length; i += 1) {
  KEYBOARD.insertAdjacentElement('beforeend', BOARD_LINES[i]);
}

function createButton() {
  const BUTTON = document.createElement('button');
  BUTTON.className = 'key';
  return BUTTON;
}

for (let i = 0; i < 64; i += 1) {
  const element = createButton();
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

function createArrayOfKeys(set, language = 'en', isCapsOn = false) {
  let result = null;
  if (set[0].description) {
    result = set.map((item) => new Key(item.key, item.code, item.description));
  } else if (isCapsOn) {
    result = set.map((item) => new Key((item.key[language][1]), item.code, (`${language} ${isCapsOn}`)));
  } else {
    result = set.map((item) => new Key((item.key[language][0]), item.code, (`${language} ${isCapsOn}`)));
  }
  return result;
}

function fillKeyboard(setOfKeys, description = false) {
  for (let i = 0; i < setOfKeys.length; i += 1) {
    for (let j = 0; j < KEYS.length; j += 1) {
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
const lowerCaseEN = createArrayOfKeys(writingSystemKeys, 'en', false);
const upperCaseEN = createArrayOfKeys(writingSystemKeys, 'en', true);
const lowerCaseRU = createArrayOfKeys(writingSystemKeys, 'ru', false);
const upperCaseRU = createArrayOfKeys(writingSystemKeys, 'ru', true);

const LANG_KEYS = ['Alt', 'Control'];
const PRESSED = new Set();
let isCapsLockOn = false;
let currentLanguage;
let currentLayout;

function putLanguageToLocalStorage() {
  localStorage.setItem('language', currentLanguage);
}

function getLanguageFromLocalStorage() {
  if (localStorage.getItem('language')) {
    currentLanguage = localStorage.getItem('language');
    currentLayout = currentLanguage === 'RU' ? lowerCaseRU : lowerCaseEN;
  } else {
    currentLanguage = 'EN';
    currentLayout = lowerCaseEN;
  }
  fillKeyboard(currentLayout);
}

window.addEventListener('beforeunload', putLanguageToLocalStorage);
document.addEventListener('DOMContentLoaded', getLanguageFromLocalStorage);

function setButtonActive(eventCode) {
  const button = [...KEYS].filter((item) => item.classList.contains(eventCode)).pop();
  button.classList.add('active');
}

function setButtonInactive(eventCode) {
  const button = [...KEYS].filter((item) => item.classList.contains(eventCode)).pop();
  button.classList.remove('active');
}

function changeCase() {
  const currentCase = currentLayout[0].description.split(' ').pop() === 'true' ? 'upper' : 'lower';
  const currentLayoutStr = `${currentCase}Case${currentLanguage}`;
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
  const currentCase = currentLayout[0].description.split(' ').pop() === 'true' ? 'upper' : 'lower';
  const currentLayoutStr = `${currentCase}Case${currentLanguage}`;
  switch (currentLayoutStr) {
    case 'lowerCaseEN':
      currentLayout = lowerCaseRU;
      currentLanguage = 'RU';
      fillKeyboard(currentLayout);
      break;
    case 'upperCaseEN':
      currentLayout = upperCaseRU;
      currentLanguage = 'RU';
      fillKeyboard(currentLayout);
      break;
    case 'lowerCaseRU':
      currentLayout = lowerCaseEN;
      currentLanguage = 'EN';
      fillKeyboard(currentLayout);
      break;
    case 'upperCaseRU':
      currentLayout = upperCaseEN;
      fillKeyboard(currentLayout);
      currentLanguage = 'EN';
      break;
    default:
      currentLayout = lowerCaseEN;
      currentLanguage = 'EN';
      fillKeyboard(currentLayout);
      break;
  }
}

function insertContent(eventCode) {
  let content;
  if (eventCode === 'Space') {
    content = ' ';
  } else if (eventCode === 'Tab') {
    content = '    ';
  } else if (eventCode === 'Enter') {
    content = '\n';
  } else if (arrowKeys.map((item) => item.code).includes(eventCode)) {
    content = arrowButtons.filter((key) => key.code === eventCode).pop().description;
  } else {
    content = currentLayout.filter((key) => key.code === eventCode).pop().key.trim();
  }

  const { selectionStart } = TEXT_AREA;
  const { selectionEnd } = TEXT_AREA;

  let value = TEXT_AREA.value.split('');
  value.splice(selectionStart, 0, content);
  value = value.join('');
  TEXT_AREA.value = value;

  const newSelectionStart = selectionStart + content.length;
  const newSelectionEnd = selectionEnd + content.length;
  TEXT_AREA.setSelectionRange(newSelectionStart, newSelectionEnd);
}

function deleteContent(eventCode) {
  const { selectionStart } = TEXT_AREA;
  const { selectionEnd } = TEXT_AREA;
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
    newSelectionStart = (selectionStart - 1);
    newSelectionEnd = (selectionEnd - 1);
  }

  value = value.join('');
  TEXT_AREA.value = value;

  TEXT_AREA.setSelectionRange(newSelectionStart, newSelectionEnd);
}

function controlFunctionalKeys(event, code) {
  if (code === 'Backspace' || code === 'Delete') {
    deleteContent(code);
  } else if (code === 'Space' || code === 'Tab' || code === 'Enter') {
    insertContent(code);
  } else if (code === 'ShiftLeft' || code === 'ShiftRight') {
    if (!event.repeat) {
      changeCase();
    }
  } else if (code === 'AltLeft' || code === 'ControlLeft' || code === 'ControlRight') {
    if (event.repeat) {
      return;
    }
    PRESSED.add(event.key);
    for (let i = 0; i < LANG_KEYS.length; i += 1) {
      const key = LANG_KEYS[i];
      if (!PRESSED.has(key)) {
        return;
      }
    }
    changeLanguage();
  } else if (code === 'CapsLock') {
    if (!event.repeat) {
      changeCase();
    }
  }
}

function keyDownHandler(event) {
  if (!keyOrder.includes(event.code)) {
    event.preventDefault();
  } else if (functionalKeys.map((item) => item.code).includes(event.code)) {
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
  } else if (event.code === 'AltLeft' || event.code === 'ControlLeft' || event.code === 'ControlRight') {
    PRESSED.delete(event.key);
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
  const { target } = event;
  if (functionalKeys.map((item) => item.code).includes(target.classList[1]) && event.button === 0) {
    TEXT_AREA.focus();
    if (target.classList[1] === 'ShiftLeft' || target.classList[1] === 'ShiftRight') {
      if (target.classList[2]) {
        return;
      }
      setButtonActive(target.classList[1]);
      controlFunctionalKeys(event, target.classList[1]);
    } else {
      setButtonActive(target.classList[1]);
      controlFunctionalKeys(event, target.classList[1]);
    }
  } else if ([...KEYS].includes(target) && event.button === 0) {
    TEXT_AREA.focus();
    insertContent(target.classList[1]);
  }
}

function mouseUpHandler(event) {
  const { target } = event;
  if ((target.classList[1] === 'ShiftLeft' || target.classList[1] === 'ShiftRight') && event.button === 0) {
    changeCase();
    setButtonInactive(target.classList[1]);
  } else if (target.classList[1] === 'CapsLock') {
    isCapsLockOn = !isCapsLockOn;
    if (!isCapsLockOn) {
      setButtonInactive(target.classList[1]);
    }
  } else if ([...KEYS].includes(target) && event.button === 0) {
    TEXT_AREA.focus();
    setButtonInactive(target.classList[1]);
  }
}

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);
document.addEventListener('mousedown', mouseDownHandler);
document.addEventListener('mouseup', mouseUpHandler);
