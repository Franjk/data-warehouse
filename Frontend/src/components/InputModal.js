import { Component } from '../libs/xQuery/xQuery.js';

class InputModal extends Component {
  constructor(parentEl, props) {
    super(document.createElement('div'));

    this.state = {
      text: '',
      inputValue: '',
      acceptCallback: () => {},
      cancelCallback: () => {},
      ...props,
    };

    this.$.classList.add('modal-container');
    this.render();
    parentEl.appendChild(this.$);
  }

  render() {
    this.$.innerHTML = `
      <div class="modal sm gap-24 padded">
        <img src="../../assets/cloud-upload.png" alt="" width="105px"></img>
        <div class="text-dark-gray font-md text-align-center">
          ${this.state.text}
        </div>
        <div class="text-dark-gray font-md text-align-center">
          <input type="text" value="${this.state.inputValue}" name="inputValue" id="inputValue" class="input"/>
        </div>
        <div class="flex justify-content-space-between gap-24">
          <button class="btn sm btn-secondary" data-select="cancel-btn">
            Cancelar
          </button>
          <button class="btn sm btn-primary" data-select="accept-btn">
            Guardar
          </button>
        </div>
      </div>
      <div class="modal-overlay"></div>
    `;
    
    const $AcceptBtn = this.$.querySelector('[data-select="accept-btn"]');
    const $CancelBtn = this.$.querySelector('[data-select="cancel-btn"]');
    
    this.state.$Input = this.$.querySelector('#inputValue');
    
    $AcceptBtn.addEventListener('click', () => {
      const success = this.validateInput();
      if (!success) return;
      
      this.clean();
      this.$.remove();
      this.state.acceptCallback(this.state.$Input.value);
    });

    $CancelBtn.addEventListener('click', () => {
      this.clean();
      this.$.remove();
      this.state.cancelCallback();
    });

  }

  validateInput() {
    let success = true;

    const inputValue = this.state.$Input.value;

    if (inputValue.length === 0) {
      success = false;
      this.state.$Input.classList.add('error');
    }

    return success;
  }
}

export default InputModal;