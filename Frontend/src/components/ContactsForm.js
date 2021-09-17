import { Component } from '../libs/xQuery/xQuery.js';
import { getCities } from '../services/city.service.js';
import { getContact } from '../services/contact.service.js';
import { getCompanies } from '../services/company.service.js';
import { getCountries } from '../services/country.service.js';
import { getRegions } from '../services/region.service.js';

class ContactsForm extends Component {
  constructor(parentEl, props) {
    super(document.createElement('div'));
    this.addClass('modal-container');
    this.state = { ...props };
    this.children = [];

    if (this.state.contactId) {
      this.state.mode = 'update';
    } else {
      this.state.mode = 'create';
    }

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
              <h2 class="form-title">Nuevo contacto</h2>
            </div>
            <div>
              <span class="material-icons clickable" data-select="close-btn">close</span>
            </div>
          </div>
          <div class="form-content">
            <div class="form-row form-row-highlighted">
              <div class="input-label-group text-dark-gray">
                <label class="label required" for="firstName">Nombre</label>
                <input class="input" type="text" name="firstName" id="firstName">
              </div>

              <div class="input-label-group text-dark-gray">
                <label class="label required" for="lastName">Apellido</label>
                <input class="input" type="text" name="lastName" id="lastName">
              </div>

              <div class="input-label-group text-dark-gray">
                <label class="label required" for="position">Cargo</label>
                <input class="input" type="text" name="position" id="position">
              </div>

              <div class="input-label-group text-dark-gray">
                <label class="label required" for="email">Email</label>
                <input class="input" type="email" name="email" id="email">
              </div>

              <div class="input-label-group text-dark-gray">
                <label class="label required" for="company">Compañía</label>
                <select class="input" name="company" id="company" data-select="company-select">
                  <option hidden selected value="">Seleccionar compañía</option>
                </select>
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
                <label class="label" for="address">Dirección</label>
                <input disabled class="input" disabled type="text" name="address" id="address" placeholder="Ingresa una dirección" data-select="address-input">
              </div>

              <div class="input-label-group">
                <label class="label" for="interest">Interés</label>
                <select class="input" name="interest" id="interest">
                  <option value="0" selected>0%</option>
                  <option value="25">25%</option>
                  <option value="50">50%</option>
                  <option value="75">75%</option>
                  <option value="100">100%</option>
                </select>
              </div>

            </div>
            <div class="form-row">
              <div class="input-label-group">
                <label class="label" for="channel">Canal de contacto</label>
                <input readonly class="input" type="text" name="channel-1" id="channel-1" value="Whatsapp">
                <input readonly class="input" type="text" name="channel-2" id="channel-2" value="Facebook">
                <input readonly class="input" type="text" name="channel-3" id="channel-3" value="Twitter">
                <input readonly class="input" type="text" name="channel-4" id="channel-4" value="Email">
                <input readonly class="input" type="text" name="channel-5" id="channel-5" value="Teléfono">
              </div>

              <div class="input-label-group">
                <label class="label" for="channelAcount">Cuenta de usuario</label>
                <input class="input" type="text" name="channel-account-1" id="channel-account-1" placeholder="Ingresa una cuenta">
                <input class="input" type="text" name="channel-account-2" id="channel-account-2" placeholder="Ingresa una cuenta">
                <input class="input" type="text" name="channel-account-3" id="channel-account-3" placeholder="Ingresa una cuenta">
                <input class="input" type="text" name="channel-account-4" id="channel-account-4" placeholder="Ingresa una cuenta">
                <input class="input" type="text" name="channel-account-5" id="channel-account-5" placeholder="Ingresa una cuenta">
              </div>

              <div class="input-label-group">
                <label class="label" for="channel">Preferencias</label>
                <select class="input" name="channel-preference-1" id="channel-preference-1">
                  <option value="NO_PREFERENCE" selected>Sin preferencia</option>
                  <option value="FAVORITE">❤️ Canal favorito</option>
                  <option value="DONT_DISTURB">🚫️ No molestar</option>
                </select>
                <select class="input" name="channel-preference-2" id="channel-preference-2">
                  <option value="NO_PREFERENCE" selected>Sin preferencia</option>
                  <option value="FAVORITE">❤️ Canal favorito</option>
                  <option value="DONT_DISTURB">🚫️ No molestar</option>
                </select>

                <select class="input" name="channel-preference-3" id="channel-preference-3">
                  <option value="NO_PREFERENCE" selected>Sin preferencia</option>
                  <option value="FAVORITE">❤️ Canal favorito</option>
                  <option value="DONT_DISTURB">🚫️ No molestar</option>
                </select>

                <select class="input" name="channel-preference-4" id="channel-preference-4">
                  <option value="NO_PREFERENCE" selected>Sin preferencia</option>
                  <option value="FAVORITE">❤️ Canal favorito</option>
                  <option value="DONT_DISTURB">🚫️ No molestar</option>
                </select>

                <select class="input" name="channel-preference-5" id="channel-preference-5">
                  <option value="NO_PREFERENCE" selected>Sin preferencia</option>
                  <option value="FAVORITE">❤️ Canal favorito</option>
                  <option value="DONT_DISTURB">🚫️ No molestar</option>
                </select>

              </div>
            </div>

            
          </div>
          <div class="form-footer">
          ${this.state.mode === 'update' ? '<button class="btn btn-danger-outline" data-select="delete-btn">Eliminar contacto</button>' : ''}
            <button class="btn btn-success" data-select="save-btn">Guardar contacto</button>
          </div>

        </form>
      </div>
      <div class="modal-overlay"></div>
    `;

    // const btnOrderName = this.$.querySelector('[data-select="btn-order-name"]');
    this.$.querySelector('form').addEventListener('submit', (e) => e.preventDefault());
    this.$.querySelector('[data-select="save-btn"]').addEventListener('click', this.submitForm.bind(this));
    this.$.querySelector('[data-select="delete-btn"]')?.addEventListener('click', this.deleteRecord.bind(this));
    this.$.querySelector('[data-select="close-btn"]').addEventListener('click', this.close.bind(this));

    // btnOrderName.addEventListener('click', () => this.reorderTable('name'));
    this.state.$CompanySelect = this.$.querySelector('[data-select="company-select"]');
    this.state.$RegionSelect = this.$.querySelector('[data-select="region-select"]');
    this.state.$CountrySelect = this.$.querySelector('[data-select="country-select"]');
    this.state.$CitySelect = this.$.querySelector('[data-select="city-select"]');
    this.state.$AddressInput = this.$.querySelector('[data-select="address-input"]');
    this.state.$SaveBtn = this.$.querySelector('[data-select="save-btn"]');
    this.state.$FirstNameInput = this.$.querySelector('#firstName');
    this.state.$LastNameInput = this.$.querySelector('#lastName');
    this.state.$EmailInput = this.$.querySelector('#email');
    this.state.$PositionInput = this.$.querySelector('#position');
    this.state.$InterestSelect = this.$.querySelector('#interest');

    this.state.$ChannelAccount1 = this.$.querySelector('#channel-account-1');
    this.state.$ChannelAccount2 = this.$.querySelector('#channel-account-2');
    this.state.$ChannelAccount3 = this.$.querySelector('#channel-account-3');
    this.state.$ChannelAccount4 = this.$.querySelector('#channel-account-4');
    this.state.$ChannelAccount5 = this.$.querySelector('#channel-account-5');

    this.state.$ChannelPreference1 = this.$.querySelector('#channel-preference-1');
    this.state.$ChannelPreference2 = this.$.querySelector('#channel-preference-2');
    this.state.$ChannelPreference3 = this.$.querySelector('#channel-preference-3');
    this.state.$ChannelPreference4 = this.$.querySelector('#channel-preference-4');
    this.state.$ChannelPreference5 = this.$.querySelector('#channel-preference-5');

    this.state.$RegionSelect.addEventListener('change', this.selectRegionChangeHandler.bind(this));
    this.state.$CountrySelect.addEventListener('change', this.selectCountryChangeHandler.bind(this));
    this.state.$CitySelect.addEventListener('change', this.selectCityChangeHandler.bind(this));
    

   

    if (this.state.mode === 'update') {
      this.loadContact();
    } else {
      this.loadRegions();
      this.loadCompanies();
    }

  }

  async loadContact() {
    const res = await getContact(this.state.contactId, {fullState: true});
    console.log('loadContacts', this.state.contactId, res);

    this.state.$FirstNameInput.value = res.firstName ?? '';
    this.state.$LastNameInput.value = res.lastName ?? '';
    this.state.$EmailInput.value = res.email ?? '';
    this.state.$PositionInput.value = res.position ?? '';
    this.state.$InterestSelect.value = res.interest ?? 0;
    
    
    this.state.$AddressInput.value = res.address ?? '';
    if (res.address) {
      this.state.$AddressInput.disabled = false;
    }

    await this.loadCompanies();
    this.state.$CompanySelect.value = res.companyId ?? 0;

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

    if (res.contactChannels) {
      for (let channel of res.contactChannels) {
        this.state[`$ChannelAccount${channel.channelId}`].value = channel.account ?? '';
        this.state[`$ChannelPreference${channel.channelId}`].value = channel.preference ?? 'NO_PREFERENCE';
      }
    }
  }

  async loadCompanies() {
    let companies = [];

    if (this.state.companies) {
      companies = this.state.companies;
    } else {
      const unsortedCompanies = await getCompanies();

      if (companies.err) {
        this.state.$CompanySelect.innerHTML = '<option hidden selected value="">Seleccionar compañía</option>';
        this.state.companies = [];
        return;
      }

      companies = unsortedCompanies.sort((a,b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      });
      this.state.companies = companies;
    }

    console.log('companies', companies);

    this.state.$CompanySelect.innerHTML = `
    <option hidden selected value="">Seleccionar compañía</option>
      ${companies.map(company => (
    `<option value=${company.id}>${company.name}</option>`
  ))}
    `;
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

    const data = {
      firstName: this.state.$FirstNameInput.value,
      lastName: this.state.$LastNameInput.value,
      email: this.state.$EmailInput.value,
      position: this.state.$PositionInput.value,
      companyId: this.state.$CompanySelect.value,
    };

    if (this.state.$CitySelect.value) data.cityId = this.state.$CitySelect.value;
    if (this.state.$AddressInput.value) data.address = this.state.$AddressInput.value;
    if (this.state.$InterestSelect.value) data.interest = this.state.$InterestSelect.value;

    const contactChannels = [];
    if (this.state.$ChannelAccount1.value) {
      contactChannels.push({
        channelId: 1,
        account: this.state.$ChannelAccount1.value,
        preference: this.state.$ChannelPreference1.value,
      });
    }

    if (this.state.$ChannelAccount2.value) {
      contactChannels.push({
        channelId: 2,
        account: this.state.$ChannelAccount2.value,
        preference: this.state.$ChannelPreference2.value,
      });
    }

    if (this.state.$ChannelAccount3.value) {
      contactChannels.push({
        channelId: 3,
        account: this.state.$ChannelAccount3.value,
        preference: this.state.$ChannelPreference3.value,
      });
    }

    if (this.state.$ChannelAccount4.value) {
      contactChannels.push({
        channelId: 4,
        account: this.state.$ChannelAccount4.value,
        preference: this.state.$ChannelPreference4.value,
      });
    }

    if (this.state.$ChannelAccount5.value) {
      contactChannels.push({
        channelId: 5,
        account: this.state.$ChannelAccount5.value,
        preference: this.state.$ChannelPreference5.value,
      });
    }

    data.contactChannels = contactChannels;

    if (this.state.mode === 'create') {
      document.dispatchEvent(new CustomEvent('create-contact', {detail: {data}}));
    } else if (this.state.mode === 'update') {
      data.id = this.state.contactId;
      document.dispatchEvent(new CustomEvent('update-contact', {detail: {data}}));
    }

    console.log('save', data);

  }

  deleteRecord(e) {
    e.preventDefault();
    if (this.state.contactId) {
      document.dispatchEvent(new CustomEvent('delete-contact', {detail: {id: this.state.contactId}}));
    }
  }

  validateInputs() {
    this.removeErrorClasses();
    
    let success = true;
    const firstName = this.state.$FirstNameInput.value;
    const lastName = this.state.$LastNameInput.value;
    const email = this.state.$EmailInput.value;
    const position = this.state.$PositionInput.value;
    const companyId = this.state.$CompanySelect.value;
    // const cityId = this.state.$CitySelect.value;
    // const address = this.state.$AddressInput.value;

    if (firstName.length === 0) {
      success = false;
      this.state.$FirstNameInput.classList.add('error');
    }

    if (lastName.length === 0) {
      success = false;
      this.state.$LastNameInput.classList.add('error');
    }

    if (email.length === 0) {
      success = false;
      this.state.$EmailInput.classList.add('error');
    }

    if (position.length === 0) {
      success = false;
      this.state.$PositionInput.classList.add('error');
    }

    if (companyId.length === 0) {
      success = false;
      this.state.$CompanySelect.classList.add('error');
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

export default ContactsForm;