class Component {
  constructor(htmlElement) {
    this.$ = htmlElement;
  }

  appendChild(node) {
    this.$.appendChild(node);
    return this;
  }

  appendChildComponent(component) {
    this.$.appendChild(component.$);
    return this;
  }

  appendTo(component) {
    this.render();
    component.appendChild(this.$);
    return this;
  }

  addClass(className) {
    this.$.classList.add(className);
    return this;
  }

  addEventListener(event, listener) {
    this.$.addEventListener(event, listener);
    return this;
  }

  clean() {
    this.$.innerHTML = '';
    return this;
  }

  dispatchEvent(event) {
    this.$.dispatchEvent(event);
  }

  hide() {
    this.$.classList.add('display-none');
    return this;
  }

  removeClass(className) {
    this.$.classList.remove(className);
    return this;
  }

  select(query) {
    const prefix = query.slice(0, 2);
    if (prefix === 's:') {
      const content = query.slice(2);
      query = `[data-select="${content}"]`;
    } else if (prefix === 'a:') {
      const content = query.slice(2);
      query = `[data-anchor="${content}"]`;
    }
    return this.$.querySelector(query);
  }

  setInnerHtml(html) {
    this.$.innerHTML = html;
    return this;
  }

  setInnerText(str) {
    this.$.innerText = str;
    return this;
  }

  setState(newState) {
    this.syncState();
    
    this.state = {
      ...this.state,
      ...newState,
    };

    this.render();
    return this;
  }

  toggleClass(className) {
    this.$.classList.toggle(className);
    return this;
  }

  unHide() {
    this.$.classList.remove('display-none');
    return this;
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