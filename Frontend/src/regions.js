/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import { $ } from './libs/xQuery/xQuery.js';
import { Navbar, DeleteConfirmationModal, RegionTreeView, InputModal } from './components/index.js';
import { createCity, getCities,getCity, updateCity, deleteCity } from './services/city.service.js';
import { createCountry, getCountries, getCountry, updateCountry, deleteCountry } from './services/country.service.js';
import { createRegion, getRegions, getRegion, updateRegion, deleteRegion } from './services/region.service.js';

const $Header = $('#header');
const $ModalAnchor = $('#modal-anchor');
const $TreeContainer = $('#tree-container');
const $CreateRegionButton = $('#create-region-button');

let $Modal;
let $RegionTreeView;

new Navbar($Header, {links: [
  {name: 'Contactos', path: './contacts.html'},
  {name: 'Compañías', path: './companies.html'},
  {name: 'Usuarios', path: './users.html'},
  {name: 'Región / Ciudad', path: './regions.html', active: true},
]});

$RegionTreeView = new RegionTreeView($TreeContainer, {});


async function loadRegionTreeView() {
  const cities = await getCities();
  const countries = await getCountries();
  const regions = await getRegions();

  const tree = [...regions];

  for (let country of countries) {
    country.cities = cities.filter(city => city.countryId === country.id);
  }

  for (let region of regions) {
    region.countries = countries.filter(country => country.regionId === region.id);
  }
  
  $RegionTreeView.setState({regions});
}

function createRegionHandler() {
  $Modal = new InputModal($ModalAnchor, {
    text: 'Crear región',
    acceptCallback: async (regionName) => {
      const res = await createRegion({name: regionName});
      if (res.err) {
        Swal.fire({icon: 'error', title: 'Error creando la región'});
        return;
      } 
      loadRegionTreeView();
      Swal.fire({icon: 'success', title: 'Región creado exitosamente'});
    },
    cancelCallback: () => console.log('cancelled')
  });
}

async function editRegionHandler(e) {
  const regionId = e.detail.id;

  const region = await getRegion(regionId);
  if (region.id != regionId) return;

  $Modal = new InputModal($ModalAnchor, {
    text: 'Editar región',
    inputValue: region.name,
    acceptCallback: async (regionName) => {
      const res = await updateRegion(regionId, {name: regionName});
      if (res.err) {
        Swal.fire({icon: 'error', title: 'Error editando la región'});
        return;
      } 
      loadRegionTreeView();
      Swal.fire({icon: 'success', title: 'Región editado exitosamente'});
    },
    cancelCallback: () => console.log('cancelled')
  });
}

function deleteRegionHandler(e) {
  const regionId = e.detail.id;

  $Modal = new DeleteConfirmationModal($ModalAnchor, {
    text: '¿Desea eliminar la región?',
    acceptCallback: async () => {
      const res = await deleteRegion(regionId);

      if (res.err) {
        Swal.fire({icon: 'error', title: 'Error eliminando la región'});
        return;
      } 

      loadRegionTreeView();
      Swal.fire({icon: 'success', title: 'Región eliminada exitosamente'});
    },
    cancelCallback: () => console.log('cancelled')
  });
}

function createCountryHandler(e) {
  const regionId = e.detail.id;

  $Modal = new InputModal($ModalAnchor, {
    text: 'Crear país',
    acceptCallback: async (countryName) => {
      const res = await createCountry({name: countryName, regionId});
      if (res.err) {
        Swal.fire({icon: 'error', title: 'Error creando el país'});
        return;
      } 
      loadRegionTreeView();
      Swal.fire({icon: 'success', title: 'País creado exitosamente'});
    },
    cancelCallback: () => console.log('cancelled')
  });
}

async function editCountryHandler(e) {
  const countryId = e.detail.id;

  const country = await getCountry(countryId);
  if (country.id != countryId) return;

  $Modal = new InputModal($ModalAnchor, {
    text: 'Editar país',
    inputValue: country.name,
    acceptCallback: async (countryName) => {
      const res = await updateCountry(countryId, {name: countryName});
      if (res.err) {
        Swal.fire({icon: 'error', title: 'Error editando el país'});
        return;
      } 
      loadRegionTreeView();
      Swal.fire({icon: 'success', title: 'País editado exitosamente'});
    },
    cancelCallback: () => console.log('cancelled')
  });
}

function deleteCountryHandler(e) {
  const countryId = e.detail.id;

  $Modal = new DeleteConfirmationModal($ModalAnchor, {
    text: '¿Desea eliminar el país?',
    acceptCallback: async () => {
      const res = await deleteCountry(countryId);

      if (res.err) {
        Swal.fire({icon: 'error', title: 'Error eliminando el país'});
        return;
      } 

      loadRegionTreeView();
      Swal.fire({icon: 'success', title: 'País eliminado exitosamente'});
    },
    cancelCallback: () => console.log('cancelled')
  });
}

function createCityHandler(e) {
  const countryId = e.detail.id;

  $Modal = new InputModal($ModalAnchor, {
    text: 'Crear ciudad',
    acceptCallback: async (cityName) => {
      const res = await createCity({name: cityName, countryId});
      if (res.err) {
        Swal.fire({icon: 'error', title: 'Error creando la ciudad'});
        return;
      } 
      loadRegionTreeView();
      Swal.fire({icon: 'success', title: 'Ciudad creada exitosamente'});
    },
    cancelCallback: () => console.log('cancelled')
  });
}

async function editCityHandler(e) {
  const cityId = e.detail.id;

  const city = await getCity(cityId);
  if (city.id != cityId) return;

  $Modal = new InputModal($ModalAnchor, {
    text: 'Editar ciudad',
    inputValue: city.name,
    acceptCallback: async (cityName) => {
      const res = await updateCity(cityId, {name: cityName});
      if (res.err) {
        Swal.fire({icon: 'error', title: 'Error editando la ciudad'});
        return;
      } 
      loadRegionTreeView();
      Swal.fire({icon: 'success', title: 'Ciudad editada exitosamente'});
    },
    cancelCallback: () => console.log('cancelled')
  });
}

function deleteCityHandler(e) {
  const cityId = e.detail.id;

  $Modal = new DeleteConfirmationModal($ModalAnchor, {
    text: '¿Desea eliminar la ciudad?',
    acceptCallback: async () => {
      const res = await deleteCity(cityId);

      if (res.err) {
        Swal.fire({icon: 'error', title: 'Error eliminando la ciudad'});
        return;
      } 

      loadRegionTreeView();
      Swal.fire({icon: 'success', title: 'Ciudad eliminada exitosamente'});
    },
    cancelCallback: () => console.log('cancelled')
  });
}

function removeCity(cityId) {

}




function initialize() {
  $CreateRegionButton.addEventListener('click', createRegionHandler);
  document.addEventListener('edit-region', editRegionHandler);
  document.addEventListener('delete-region', deleteRegionHandler);
  document.addEventListener('create-country', createCountryHandler);
  document.addEventListener('edit-country', editCountryHandler);
  document.addEventListener('delete-country', deleteCountryHandler);
  document.addEventListener('create-city', createCityHandler);
  document.addEventListener('edit-city', editCityHandler);
  document.addEventListener('delete-city', deleteCityHandler);
  
  
  loadRegionTreeView();
}

initialize();