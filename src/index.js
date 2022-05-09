import './styles/style.scss';
import keys from './assets/keys.json';
import startKeyboard from './start';
import { changeLang } from './functions';

const ex = ['ShiftLeft', 'ShiftRight', 'ControlLeft', 'ControlRight', 'Tab',
  'CapsLock', 'Delete', 'MetaLeft', 'Enter', 'Backspace', 'AltLeft', 'AltRight'];

let lang = localStorage.getItem('lang') ?? 'en';
startKeyboard(lang);

document.onkeydown = (e) => {
  e.preventDefault();
  if (e.shiftKey && (e.ctrlKey || e.metaKey)) {
    // alert('Опа!');
    lang = (lang === 'en') ? 'ru' : 'en';
    localStorage.setItem('lang', lang);
    const langInfo = document.querySelector('#langInfo');
    langInfo.innerHTML = `Language: <span>${lang === 'en' ? 'English' : 'Russian'}</span >`;
    changeLang(lang);
  }

  document.querySelector('#'.concat(e.code)).classList.add('active');

  if (!ex.includes(e.code)) {
    const zx = keys[e.code];
    const sh = e.shiftKey ? '_s' : '';
    document.querySelector('textarea').value += zx[lang + sh];
  } else {
    // document.querySelector('#keyInfo').innerText = `Pressed: ${e.code}`;
  }
  if (e.code === 'Tab') {
    document.querySelector('textarea').value += '\t';
  }
  if (e.code === 'Enter') {
    document.querySelector('textarea').value += '\n';
  }
  document.querySelector('textarea').focus();
  const inputTxt = document.querySelector('textarea');
  let cursorStart = inputTxt.selectionStart;
  let cursorEnd = inputTxt.selectionEnd;
  const textBeforeCursor = inputTxt.value.substring(0, cursorStart);
  const textAfterCursor = inputTxt.value.substring(cursorEnd);
  if (e.code === 'Backspace') {
    if (cursorStart === cursorEnd) {
      inputTxt.value = textBeforeCursor.slice(0, -1) + textAfterCursor;
      cursorStart = cursorStart === 0 ? 0 : cursorStart - 1;
      cursorEnd = cursorStart;
    } else {
      inputTxt.value = textBeforeCursor + textAfterCursor;
      cursorEnd = cursorStart;
    }
  }
  if (e.code === 'Delete') {
    if (cursorStart === cursorEnd) {
      inputTxt.value = textBeforeCursor + textAfterCursor.slice(1);
    } else {
      inputTxt.value = textBeforeCursor + textAfterCursor;
      cursorEnd = cursorStart;
    }
  }
  if (e.shiftKey) {
    changeLang(`${lang}_s`);
  }
};

document.onkeyup = (e) => {
  document.querySelector('#'.concat(e.code)).classList.remove('active');
  if (!e.shiftKey) changeLang(lang);
};

document.onmousedown = (e) => {
  if (keys[e.target.id]) {
    const ev = new KeyboardEvent('keydown', { code: e.target.id });
    document.dispatchEvent(ev);
  }
};

document.onmouseup = (e) => {
  if (e.target.id) {
    const ev = new KeyboardEvent('keyup', { code: e.target.id });
    document.dispatchEvent(ev);
  }
};
