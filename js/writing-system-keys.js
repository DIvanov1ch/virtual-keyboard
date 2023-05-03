const writingSystemKeys = [
  {
    code: 'Backquote',
    key: {
      en: [
        '`',
        '~',
      ],
      ru: [
        'ё',
        'Ё',
      ],
    },
  },
  {
    code: 'Backslash',
    key: {
      en: [
        '\\',
        '|',
      ],
      ru: [
        '\\',
        '/',
      ],
    },
  },
  {
    code: 'BracketLeft',
    key: {
      en: [
        '[',
        '{',
      ],
      ru: [
        'х',
        'Х',
      ],
    },
  },
  {
    code: 'BracketRight',
    key: {
      en: [
        ']',
        '}',
      ],
      ru: [
        'ъ',
        'Ъ',
      ],
    },
  },
  {
    code: 'Comma',
    key: {
      en: [
        ',',
        '<',
      ],
      ru: [
        'б',
        'Б',
      ],
    },
  },
  {
    code: 'Digit0',
    key: {
      en: [
        '0',
        ')',
      ],
      ru: [
        '0',
        ')',
      ],
    },
  },
  {
    code: 'Digit1',
    key: {
      en: [
        '1',
        '!',
      ],
      ru: [
        '1',
        '!',
      ],
    },
  },
  {
    code: 'Digit2',
    key: {
      en: [
        '2',
        '@',
      ],
      ru: [
        '2',
        '"',
      ],
    },
  },
  {
    code: 'Digit3',
    key: {
      en: [
        '3',
        '#',
      ],
      ru: [
        '3',
        '№',
      ],
    },
  },
  {
    code: 'Digit4',
    key: {
      en: [
        '4',
        '$',
      ],
      ru: [
        '4',
        ';',
      ],
    },
  },
  {
    code: 'Digit5',
    key: {
      en: [
        '5',
        '%',
      ],
      ru: [
        '5',
        '%',
      ],
    },
  },
  {
    code: 'Digit6',
    key: {
      en: [
        '6',
        '^',
      ],
      ru: [
        '6',
        ':',
      ],
    },
  },
  {
    code: 'Digit7',
    key: {
      en: [
        '7',
        '&',
      ],
      ru: [
        '7',
        '?',
      ],
    },
  },
  {
    code: 'Digit8',
    key: {
      en: [
        '8',
        '*',
      ],
      ru: [
        '8',
        '*',
      ],
    },
  },
  {
    code: 'Digit9',
    key: {
      en: [
        '9',
        '(',
      ],
      ru: [
        '9',
        '(',
      ],
    },
  },
  {
    code: 'Equal',
    key: {
      en: [
        '=',
        '+',
      ],
      ru: [
        '=',
        '+',
      ],
    },
  },
  {
    code: 'KeyA',
    key: {
      en: [
        'a',
        'A',
      ],
      ru: [
        'ф',
        'Ф',
      ],
    },
  },
  {
    code: 'KeyB',
    key: {
      en: [
        'b',
        'B',
      ],
      ru: [
        'и',
        'И',
      ],
    },
  },
  {
    code: 'KeyC',
    key: {
      en: [
        'c',
        'C',
      ],
      ru: [
        'с',
        'С',
      ],
    },
  },
  {
    code: 'KeyD',
    key: {
      en: [
        'd',
        'D',
      ],
      ru: [
        'в',
        'В',
      ],
    },
  },
  {
    code: 'KeyE',
    key: {
      en: [
        'e',
        'E',
      ],
      ru: [
        'у',
        'У',
      ],
    },
  },
  {
    code: 'KeyF',
    key: {
      en: [
        'f',
        'F',
      ],
      ru: [
        'а',
        'А',
      ],
    },
  },
  {
    code: 'KeyG',
    key: {
      en: [
        'g',
        'G',
      ],
      ru: [
        'п',
        'П',
      ],
    },
  },
  {
    code: 'KeyH',
    key: {
      en: [
        'h',
        'H',
      ],
      ru: [
        'р',
        'Р',
      ],
    },
  },
  {
    code: 'KeyI',
    key: {
      en: [
        'i',
        'I',
      ],
      ru: [
        'ш',
        'Ш',
      ],
    },
  },
  {
    code: 'KeyJ',
    key: {
      en: [
        'j',
        'J',
      ],
      ru: [
        'о',
        'О',
      ],
    },
  },
  {
    code: 'KeyK',
    key: {
      en: [
        'k',
        'K',
      ],
      ru: [
        'л',
        'Л',
      ],
    },
  },
  {
    code: 'KeyL',
    key: {
      en: [
        'l',
        'L',
      ],
      ru: [
        'д',
        'Д',
      ],
    },
  },
  {
    code: 'KeyM',
    key: {
      en: [
        'm',
        'M',
      ],
      ru: [
        'ь',
        'Ь',
      ],
    },
  },
  {
    code: 'KeyN',
    key: {
      en: [
        'n',
        'N',
      ],
      ru: [
        'т',
        'Т',
      ],
    },
  },
  {
    code: 'KeyO',
    key: {
      en: [
        'o',
        'O',
      ],
      ru: [
        'щ',
        'Щ',
      ],
    },
  },
  {
    code: 'KeyP',
    key: {
      en: [
        'p',
        'P',
      ],
      ru: [
        'з',
        'З',
      ],
    },
  },
  {
    code: 'KeyQ',
    key: {
      en: [
        'q',
        'Q',
      ],
      ru: [
        'й',
        'Й',
      ],
    },
  },
  {
    code: 'KeyR',
    key: {
      en: [
        'r',
        'R',
      ],
      ru: [
        'к',
        'К',
      ],
    },
  },
  {
    code: 'KeyS',
    key: {
      en: [
        's',
        'S',
      ],
      ru: [
        'ы',
        'Ы',
      ],
    },
  },
  {
    code: 'KeyT',
    key: {
      en: [
        't',
        'T',
      ],
      ru: [
        'е',
        'Е',
      ],
    },
  },
  {
    code: 'KeyU',
    key: {
      en: [
        'u',
        'U',
      ],
      ru: [
        'г',
        'Г',
      ],
    },
  },
  {
    code: 'KeyV',
    key: {
      en: [
        'v',
        'V',
      ],
      ru: [
        'м',
        'М',
      ],
    },
  },
  {
    code: 'KeyW',
    key: {
      en: [
        'w',
        'W',
      ],
      ru: [
        'ц',
        'Ц',
      ],
    },
  },
  {
    code: 'KeyX',
    key: {
      en: [
        'x',
        'X',
      ],
      ru: [
        'ч',
        'Ч',
      ],
    },
  },
  {
    code: 'KeyY',
    key: {
      en: [
        'y',
        'Y',
      ],
      ru: [
        'н',
        'Н',
      ],
    },
  },
  {
    code: 'KeyZ',
    key: {
      en: [
        'z',
        'Z',
      ],
      ru: [
        'я',
        'Я',
      ],
    },
  },
  {
    code: 'Minus',
    key: {
      en: [
        '-',
        '_',
      ],
      ru: [
        '-',
        '_',
      ],
    },
  },
  {
    code: 'Period',
    key: {
      en: [
        '.',
        '>',
      ],
      ru: [
        'ю',
        'Ю',
      ],
    },
  },
  {
    code: 'Quote',
    key: {
      en: [
        "'",
        '"',
      ],
      ru: [
        'э',
        'Э',
      ],
    },
  },
  {
    code: 'Semicolon',
    key: {
      en: [
        ';',
        ':',
      ],
      ru: [
        'ж',
        'Ж',
      ],
    },
  },
  {
    code: 'Slash',
    key: {
      en: [
        '/',
        '?',
      ],
      ru: [
        '.',
        ',',
      ],
    },
  },
];
export default writingSystemKeys;
