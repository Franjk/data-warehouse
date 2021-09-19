/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { CompaniesForm, CompaniesTable, Navbar, DeleteConfirmationModal } from './components/index.js';
import { $ } from './libs/xQuery/xQuery.js';
import { getCompanies, createCompany, updateCompany, deleteCompany, bulkDeleteCompany } from './services/company.service.js';
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

let $CompaniesForm;
let $Modal;
let auth;

const $Navbar = new Navbar($Header, {links: [
  {name: 'Contactos', path: './contacts.html'},
  {name: 'Compañías', path: './companies.html', active: true},
  {name: 'Región / Ciudad', path: './regions.html'},
]});

const $CompaniesTable = new CompaniesTable($TableContainer, { data: [] });

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
  $CompaniesTable.setState({
    rowsPerPage: Number(newRowsPerPage),
    page: 1,
  });
}

function handleFilterFormSubmit(e) {
  e.preventDefault();
  $CompaniesTable.setState({filter: $FilterQueryInput.value});
}

async function loadCompanies() {
  const companies = await getCompanies({fullState: true});

  for (let company of companies) {
    if (company.cityId) {
      company.region = company.city?.country?.region?.name;
      company.country = company.city?.country?.name;
      company.city = company.city?.name;
    } else {
      company.region = '';
      company.country = '';
      company.city = '';
    }
    
  }

  $CompaniesTable.setState({data: companies});
}

async function deleteCompanyEventHandler(e) {
  const companyId = e.detail.id;

  $Modal = new DeleteConfirmationModal($FormAnchor, {
    text: '¿Desea eliminar la compañía?',
    acceptCallback: async () => {
      const res = await deleteCompany(companyId);

      if (res.err) {
        Swal.fire({icon: 'error', title: 'Error eliminando la compañía'});
        return;
      } 

      const newData = $CompaniesTable.state.data.filter(el => el.id !== companyId);
      $CompaniesTable.setState({data: newData});
      $CompaniesForm?.close();

      Swal.fire({icon: 'success', title: 'Compañía eliminada exitosamente'});
    },
    cancelCallback: () => console.log('cancelled')
  });
}

async function editCompanyEventHandler(e) {
  const id = e.detail.id;
  $CompaniesForm = new CompaniesForm($FormAnchor, {id});
  $CompaniesForm.unHide();

  return id;
}

function previousTablePageBtnClickEventHandler() {
  $CompaniesTable.switchPage('previous');
}

function nextTablePageBtnClickEventHandler() {
  $CompaniesTable.switchPage('next');
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

async function createCompanyEventHandler(e) {
  const data = e.detail.data;
  console.log('createCompanyEventHandler', data);
  const res = await createCompany(data);

  if (!res.err) {
    loadCompanies();
    await Swal.fire({icon: 'success', title: 'Compañía creada exitosamente'});
    $CompaniesForm.close();
  } else {
    console.warn('Error', res.err);
    Swal.fire({icon: 'error', title: 'Error al crear compañía'});
  }
}

async function updateCompanyEventHandler(e) {
  const data = e.detail.data;
  console.log('updateCompanyEventHandler', data);
  const res = await updateCompany(data.id, data);

  if (!res.err) {
    loadCompanies();
    await Swal.fire({icon: 'success', title: 'Compañía editada exitosamente'});
    $CompaniesForm.close();
  } else {
    console.warn('Error', res.err);
    Swal.fire({icon: 'error', title: 'Error al editar Compañía'});
  }
}

function handleAddButtonClick() {
  $CompaniesForm = new CompaniesForm($FormAnchor, {});
  $CompaniesForm.unHide();
}

async function handleBulkDeleteButtonClick() {

  const idArr = $CompaniesTable.selectedRows?.map(row => row.id);

  console.log(idArr);
  if (!idArr || idArr.length === 0) return;
  

  $Modal = new DeleteConfirmationModal($FormAnchor, {
    text: `¿Desea eliminar las compañías: ${idArr.join(', ')}?`,
    acceptCallback: async () => {
      const res = await bulkDeleteCompany({companies: idArr});

      if (res.err) {
        Swal.fire({icon: 'error', title: 'Error eliminando las compañías'});
        return;
      } 

      const newData = $CompaniesTable.state.data.filter(el => !idArr.includes(el.id));
      $CompaniesTable.setState({data: newData});
      Swal.fire({icon: 'success', title: 'Compañías eliminadas exitosamente'});
    },
    cancelCallback: () => console.log('cancelled')
  });
  
}

async function authenticateUser() {
  auth = await authenticate();
  if (auth.err) {
    window.location.replace('../pages/login.html');
  }
  if (auth.role === 'ADMIN') {
    $Navbar.setState({links: [
      {name: 'Contactos', path: './contacts.html'},
      {name: 'Compañías', path: './companies.html', active: true},
      {name: 'Usuarios', path: './users.html'},
      {name: 'Región / Ciudad', path: './regions.html'},
    ]});
  }
}

function initialize() {
  authenticateUser();

  document.addEventListener('update-count-selected-tag', handleCountSelectedTagChange);
  document.addEventListener('delete-company', deleteCompanyEventHandler );
  document.addEventListener('edit-company', editCompanyEventHandler);
  document.addEventListener('update-current-rows', updateCurrentRowsEventHandler);
  document.addEventListener('update-total-rows', updateTotalRowsEventHandler);
  document.addEventListener('create-company', createCompanyEventHandler);
  document.addEventListener('update-company', updateCompanyEventHandler);
  
  $FilterForm.addEventListener('submit', handleFilterFormSubmit);
  $RowsPerPageSelector.addEventListener('change', (e) => updateRowsPerPage(e.target.value));
  $PreviousTablePageBtn.addEventListener('click', previousTablePageBtnClickEventHandler);
  $NextTablePageBtn.addEventListener('click', nextTablePageBtnClickEventHandler);
  $AddButton.addEventListener('click', handleAddButtonClick);
  $BulkDeleteBtn.addEventListener('click', handleBulkDeleteButtonClick);

  document.dispatchEvent(new CustomEvent('update-count-selected-tag'));

  loadCompanies();
}

initialize();