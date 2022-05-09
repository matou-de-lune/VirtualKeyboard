export default class Key {
  constructor(symbol, size, id) {
    this.symbol = symbol;
    this.size = size;
    this.id = id;
  }

  makeKey() {
    const key = document.createElement('div');
    key.className = 'key';
    switch (this.size) {
      case 's': {
        key.classList.add('small');
        break;
      }
      case 'm': {
        key.classList.add('medium');
        break;
      }
      case 'l': {
        key.classList.add('large');
        break;
      }
      case 'xxl': {
        key.classList.add('megalarge');
        break;
      }
      default:
    }
    key.innerText = this.symbol;
    key.id = this.id;
    return key;
  }
}
