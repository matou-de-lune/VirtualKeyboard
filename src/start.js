import Key from './key';
import keys from './assets/keys.json';

export default function startKeyboard(lang) {
  const wrapper = document.createElement('div');
  wrapper.className = 'wrapper';
  document.body.append(wrapper);

  const title = document.createElement('h1');
  title.textContent = 'Virtual Keyboard RSS JS 2022Q1';
  wrapper.append(title);

  const subtitle = document.createElement('h3');
  subtitle.textContent = '(Windows)';
  wrapper.append(subtitle);

  const inform = document.createElement('div');
  inform.id = 'inform';
  wrapper.append(inform);

  const langInfo = document.createElement('span');
  langInfo.id = 'langInfo';
  langInfo.innerHTML = `Language: <span>${lang === 'en' ? 'English' : 'Russian'}</span >`;
  inform.append(langInfo);

  const langCh = document.createElement('span');
  langCh.innerHTML = 'Change language: "Shift"+"Ctrl"';
  inform.append(langCh);

  const text = document.createElement('textarea');
  wrapper.append(text);

  const keyInfo = document.createElement('div');
  keyInfo.id = 'keyInfo';
  keyInfo.innerHTML = '';
  wrapper.append(keyInfo);

  const keyboard = document.createElement('div');
  keyboard.className = 'keyboard';
  wrapper.append(keyboard);

  Object.keys(keys).forEach((k) => {
    const kl = new Key(keys[k][lang], keys[k].size, k);
    document.querySelector('.keyboard').append(kl.makeKey());
  });
}
