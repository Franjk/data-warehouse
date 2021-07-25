class Component {
  constructor(htmlElement) {
    this.$ = htmlElement;
  }

  hide() {
    this.$.classList.add('display-none');
    return this;
  }

  unHide() {
    this.$.classList.remove('display-none');
    return this;
  }

  appendChild(node) {
    this.$.appendChild(node);
    return this;
  }

  appendChildComponent(component) {
    this.$.appendChild(component.$);
    return this;
  }

  addEventListener(event, listener) {
    this.$.addEventListener(event, listener);
    return this;
  }

  setInnerText(str) {
    this.$.innerText = str;
    return this;
  }

  dispatchEvent(event) {
    this.$.dispatchEvent(event);
  }

  get value() {
    return this.$.value;
  }
  set value(val) {
    this.$.value = val;
  }
  get innerText() {
    return this.$.value;
  }
  set innerText(val) {
    this.$.innerText = val; 
  }


}

export default Component;