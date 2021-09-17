import { Component } from '../../libs/xQuery/xQuery.js';
import { getUser } from '../../services/user.service.js';

class CompaniesForm extends Component {
  constructor(parentEl, props) {
    super(document.createElement('div'));
    this.addClass('modal-container');
    this.state = { ...props };
    this.children = [];

    if (this.state.id) {
      this.state.mode = 'update';
    } else {
      this.state.mode = 'create';
    }

    console.log('form mode', this.state.mode, this.state.id);

    this.hide();
    this.render();
    parentEl.appendChild(this.$);
  }

  render() {
    this.$.innerHTML = `
      <div class="modal lg">
        <form action="" class="form">
          <div class="form-header">
            <div>
              <h2 class="form-title">Nuevo usuario</h2>
            </div>
            <div>
              <span class="material-icons clickable" data-select="close-btn">close</span>
            </div>
          </div>
          <div class="form-content">
            <div class="form-row form-row-highlighted">
              <div class="input-label-group text-dark-gray">
                <label class="label required" for="username">Username</label>
                <input class="input" type="text" name="username" id="username">
              </div>

              <div class="input-label-group text-dark-gray">
                <label class="label ${this.state.mode === 'create' ? 'required' : ''}" for="password">Contraseña</label>
                <input class="input" type="password" name="password" id="password">
              </div>

              <div class="input-label-group text-dark-gray">
                <label class="label ${this.state.mode === 'create' ? 'required' : ''}" for="repeatPassword">Repetir Contraseña</label>
                <input class="input" type="password" name="repeatPassword" id="repeatPassword">
              </div>

              <div class="input-label-group text-dark-gray">
                <label class="label required" for="email">Email</label>
                <input class="input" type="email" name="email" id="email">
              </div>

              <div class="input-label-group">
                <label class="label required" for="city">Perfil</label>
                <select class="input" name="role" id="role">
                  <option value="" hidden selected>Seleccionar rol</option>
                  <option value="ADMIN">Admin</option>
                  <option value="BASICO">Básico</option>
                </select>
              </div>

            </div>

            <div class="form-row">

              <div class="input-label-group text-dark-gray">
                <label class="label" for="fullName">Nombre completo</label>
                <input class="input" type="text" name="fullName" id="fullName">
              </div>


              <div class="input-label-group text-dark-gray">
                <label class="label" for="phoneNumber">Teléfono</label>
                <input class="input" type="text" name="phoneNumber" id="phoneNumber">
              </div>

              <div class="input-label-group">
                <label class="label" for="address">Dirección</label>
                <input class="input" type="text" name="address" id="address" placeholder="" data-select="address-input">
              </div>

            </div>
            
          </div>
          <div class="form-footer">
            ${this.state.mode === 'update' ? '<button class="btn btn-danger-outline" data-select="delete-btn">Eliminar usuario</button>' : ''}
            <button class="btn btn-success" data-select="save-btn">Guardar usuario</button>
          </div>

        </form>
      </div>
      <div class="modal-overlay"></div>
    `;

    this.$.querySelector('form').addEventListener('submit', (e) => e.preventDefault());
    this.$.querySelector('[data-select="save-btn"]').addEventListener('click', this.submitForm.bind(this));
    this.$.querySelector('[data-select="close-btn"]').addEventListener('click', this.close.bind(this));
    this.$.querySelector('[data-select="delete-btn"]')?.addEventListener('click', this.deleteRecord.bind(this));

    this.state.$UsernameInput = this.$.querySelector('#username');
    this.state.$FullNameInput = this.$.querySelector('#fullName');
    this.state.$EmailInput = this.$.querySelector('#email');
    this.state.$Password = this.$.querySelector('#password');
    this.state.$RepeatPassword = this.$.querySelector('#repeatPassword');
    this.state.$PhoneNumberInput = this.$.querySelector('#phoneNumber');
    this.state.$AddressInput = this.$.querySelector('[data-select="address-input"]');
    this.state.$RoleSelect = this.$.querySelector('#role');

    if (this.state.mode === 'update') {
      this.loadUser();
    } 

  }

  async loadUser() {
    const res = await getUser(this.state.id);
    console.log('loadUser', this.state.id, res);

    this.state.$UsernameInput.value = res.username ?? '';
    this.state.$FullNameInput.value = res.fullName ?? '';
    this.state.$EmailInput.value = res.email ?? '';
    this.state.$PhoneNumberInput.value = res.phoneNumber ?? '';
    this.state.$AddressInput.value = res.address ?? '';
    this.state.$RoleSelect.value = res.role ?? '';
  }

  submitForm(e) {
    e.preventDefault();
    const success = this.validateInputs();
    if (!success) return;

    const data = {};

    if (this.state.$UsernameInput.value) data.username = this.state.$UsernameInput.value;
    if (this.state.$Password.value) data.password = this.state.$Password.value;
    if (this.state.$EmailInput.value) data.email = this.state.$EmailInput.value;
    if (this.state.$RoleSelect.value) data.role = this.state.$RoleSelect.value;
    if (this.state.$FullNameInput.value) data.fullName = this.state.$FullNameInput.value;
    if (this.state.$PhoneNumberInput.value) data.phoneNumber = this.state.$PhoneNumberInput.value;
    if (this.state.$AddressInput.value) data.address = this.state.$AddressInput.value;

    if (this.state.mode === 'create') {
      document.dispatchEvent(new CustomEvent('create-user', {detail: {data}}));
    } else if (this.state.mode === 'update') {
      data.id = this.state.id;
      document.dispatchEvent(new CustomEvent('update-user', {detail: {data}}));
    }

    console.log('save', data);

  }

  deleteRecord(e) {
    e.preventDefault();
    if (this.state.id) {
      document.dispatchEvent(new CustomEvent('delete-user', {detail: {id: this.state.id}}));
    }
  }

  validateInputs() {
    this.removeErrorClasses();
    
    let success = true;
    const username = this.state.$UsernameInput.value;
    const role = this.state.$RoleSelect.value;
    const email = this.state.$EmailInput.value;
    const password = this.state.$Password.value;
    const repeatPassword = this.state.$RepeatPassword.value;

    if (username.length === 0) {
      success = false;
      this.state.$UsernameInput.classList.add('error');
    }

    if (role.length === 0) {
      success = false;
      this.state.$RoleSelect.classList.add('error');
    }

    if (email.length === 0) {
      success = false;
      this.state.$EmailInput.classList.add('error');
    }

    if (this.state.mode === 'create') {
      if (password.length === 0) {
        success = false;
        this.state.$Password.classList.add('error');
      }
  
      if (password !== repeatPassword) {
        success = false;
        this.state.$Password.classList.add('error');
        this.state.$RepeatPassword.classList.add('error');
      }
    }


    return success;
  }

  removeErrorClasses() {
    this.$.querySelectorAll('.error')
      .forEach(el => el.classList.remove('error'));
  }

  close() {
    this.$.remove();
  }



}

export default CompaniesForm;