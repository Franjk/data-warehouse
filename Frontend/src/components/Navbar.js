import { Component } from '../libs/xQuery/xQuery.js';

class Navbar extends Component {
  constructor(parentEl, props) {
    super(document.createElement('nav'))
    this.state = { ...props }
    this.render();

    parentEl.appendChild(this.$);
  }

  render() {
    let { links } = this.state;
    if (!links) links = [];

    this.$.innerHTML = `
    <nav class="navbar">
      <div class="navbar-logo">LOGO</div>
      <div class="navbar-menu">
        ${links.map(l => (`
          <div class="navbar-item ${l.active && 'active'}">
            <a href="${l.path}">${l.name}</a>
          </div>
          `)).join(' ')}
      </div>
    </nav>
    `
    return this;
  }
}

export default Navbar;