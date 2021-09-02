import { Component } from '../libs/xQuery/xQuery.js';

class DataRow extends Component {
  constructor(parentEl, props) {
    super(document.createElement('tr'));

    this.state = { 
      id: 0, 
      selected: false, 
      name: '', 
      email: '',
      country: '', 
      region: '', 
      company: '', 
      position: '', 
      preferedChannels: [], 
      interest: 0,
      ...props,
    }
    this.render()
    parentEl.appendChild(this.$);
  }

  render() {
    const {
      selected, name, email, country, region, company, position, preferedChannels, interest
    } = this.state;

    let interestPercentage;
    let interestClass;
    switch (interest) {
      case 25:
        interestPercentage = '25%';
        interestClass = 'x25'
        break;
      case 50:
        interestPercentage = '50%';
        interestClass = 'x50'
        break;
      case 75:
        interestPercentage = '75%';
        interestClass = 'x75'
        break;
      case 100:
        interestPercentage = '100%';
        interestClass = 'x100'
        break;
      default:
        interestPercentage = '0%';
        interestClass = '';
    }
  
    const displayedChannels = [];
    const hiddenChannels = [];
    for (let i = 0; i < preferedChannels.length; i += 1) {
      if (i < 2) {
        displayedChannels.push(preferedChannels[i]);
      } else {
        hiddenChannels.push(preferedChannels[i]);
      }
    }
  
    this.$.innerHTML = `
      <td class="text-align-center p-0">
        <input 
          class="contact-table-row-chk"
          type="checkbox" 
          data-master-chk="contact-table-chk"
          ${selected ? 'checked' : ''}
          />
      </td>
      <td>
        <div class="flex gap-8">
          <span class="material-icons">account_circle</span>
          <div class="flex-col gap-4">
            <span>${name}</span>
            <span class="text-gray">${email}</span>
          </div>
        </div>
      </td>
      <td>
        <div class="flex-col gap-4">
          <span>${country}</span>
          <span class="text-gray">${region}</span>
        </div>
      </td>
      <td>${company}</td>
      <td>${position}</td>
      <td>
        <div class="flex align-items-center gap-4">
          ${displayedChannels.map(c => (
            `<span class="tag tag-light">${c}</span>`
          )).join(' ')}
  

          
        </div>
      </td>
      <td>
        <span class="flex align-items-center gap-4">
          <span>${interestPercentage}</span>
          <span class="progress-bar ${interestClass}"></span>
        </span>
  
      </td>
      <td class="text-align-center p-0 flex justify-content-center">
        <div class="dropdown-menu">
          <span class="material-icons action-icon text-gray dropdown-toggler">more_horiz</span>
          <div class="dropdown-content display-none offset-xr-sm offset-y-sm">
            <div class="dropdown-list">
              <button class="dropdown-item" type="button">Eliminar</button>
              <button class="dropdown-item" type="button">Modificar</button>
            </div>
          </div>
        
        </div>
      </td>
    `
    if (selected) this.$.classList.add('table-row-highlight');
  
    const chkInput = this.$.querySelector('.contact-table-row-chk')
    chkInput.addEventListener('update', () => this.onChkInputUpdate(chkInput))
  
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
    }

    this.render();
    return this;
  }


}

export default DataRow;

// ${hiddenChannels.length > 0 ? (
//   `<span class="material-icons action-icon text-gray dropdown-toggler">more_horiz</span>`
// ) : ''}

// <div class="dropdown-content">
//   <div class="list">
//     ${hiddenChannels.map(c => (
//       `<span class="tag tag-light">${c}</span>`
//     )).join(' ')}
//   </div>
// </div>