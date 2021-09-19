/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { UsersForm, UsersTable, Navbar, DeleteConfirmationModal } from './components/index.js';
import { $ } from './libs/xQuery/xQuery.js';
import { getUsers, createUser, updateUser, deleteUser, bulkDeleteUser } from './services/user.service.js';
import { authenticate } from './services/auth.service.js';

const $CountSelectedTag = $('#count-selected-tag');
const $RowsPerPageSelector = $('#rows-per-page-selector');
const $PreviousTablePageBtn = $('#previous-table-page-btn');
const $NextTablePageBtn = $('#next-table-page-btn');
const $CurrentRowsTag = $('#current-rows-tag');
const $TotalRowsTag = $('#total-rows-tag');
const $FilterForm = $('#filter-form');
const $FilterQueryInput = $('#filter-query');
const $Header = $('#header');
const $FormAnchor = $('#form-anchor');
const $TableContainer = $('#table-container');
const $AddButton = $('#add-button');
const $BulkDeleteBtn = $('#bulk-delete-btn');

let $UsersForm;
let $Modal;
let auth;

new Navbar($Header, {links: [
  {name: 'Contactos', path: './contacts.html'},
  {name: 'Compañías', path: './companies.html'},
  {name: 'Usuarios', path: './users.html', active: true},
  {name: 'Región / Ciudad', path: './regions.html'},
]});

const $UsersTable = new UsersTable($TableContainer, { data: [] });

function handleCountSelectedTagChange() {
  let count = 0;
  let innerText = '';

  document.querySelectorAll('.table-row-chk')
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
  $UsersTable.setState({
    rowsPerPage: Number(newRowsPerPage),
    page: 1,
  });
}

function handleFilterFormSubmit(e) {
  e.preventDefault();
  $UsersTable.setState({filter: $FilterQueryInput.value});
}

async function loadUsers() {
  const users = await getUsers({fullState: true});

  $UsersTable.setState({data: users});
}

async function deleteUserEventHandler(e) {
  const userId = e.detail.id;

  $Modal = new DeleteConfirmationModal($FormAnchor, {
    text: '¿Desea eliminar el usuario?',
    acceptCallback: async () => {
      const res = await deleteUser(userId);

      if (res.err) {
        Swal.fire({icon: 'error', title: 'Error eliminando el usuario'});
        return;
      } 

      const newData = $UsersTable.state.data.filter(el => el.id !== userId);
      $UsersTable.setState({data: newData});
      $UsersForm?.close();

      Swal.fire({icon: 'success', title: 'Usuario eliminado exitosamente'});
    },
    cancelCallback: () => console.log('cancelled')
  });
}

async function editUserEventHandler(e) {
  const id = e.detail.id;
  $UsersForm = new UsersForm($FormAnchor, {id});
  $UsersForm.unHide();

  return id;
}

function previousTablePageBtnClickEventHandler() {
  $UsersTable.switchPage('previous');
}

function nextTablePageBtnClickEventHandler() {
  $UsersTable.switchPage('next');
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

async function createUserEventHandler(e) {
  const data = e.detail.data;
  console.log('createUserEventHandler', data);
  const res = await createUser(data);

  if (!res.err) {
    loadUsers();
    await Swal.fire({icon: 'success', title: 'Usuario creado exitosamente'});
    $UsersForm.close();
  } else {
    console.warn('Error', res.err);
    Swal.fire({icon: 'error', title: 'Error al crear usuario'});
  }
}

async function updateUserEventHandler(e) {
  const data = e.detail.data;
  console.log('updateUserEventHandler', data);
  const res = await updateUser(data.id, data);

  if (!res.err) {
    loadUsers();
    await Swal.fire({icon: 'success', title: 'Usuario editado exitosamente'});
    $UsersForm.close();
  } else {
    console.warn('Error', res.err);
    Swal.fire({icon: 'error', title: 'Error al editar Usuario'});
  }
}

function handleAddButtonClick() {
  $UsersForm = new UsersForm($FormAnchor, {});
  $UsersForm.unHide();
}

async function handleBulkDeleteButtonClick() {

  const idArr = $UsersTable.selectedRows?.map(row => row.id);

  console.log(idArr);
  if (!idArr || idArr.length === 0) return;
  

  $Modal = new DeleteConfirmationModal($FormAnchor, {
    text: `¿Desea eliminar los usuarios: ${idArr.join(', ')}?`,
    acceptCallback: async () => {
      const res = await bulkDeleteUser({users: idArr});

      if (res.err) {
        Swal.fire({icon: 'error', title: 'Error eliminando las compañías'});
        return;
      } 

      const newData = $UsersTable.state.data.filter(el => !idArr.includes(el.id));
      $UsersTable.setState({data: newData});
      Swal.fire({icon: 'success', title: 'Usuarios eliminados exitosamente'});
    },
    cancelCallback: () => console.log('cancelled')
  });
  
}

async function authenticateUser() {
  auth = await authenticate();
  if (auth.err || auth.role !== 'ADMIN') {
    window.location.replace('../pages/login.html');
  }
}

function initialize() {
  authenticateUser();

  document.addEventListener('update-count-selected-tag', handleCountSelectedTagChange);
  document.addEventListener('delete-user', deleteUserEventHandler );
  document.addEventListener('edit-user', editUserEventHandler);
  document.addEventListener('update-current-rows', updateCurrentRowsEventHandler);
  document.addEventListener('update-total-rows', updateTotalRowsEventHandler);
  document.addEventListener('create-user', createUserEventHandler);
  document.addEventListener('update-user', updateUserEventHandler);
  
  $FilterForm.addEventListener('submit', handleFilterFormSubmit);
  $RowsPerPageSelector.addEventListener('change', (e) => updateRowsPerPage(e.target.value));
  $PreviousTablePageBtn.addEventListener('click', previousTablePageBtnClickEventHandler);
  $NextTablePageBtn.addEventListener('click', nextTablePageBtnClickEventHandler);
  $AddButton.addEventListener('click', handleAddButtonClick);
  $BulkDeleteBtn.addEventListener('click', handleBulkDeleteButtonClick);

  document.dispatchEvent(new CustomEvent('update-count-selected-tag'));

  loadUsers();
}

initialize();