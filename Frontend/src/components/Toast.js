import { Component } from '../libs/xQuery/xQuery.js';

class Toast extends Component {
  constructor(parentEl, props) {
    super(document.createElement('div'));

    this.state = {
      text: '¿Continuar?',
      time: 1000,
      ...props,
    };

    this.$.classList.add('modal-container');
    this.render();
    parentEl.appendChild(this.$);
  }

  render() {
    this.$.innerHTML = `
      <div class="modal sm gap-24 padded">
        <img src="../../assets/cancel-user.png" alt="" width="105px"></img>
        <div class="text-dark-gray font-md text-align-center">
          ${this.state.text}
        </div>
        <div class="flex justify-content-space-between gap-24">
          <button class="btn sm btn-secondary" data-select="cancel-btn">
            Cancelar
          </button>
          <button class="btn sm btn-primary" data-select="accept-btn">
            Aceptar
          </button>
        </div>
      </div>
      <div class="modal-overlay"></div>
    `;
    
    const $AcceptBtn = this.$.querySelector('[data-select="accept-btn"]');
    const $CancelBtn = this.$.querySelector('[data-select="cancel-btn"]');
    
    $AcceptBtn.addEventListener('click', () => {
      this.clean();
      this.$.remove();
      this.state.acceptCallback();
    });

    $CancelBtn.addEventListener('click', () => {
      this.clean();
      this.$.remove();
      this.state.cancelCallback();
    });

  }
}

export default Toast;