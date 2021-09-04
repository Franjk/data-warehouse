import { Component } from '../libs/xQuery/xQuery.js';

class DeleteConfirmationModal extends Component {
  constructor(parentEl, props) {
    super(document.createElement('div'));

    this.state = {
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
      <div class="modal sm">
      <img src="../../assets/cloud-upload.png" alt="" width="105px"></img>
        <div class="text-dark-gray font-md text-align-center">
          Selecciona el archivo de tu ordenador para importar tus contactos.
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

export default DeleteConfirmationModal;