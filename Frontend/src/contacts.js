import { ContactsTable, DataRow, ImportModal,  Navbar } from './components/index.js'
import { $ } from './libs/xQuery/xQuery.js';
import contactData from '../samples/contactData.js'

const $countSelectedTag = $('#count-selected-tag');
const $rowsPerPageSelector = $('#rows-per-page-selector');
const $totalRows = $('#total-rows');
const $previousTablePageBtn = $('#previous-table-page-btn');
const $nextTablePageBtn = $('#next-table-page-btn');
const $currentRowsTag = $('#current-rows-tag');
const $totalRowsTag = $('#total-rows-tag');
const $filterForm = $('#filter-form');
const $filterQueryInput = $('#filter-query');
const $header = $('#header')
const $contactsTableContainer = $('#contacts-table-container')

new Navbar($header, {links: [
  {name: 'Contactos', path: './contacts.html', active: true},
  {name: 'Compañías', path: './companies.html'},
  {name: 'Usuarios', path: './users.html'},
  {name: 'Región / Ciudad', path: './regions.html'},
]})

function updateCurrentRowsTag(startRow, endRow) {
  $currentRowsTag.innerText = `${startRow}-${endRow}`;
}

function updateTotalRowsTag(totalRows) {
  $totalRowsTag.innerText = totalRows;
}

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

function updateRowsPerPage(newRowsPerPage) {
  $contactsTable.setState({
    rowsPerPage: Number(newRowsPerPage),
    page: 1,
  })
}

function handleFilterFormSubmit(e) {
  e.preventDefault();
  $contactsTable.setState({filter: $filterQueryInput.value})
}

const $contactsTable = new ContactsTable($contactsTableContainer, {
  data: contactData, updateCurrentRowsTag, updateTotalRowsTag
});

function initialize() {
  document.addEventListener('update-count-selected-tag', handleCountSelectedTagChange)
  document.dispatchEvent(new CustomEvent('update-count-selected-tag'));
  $filterForm.addEventListener('submit', handleFilterFormSubmit);
  $rowsPerPageSelector.addEventListener('change', (e) => updateRowsPerPage(e.target.value))
  $previousTablePageBtn.addEventListener('click', () => $contactsTable.switchPage('previous'));
  $nextTablePageBtn.addEventListener('click', () => $contactsTable.switchPage('next'));
}

initialize();