import { DataRow, ImportModal,  Navbar } from './components/index.js'
import { $ } from './libs/xQuery/xQuery.js';
import contactData from '../samples/contactData.js'

const $importBtn = $('#import-btn');
const $countSelectedTag = $('#count-selected-tag');

let rowsPerPage = 10;

const $navbar = new Navbar({links: [
  {name: 'Contactos', path: './contacts.html', active: true},
  {name: 'Compañías', path: './companies.html'},
  {name: 'Usuarios', path: './users.html'},
  {name: 'Región / Ciudad', path: './regions.html'},
]})

$('#header').appendChildComponent($navbar);


const $importModal = new ImportModal();
$('#modal').appendChildComponent($importModal);


function renderDataRows(contactData) {
  for (let el of contactData) {
    const {
      selected, name, email, country, region, company, position, preferedChannels, interest,
    } = el;

    const dataRow = new DataRow({
      selected, name, email, country, region, company, position, preferedChannels, interest,
    });

    document.querySelector('#tbody-contactos').appendChild(dataRow.$);
  }
}

renderDataRows(contactData);

document.querySelectorAll('input[type="checkbox"')
  .forEach(el => {
    el.checked = true;
    el.dispatchEvent(new Event('change'));
  });

function handleCountSelectedTagChange() {
  let count = 0;
  let innerText = '';

  document.querySelectorAll('.contact-table-row-chk')
    .forEach(chk => {
      if (chk.checked) count += 1;
    })

  if (count === 0) {
    innerText = 'Ninguno seleccionado';
  } else if (count === 1) {
    innerText = `${count} seleccionado`;
  } else {
    innerText = `${count} seleccionados`;
  }
    
  $countSelectedTag.setInnerText(innerText)
}


function initialize() {
  $importBtn.addEventListener('click', () => $importModal.unHide())
  $countSelectedTag.addEventListener('change', handleCountSelectedTagChange)
  $countSelectedTag.dispatchEvent(new Event('change'));
}

initialize();