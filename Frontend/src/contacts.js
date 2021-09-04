import { ContactsForm, ContactsTable, Navbar, DeleteConfirmationModal } from './components/index.js';
import { $ } from './libs/xQuery/xQuery.js';
import { getContacts, deleteContact, createContact } from './services/contact.service.js';

const $countSelectedTag = $('#count-selected-tag');
const $rowsPerPageSelector = $('#rows-per-page-selector');
// const $totalRows = $('#total-rows');
const $previousTablePageBtn = $('#previous-table-page-btn');
const $nextTablePageBtn = $('#next-table-page-btn');
const $currentRowsTag = $('#current-rows-tag');
const $totalRowsTag = $('#total-rows-tag');
const $filterForm = $('#filter-form');
const $filterQueryInput = $('#filter-query');
const $header = $('#header');
const $formAnchor = $('#form-anchor');
const $contactsTableContainer = $('#contacts-table-container');

let $Modal;

new Navbar($header, {links: [
  {name: 'Contactos', path: './contacts.html', active: true},
  {name: 'Compañías', path: './companies.html'},
  {name: 'Usuarios', path: './users.html'},
  {name: 'Región / Ciudad', path: './regions.html'},
]});

function handleCountSelectedTagChange() {
  let count = 0;
  let innerText = '';

  document.querySelectorAll('.contact-table-row-chk')
    .forEach(chk => {
      if (chk.checked) count += 1;
    });

  if (count === 0) {
    innerText = 'Ninguno seleccionado';
  } else if (count === 1) {
    innerText = `${count} seleccionado`;
  } else {
    innerText = `${count} seleccionados`;
  }
    
  $countSelectedTag.setInnerText(innerText);
}

function updateRowsPerPage(newRowsPerPage) {
  $contactsTable.setState({
    rowsPerPage: Number(newRowsPerPage),
    page: 1,
  });
}

function handleFilterFormSubmit(e) {
  e.preventDefault();
  $contactsTable.setState({filter: $filterQueryInput.value});
}

const $contactsTable = new ContactsTable($contactsTableContainer, { data: [] });

// const $contactsForm = new ContactsForm($formAnchor, {});
// $contactsForm.unHide();



async function loadContacts() {
  const contacts = await getContacts({fullState: true});

  for (let contact of contacts) {
    contact.name = (contact.firstName ?? '') + ' ' + (contact.lastName ?? '');
    
    if (contact.cityId) {
      contact.region = contact.city?.country?.region?.name;
      contact.country = contact.city?.country?.name;
      contact.city = contact.city?.name;
    } else {
      contact.region = '';
      contact.country = '';
      contact.city = '';
    }
    
    contact.company = contact.company?.name;
    contact.preferedChannels = contact?.contactChannels.map(cc => cc?.channel?.name);
  }

  $contactsTable.setState({data: contacts});
}

async function deleteContactEventHandler(e) {
  const contactId = e.detail.id;

  $Modal = new DeleteConfirmationModal($formAnchor, {
    acceptCallback: () => console.log('accepted'),
    cancelCallback: () => console.log('cancelled')
  });
  // const res = await deleteContact(contactId);
  
  // if (res.err) {
  //   // mostrar alerta
  //   return;
  // } 

  const newData = $contactsTable.state.data.filter(el => el.id !== contactId);
  $contactsTable.setState({data: newData});
}

async function editContactEventHandler(e) {
  const contactId = e.detail.id;
  return contactId;
}

function previousTablePageBtnClickEventHandler() {
  $contactsTable.switchPage('previous');
}

function nextTablePageBtnClickEventHandler() {
  $contactsTable.switchPage('next');
}

function updateTotalRowsEventHandler(e) {
  const totalRows = e.detail.totalRows;
  $totalRowsTag.innerText = totalRows;
}

function updateCurrentRowsEventHandler(e) {
  const startRow = e.detail.startRow;
  const endRow = e.detail.endRow;
  $currentRowsTag.innerText = `${startRow}-${endRow}`;
}

async function createContactEventHandler(e) {
  const data = e.detail.data;
  console.log(e);
  console.log('createContactEvent', data);
  const res = await createContact(data);
  if (res.err) {
    console.log('Error', res.err);
  } else {
    alert('Contacto creado exitosamente');
  }
}

function initialize() {
  document.addEventListener('update-count-selected-tag', handleCountSelectedTagChange);
  document.addEventListener('delete-contact', deleteContactEventHandler );
  document.addEventListener('edit-contact', editContactEventHandler);
  document.addEventListener('update-current-rows', updateCurrentRowsEventHandler);
  document.addEventListener('update-total-rows', updateTotalRowsEventHandler);
  document.addEventListener('create-contact', createContactEventHandler);
  
  $filterForm.addEventListener('submit', handleFilterFormSubmit);
  $rowsPerPageSelector.addEventListener('change', (e) => updateRowsPerPage(e.target.value));
  $previousTablePageBtn.addEventListener('click', previousTablePageBtnClickEventHandler);
  $nextTablePageBtn.addEventListener('click', nextTablePageBtnClickEventHandler);
  
  document.dispatchEvent(new CustomEvent('update-count-selected-tag'));

  loadContacts();
}

initialize();