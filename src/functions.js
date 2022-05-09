import keys from './assets/keys.json';

// eslint-disable-next-line import/prefer-default-export
export function changeLang(lang) {
  const keysArr = document.querySelectorAll('.key');
  keysArr.forEach((k) => {
    const z = k;
    z.textContent = keys[k.id][lang];
  });
}
