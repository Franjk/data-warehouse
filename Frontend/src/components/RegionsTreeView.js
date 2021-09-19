import { Component } from '../libs/xQuery/xQuery.js';

class RegionTreeView extends Component {
  constructor(parentEl, props) {
    super(document.createElement('div'));

    this.state = { 
      regions: [],
      ...props
    };
    this.render();

    this.$.classList.add('treeview');

    parentEl.appendChild(this.$);
  }

  render() {
    this.$.innerHTML = `
      <ul class="level-1">
        ${this.state.regions.map(region => this.buildRegionHTML(region)).join(' ')}
      </ul>
    `;

    this.$.querySelectorAll('[data-select="edit-region-button"]')
      .forEach(el => {
        el.addEventListener('click', (e) => document.dispatchEvent(new CustomEvent('edit-region', {detail: {id: e.target.dataset.id}})));
      });

    this.$.querySelectorAll('[data-select="delete-region-button"]')
      .forEach(el => {
        el.addEventListener('click', (e) => document.dispatchEvent(new CustomEvent('delete-region', {detail: {id: e.target.dataset.id}})));
      });

    this.$.querySelectorAll('[data-select="create-country-button"]')
      .forEach(el => {
        el.addEventListener('click', (e) => document.dispatchEvent(new CustomEvent('create-country', {detail: {id: e.target.dataset.id}})));
      });

    this.$.querySelectorAll('[data-select="edit-country-button"]')
      .forEach(el => {
        el.addEventListener('click', (e) => document.dispatchEvent(new CustomEvent('edit-country', {detail: {id: e.target.dataset.id}})));
      });

    this.$.querySelectorAll('[data-select="delete-country-button"]')
      .forEach(el => {
        el.addEventListener('click', (e) => document.dispatchEvent(new CustomEvent('delete-country', {detail: {id: e.target.dataset.id}})));
      });

    this.$.querySelectorAll('[data-select="create-city-button"]')
      .forEach(el => {
        el.addEventListener('click', (e) => document.dispatchEvent(new CustomEvent('create-city', {detail: {id: e.target.dataset.id}})));
      });

    this.$.querySelectorAll('[data-select="edit-city-button"]')
      .forEach(el => {
        el.addEventListener('click', (e) => document.dispatchEvent(new CustomEvent('edit-city', {detail: {id: e.target.dataset.id}})));
      });

    this.$.querySelectorAll('[data-select="delete-city-button"]')
      .forEach(el => {
        el.addEventListener('click', (e) => document.dispatchEvent(new CustomEvent('delete-city', {detail: {id: e.target.dataset.id}})));
      });
    

  }

  buildRegionHTML(region) {
    return `
    <li class="">
      <div class="flex justify-content-space-between">
        <div class="flex gap-8">
          <div class="treeview-item">${region.name}</div>
          <button class="action-icon" data-select="edit-region-button" data-id="${region.id}">
            <span class="material-icons text-gray hover-color-primary" data-id="${region.id}">edit</span>
          </button>
          <button class="action-icon" data-select="delete-region-button" data-id="${region.id}">
            <span class="material-icons text-gray hover-color-danger" data-id="${region.id}">delete</span>
          </button>
        </div>
        <button class="btn btn-primary sm" data-select="create-country-button" data-id="${region.id}">Agregar País</button>
      </div>

      <ul class="level-2">
        ${region.countries.map(country => this.buildCountryHTML(country)).join(' ')}
      </ul>

    </li>
    `;
  }

  buildCountryHTML(country) {
    return `
    <li>
      <div class="flex justify-content-space-between">
        <div class="flex gap-8">
          <div class="treeview-item">${country.name}</div>
          <button class="action-icon" data-select="edit-country-button" data-id="${country.id}">
            <span class="material-icons text-gray hover-color-primary" data-id="${country.id}">edit</span>
          </button>
          <button class="action-icon" data-select="delete-country-button" data-id="${country.id}">
          <span class="material-icons text-gray hover-color-danger" data-id="${country.id}">delete</span>
          </button>
        </div>
        <button class="btn btn-primary sm" data-select="create-city-button" data-id="${country.id}">Agregar Ciudad</button>
      </div>
      <ul class="level-3">
        ${country.cities.map(city => this.buildCityHTML(city)).join(' ')}
      </ul>
    </li>
    `;
  }

  buildCityHTML(city) {
    return `
    <li>
      <div class="flex gap-8">
        <div class="treeview-item">${city.name}</div>
        <button class="action-icon" data-select="edit-city-button" data-id="${city.id}">
          <span class="material-icons text-gray hover-color-primary" data-id="${city.id}">edit</span>
        </button>
        <button class="action-icon" data-select="delete-city-button" data-id="${city.id}">
          <span class="material-icons text-gray hover-color-danger" data-id="${city.id}">delete</span>
        </button>
      </div>
    </li>
    `;
  }
}

export default RegionTreeView;

