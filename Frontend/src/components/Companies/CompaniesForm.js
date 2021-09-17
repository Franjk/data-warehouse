import { Component } from '../../libs/xQuery/xQuery.js';
import { getCompany } from '../../services/company.service.js';
import { getCities } from '../../services/city.service.js';
import { getCountries } from '../../services/country.service.js';
import { getRegions } from '../../services/region.service.js';

class CompaniesForm extends Component {
  constructor(parentEl, props) {
    super(document.createElement('div'));
    this.addClass('modal-container');
    this.state = { ...props };
    this.children = [];

    if (this.state.id) {
      this.state.mode = 'update';
    } else {
      this.state.mode = 'create';
    }

    console.log('form mode', this.state.mode, this.state.id);

    this.hide();
    this.render();
    parentEl.appendChild(this.$);
  }

  render() {
    this.$.innerHTML = `
      <div class="modal lg">
        <form action="" class="form">
          <div class="form-header">
            <div>
              <h2 class="form-title">Nueva compañía</h2>
            </div>
            <div>
              <span class="material-icons clickable" data-select="close-btn">close</span>
            </div>
          </div>
          <div class="form-content">
            <div class="form-row form-row-highlighted">
              <div class="input-label-group text-dark-gray">
                <label class="label required" for="name">Nombre</label>
                <input class="input" type="text" name="name" id="name">
              </div>

              <div class="input-label-group text-dark-gray">
                <label class="label" for="email">Email</label>
                <input class="input" type="email" name="email" id="email">
              </div>

              <div class="input-label-group text-dark-gray">
                <label class="label" for="phoneNumber">Teléfono</label>
                <input class="input" type="text" name="phoneNumber" id="phoneNumber">
              </div>
            </div>

            <div class="form-row">

              <div class="input-label-group">
                <label class="label" for="region">Región</label>
                <select class="input" name="region" id="region" data-select="region-select">
                  <option hidden selected value="">Seleccionar región</option>
                </select>
              </div>

              <div class="input-label-group">
                <label class="label" for="country">País</label>
                <select disabled class="input" name="country" id="country" data-select="country-select">
                  <option hidden selected value="">Seleccionar país</option>
                </select>
              </div>

              <div class="input-label-group">
                <label class="label" for="city">Ciudad</label>
                <select disabled class="input" name="city" id="city" data-select="city-select">
                  <option hidden selected value="">Seleccionar ciudad</option>
                </select>
              </div>

              <div class="input-label-group">
                <label class="label required" for="address">Dirección</label>
                <input disabled class="input" disabled type="text" name="address" id="address" placeholder="Ingresa una dirección" data-select="address-input">
              </div>

            </div>
            
          </div>
          <div class="form-footer">
            ${this.state.mode === 'update' ? '<button class="btn btn-danger-outline" data-select="delete-btn">Eliminar compañía</button>' : ''}
            <button class="btn btn-success" data-select="save-btn">Guardar compañía</button>
          </div>

        </form>
      </div>
      <div class="modal-overlay"></div>
    `;

    this.$.querySelector('form').addEventListener('submit', (e) => e.preventDefault());
    this.$.querySelector('[data-select="save-btn"]').addEventListener('click', this.submitForm.bind(this));
    this.$.querySelector('[data-select="close-btn"]').addEventListener('click', this.close.bind(this));
    this.$.querySelector('[data-select="delete-btn"]')?.addEventListener('click', this.deleteRecord.bind(this));

    this.state.$NameInput = this.$.querySelector('#name');
    this.state.$EmailInput = this.$.querySelector('#email');
    this.state.$PhoneNumberInput = this.$.querySelector('#phoneNumber');
    this.state.$RegionSelect = this.$.querySelector('[data-select="region-select"]');
    this.state.$CountrySelect = this.$.querySelector('[data-select="country-select"]');
    this.state.$CitySelect = this.$.querySelector('[data-select="city-select"]');
    this.state.$AddressInput = this.$.querySelector('[data-select="address-input"]');

    this.state.$RegionSelect.addEventListener('change', this.selectRegionChangeHandler.bind(this));
    this.state.$CountrySelect.addEventListener('change', this.selectCountryChangeHandler.bind(this));
    this.state.$CitySelect.addEventListener('change', this.selectCityChangeHandler.bind(this));
    

   

    if (this.state.mode === 'update') {
      this.loadCompany();
    } else {
      this.loadRegions();
    }

  }

  async loadCompany() {
    const res = await getCompany(this.state.id, {fullState: true});
    console.log('loadCompany', this.state.id, res);

    this.state.$NameInput.value = res.name ?? '';
    
    this.state.$AddressInput.value = res.address ?? '';
    if (res.address) {
      this.state.$AddressInput.disabled = false;
    }

    await this.loadRegions();
    const regionId = res.city?.country?.region?.id ?? 0;
    if (regionId) {
      this.state.$RegionSelect.value = regionId;
      await this.loadCountries(regionId);
      
    }

    const countryId = res.city?.country?.id ?? 0;
    if (countryId) {
      this.state.$CountrySelect.value = res.city?.country?.id ?? 0;
      await this.loadCities(countryId);
      this.state.$CountrySelect.disabled = false;
    }

    const cityId = res.cityId ?? 0;
    if (cityId) {
      this.state.$CitySelect.value = cityId;
      this.state.$CitySelect.disabled = false;
    }
  }

  async loadRegions() {
    let regions = [];
    if (this.state.regions) {
      regions = this.state.regions;
    } else {
      regions = await getRegions();

      if (regions.err) {
        this.state.$RegionSelect.innerHTML = '<option hidden selected value="">Seleccionar región</option>';
        this.state.regions = [];
        return;
      }

      this.state.regions = regions;
    }
    console.log('regions', regions);
    this.state.$RegionSelect.innerHTML = `
    <option hidden selected value="">Seleccionar región</option>
      ${regions.map(region => (
    `<option value=${region.id}>${region.name}</option>`
  ))}
    `;
  }

  async loadCountries(regionId) {
    const countries = await getCountries({regionId});
    if (countries.err) return;
    this.state.countries = countries;
    console.log('loadCountries', countries);
    this.state.$CountrySelect.innerHTML = `
    ${countries.map(country => (
    `
    <option hidden selected value="">Seleccionar país</option>
    <option value=${country.id}>${country.name}</option>`
  ))}
  `;
  }

  async loadCities(countryId) {
    const cities = await getCities({countryId});
    
    if (cities.err) {
      this.state.cities = [];
      this.state.$CountrySelect.innerHTML = '<option hidden selected value="">Seleccionar ciudad</option>';
      return;
    }


    this.state.cities = cities;
    console.log('loadCities', cities);
    this.state.$CitySelect.innerHTML = `
    ${cities.map(city => (
    `
    <option hidden selected value="">Seleccionar ciudad</option>
    <option value=${city.id}>${city.name}</option>
    `
  ))}
  `;
  }

  resetCitySelect() {
    this.state.$CitySelect.innerHTML = '<option hidden selected value="">Seleccionar ciudad</option>';
    this.state.$CitySelect.disabled = true;
  }

  resetAddressInput() {
    this.state.$AddressInput.value = '';
    this.state.$AddressInput.disabled = true;
  }

  selectRegionChangeHandler(e) {
    const regionId = e.target.value;
    if (regionId) {
      this.state.$CountrySelect.disabled = false;
      this.loadCountries(regionId);
    } else {
      this.state.$CountrySelect.disabled = true;
    }
    this.resetCitySelect();
    this.resetAddressInput();
  }

  selectCountryChangeHandler(e) {
    const countryId = e.target.value;
    if (countryId) {
      this.state.$CitySelect.disabled = false;
      this.loadCities(countryId);
    } else {
      this.state.$CitySelect.disabled = true;
    }
    this.resetAddressInput();
  }

  selectCityChangeHandler(e) {
    const cityId = e.target.value;
    if (cityId) {
      this.state.$AddressInput.disabled = false;
    } else {
      this.state.$AddressInput.disabled = true;
    }
    this.state.$AddressInput.value = '';
  }

  submitForm(e) {
    e.preventDefault();
    const success = this.validateInputs();
    if (!success) return;

    const data = {};

    if (this.state.$NameInput.value) data.name = this.state.$NameInput.value;
    if (this.state.$EmailInput.value) data.email = this.state.$EmailInput.value;
    if (this.state.$PhoneNumberInput.value) data.phoneNumber = this.state.$PhoneNumberInput.value;
    if (this.state.$CitySelect.value) data.cityId = this.state.$CitySelect.value;
    if (this.state.$AddressInput.value) data.address = this.state.$AddressInput.value;

    if (this.state.mode === 'create') {
      document.dispatchEvent(new CustomEvent('create-company', {detail: {data}}));
    } else if (this.state.mode === 'update') {
      data.id = this.state.id;
      document.dispatchEvent(new CustomEvent('update-company', {detail: {data}}));
    }

    console.log('save', data);

  }

  deleteRecord(e) {
    e.preventDefault();
    if (this.state.id) {
      document.dispatchEvent(new CustomEvent('delete-company', {detail: {id: this.state.id}}));
    }
  }

  validateInputs() {
    this.removeErrorClasses();
    
    let success = true;
    const name = this.state.$NameInput.value;
    const cityId = this.state.$CitySelect.value;
    const address = this.state.$AddressInput.value;

    if (name.length === 0) {
      success = false;
      this.state.$FirstNameInput.classList.add('error');
    }

    if (cityId.length === 0 || cityId == 0) {
      success = false;
      this.state.$CitySelect.classList.add('error');
    }

    if (address.length === 0) {
      success = false;
      this.state.$AddressInput.classList.add('error');
    }


    return success;
  }

  removeErrorClasses() {
    this.$.querySelectorAll('.error')
      .forEach(el => el.classList.remove('error'));
  }

  close() {
    this.$.remove();
  }



}

export default CompaniesForm;