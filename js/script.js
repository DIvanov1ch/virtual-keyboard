import writingSystemKeys from './writing-system-keys.json' assert {type: "json"};
import functionalKeys from './functional-keys.json' assert {type: "json"};
import arrowPadSection from './arrow-pad-section.json' assert {type: "json"};
import keyOrder from './key-order.json' assert {type: "json"};

const BODY = document.querySelector('body');
BODY.className = 'body';
const CONTAINER = document.createElement('section');
CONTAINER.className = 'wrapper';
const TEXT_AREA = document.createElement('textarea');
TEXT_AREA.className = 'text-area';
BODY.insertAdjacentElement('afterbegin', CONTAINER);
CONTAINER.insertAdjacentElement('afterbegin', TEXT_AREA);
const KEYBOARD = document.createElement('div');
KEYBOARD.className = 'keyboard';
CONTAINER.insertAdjacentElement('beforeend', KEYBOARD);
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

// class Key {
//   constructor(key, code) {
//     this.key = key;
//     this.code = code;
//   }
// }

document.addEventListener('keydown', (event) => {
  console.log('key -> ', event.key, 'code -> ', event.code, event);
});
