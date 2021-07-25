import { Component } from '../libs/xQuery/xQuery.js'

class ImportModal extends Component {
  constructor() {
    super(document.createElement('div'));
    this.render();
  }

  render() {
    this.$.classList.add('modal-container');
    this.$.innerHTML = `
      <div class="modal">
      <img src="../../assets/cloud-upload.png" alt="" width="105px"></img>
        <div class="text-dark-gray font-md text-align-center">
          Selecciona el archivo de tu ordenador para importar tus contactos.
        </div>
        <div class="flex justify-content-space-between gap-24">
          <button class="btn sm btn-secondary" data-btn="cancel">Cancelar</button>
          <button class="btn sm btn-primary" data-btn="import">
            Importar
          </button>
          <input class="vanished" type="file" accept=".json" data-btn="file"/>
        </div>
      </div>
      <div class="modal-overlay"></div>
    `
    const cancelBtn = this.$.querySelector('[data-btn="cancel"]');
    cancelBtn.addEventListener('click', (e) => this.hide())

    const importBtn = this.$.querySelector('[data-btn="import"]');
    importBtn.addEventListener('click',() => this.import());

    this.hide();
  }

  import() {
    const fileInput = this.$.querySelector('[data-btn="file"]')
    fileInput.click();
    console.log(fileInput);
    console.log('file value', fileInput.value);
  }
}

export default ImportModal;