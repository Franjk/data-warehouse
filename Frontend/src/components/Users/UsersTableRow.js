import { Component } from '../../libs/xQuery/xQuery.js';

class UsersTableRow extends Component {
  constructor(parentEl, props) {
    super(document.createElement('tr'));

    this.state = { 
      id: 0, 
      selected: false, 
      username: '', 
      fullName: '', 
      email: '',
      phoneNumber: '',
      address: '',
      role: '', 
      ...props,
    };
    this.render();
    parentEl.appendChild(this.$);
  }

  render() {
    const {
      selected, username, fullName, email, phoneNumber, address, role,
    } = this.state;

    this.$.innerHTML = `
      <td class="text-align-center p-0">
        <input 
          class="table-row-chk"
          type="checkbox" 
          data-master-chk="table-chk"
          ${selected ? 'checked' : ''}
          />
      </td>
      <td>${username ?? ''}</td>
      <td>${fullName ?? ''}</td>
      <td>${email ?? ''}</td>
      <td>${phoneNumber ?? ''}</td>
      <td>${address ?? ''}</td>
      <td>${role === 'ADMIN' ? 'Admin' : 'Básico'}</td>

      <td class="text-align-center p-0 flex justify-content-center">

        <div class="hidden-menu">

          <span class="material-icons action-icon text-gray hidden-toggler">more_horiz</span>

          <div class="hidden-content display-none flex gap-8">

              <button class="action-icon" data-select="delete-button" type="button">
                <span class="material-icons text-gray hover-color-danger">delete</span>
              </button>

              <button class="action-icon" data-select="edit-button" type="button">
                <span class="material-icons text-gray hover-color-primary">edit</span>
              </button>

          </div>
        
        </div>

      </td>
    `;
    if (selected) this.$.classList.add('table-row-highlight');
  
    const chkInput = this.$.querySelector('.table-row-chk');
    chkInput.addEventListener('update', () => this.onChkInputUpdate(chkInput));

    const deleteBtn = this.$.querySelector('[data-select="delete-button"]');
    deleteBtn.addEventListener('click', () => document.dispatchEvent(new CustomEvent('delete-user', {detail: {id: this.state.id}})));

    const editBtn = this.$.querySelector('[data-select="edit-button"]');
    editBtn.addEventListener('click', () => document.dispatchEvent(new CustomEvent('edit-user', {detail: {id: this.state.id}})));
  
    return this;
  }

  onChkInputUpdate(chk) {
    if (chk.checked) {
      this.addClass('table-row-highlight');
      this.state.selected = true;
    } else {
      this.removeClass('table-row-highlight');
      this.state.selected = true;
    }
    document.dispatchEvent(new CustomEvent('update-count-selected-tag'));
  }

  setState(newState) {
    this.state = {
      ...this.state,
      ...newState,
    };

    this.render();
    return this;
  }


}

export default UsersTableRow;
