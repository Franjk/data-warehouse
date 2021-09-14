/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { ContactsForm, ContactsTable, Navbar, DeleteConfirmationModal } from './components/index.js';
import { $ } from './libs/xQuery/xQuery.js';
import { getContacts, deleteContact, createContact, bulkDeleteContact } from './services/contact.service.js';

const $CountSelectedTag = $('#count-selected-tag');
const $RowsPerPageSelector = $('#rows-per-page-selector');
// const $totalRows = $('#total-rows');
const $PreviousTablePageBtn = $('#previous-table-page-btn');
const $NextTablePageBtn = $('#next-table-page-btn');
const $CurrentRowsTag = $('#current-rows-tag');
const $TotalRowsTag = $('#total-rows-tag');
const $FilterForm = $('#filter-form');
const $FilterQueryInput = $('#filter-query');
const $Header = $('#header');
const $FormAnchor = $('#form-anchor');
const $ContactsTableContainer = $('#contacts-table-container');
const $AddButton = $('#add-button');
const $BulkDeleteBtn = $('#bulk-delete-btn');

let $ContactsForm;
let $Modal;

new Navbar($Header, {links: [
  {name: 'Contactos', path: './contacts.html', active: true},
  {name: 'Compañías', path: './companies.html'},
  {name: 'Usuarios', path: './users.html'},
  {name: 'Región / Ciudad', path: './regions.html'},
]});

const $ContactsTable = new ContactsTable($ContactsTableContainer, { data: [] });

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
    
  $CountSelectedTag.setInnerText(innerText);
}

function updateRowsPerPage(newRowsPerPage) {
  $ContactsTable.setState({
    rowsPerPage: Number(newRowsPerPage),
    page: 1,
  });
}

function handleFilterFormSubmit(e) {
  e.preventDefault();
  $ContactsTable.setState({filter: $FilterQueryInput.value});
}

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

  $ContactsTable.setState({data: contacts});
}

async function deleteContactEventHandler(e) {
  const contactId = e.detail.id;

  $Modal = new DeleteConfirmationModal($FormAnchor, {
    text: '¿Desea eliminar el contacto?',
    acceptCallback: async () => {
      const res = await deleteContact(contactId);

      if (res.err) {
        Swal.fire({icon: 'error', title: 'Error eliminando el contacto'});
        return;
      } 

      const newData = $ContactsTable.state.data.filter(el => el.id !== contactId);
      $ContactsTable.setState({data: newData});
      Swal.fire({icon: 'success', title: 'Contacto eliminado exitosamente'});
    },
    cancelCallback: () => console.log('cancelled')
  });
}

async function editContactEventHandler(e) {
  const contactId = e.detail.id;
  return contactId;
}

function previousTablePageBtnClickEventHandler() {
  $ContactsTable.switchPage('previous');
}

function nextTablePageBtnClickEventHandler() {
  $ContactsTable.switchPage('next');
}

function updateTotalRowsEventHandler(e) {
  const totalRows = e.detail.totalRows;
  $TotalRowsTag.innerText = totalRows;
}

function updateCurrentRowsEventHandler(e) {
  const startRow = e.detail.startRow;
  const endRow = e.detail.endRow;
  $CurrentRowsTag.innerText = `${startRow}-${endRow}`;
}

async function createContactEventHandler(e) {
  const data = e.detail.data;
  console.log(e);
  console.log('createContactEvent', data);
  const res = await createContact(data);
  if (res.err) {
    console.warn('Error', res.err);
    Swal.fire({icon: 'error', title: 'Error al crear contacto'});
  } else {
    await Swal.fire({icon: 'success', title: 'Contacto creado exitosamente'});
    $ContactsForm.close();
  }
}

function handleAddButtonClick() {
  $ContactsForm = new ContactsForm($FormAnchor, {});
  $ContactsForm.unHide();
}

async function handleBulkDeleteButtonClick() {

  const idArr = $ContactsTable.selectedRows?.map(row => row.id);

  console.log(idArr);
  if (!idArr || idArr.length === 0) return;
  

  $Modal = new DeleteConfirmationModal($FormAnchor, {
    text: `¿Desea eliminar los contactos: ${idArr.join(', ')}?`,
    acceptCallback: async () => {
      const res = await bulkDeleteContact({contacts: idArr});

      if (res.err) {
        Swal.fire({icon: 'error', title: 'Error eliminando los contactos'});
        return;
      } 

      const newData = $ContactsTable.state.data.filter(el => !idArr.includes(el.id));
      $ContactsTable.setState({data: newData});
      Swal.fire({icon: 'success', title: 'Contactos eliminados exitosamente'});
    },
    cancelCallback: () => console.log('cancelled')
  });
  
}

function initialize() {
  document.addEventListener('update-count-selected-tag', handleCountSelectedTagChange);
  document.addEventListener('delete-contact', deleteContactEventHandler );
  document.addEventListener('edit-contact', editContactEventHandler);
  document.addEventListener('update-current-rows', updateCurrentRowsEventHandler);
  document.addEventListener('update-total-rows', updateTotalRowsEventHandler);
  document.addEventListener('create-contact', createContactEventHandler);
  
  $FilterForm.addEventListener('submit', handleFilterFormSubmit);
  $RowsPerPageSelector.addEventListener('change', (e) => updateRowsPerPage(e.target.value));
  $PreviousTablePageBtn.addEventListener('click', previousTablePageBtnClickEventHandler);
  $NextTablePageBtn.addEventListener('click', nextTablePageBtnClickEventHandler);
  $AddButton.addEventListener('click', handleAddButtonClick);
  $BulkDeleteBtn.addEventListener('click', handleBulkDeleteButtonClick);

  document.dispatchEvent(new CustomEvent('update-count-selected-tag'));

  loadContacts();
}

initialize();