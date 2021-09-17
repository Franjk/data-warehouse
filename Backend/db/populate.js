const {
  Channel, City, Company, Contact, ContactChannel, Country, Region, User,
} = require('../models');

async function populate() {
  console.log('Populating DB');

  await Channel.bulkCreate([
    { id: 1, name: 'Whatsapp' },
    { id: 2, name: 'Facebook' },
    { id: 3, name: 'Twitter' },
    { id: 4, name: 'Email' },
    { id: 5, name: 'Teléfono' },
  ]);

  await Region.bulkCreate([
    { id: 1, name: 'Sudamérica' },
    { id: 2, name: 'Norteamérica' },
  ]);

  await Country.bulkCreate([
    { id: 1, name: 'Argentina', regionId: 1 },
    { id: 2, name: 'Colombia', regionId: 1 },
    { id: 3, name: 'Chile', regionId: 1 },
    { id: 4, name: 'Uruguay', regionId: 1 },
    { id: 5, name: 'México', regionId: 2 },
    { id: 6, name: 'Estados Unidos', regionId: 2 },
  ]);

  await City.bulkCreate([
    { id: 1, name: 'Buenos Aires', countryId: 1 },
    { id: 2, name: 'Córdoba', countryId: 1 },
    { id: 3, name: 'Bogotá', countryId: 2 },
    { id: 4, name: 'Cúcuta', countryId: 2 },
    { id: 5, name: 'Medellín', countryId: 2 },
    { id: 6, name: 'Atacama', countryId: 3 },
    { id: 7, name: 'Santiago', countryId: 3 },
    { id: 8, name: 'Valparaíso', countryId: 3 },
    { id: 9, name: 'Canelones', countryId: 4 },
    { id: 10, name: 'Maldonado', countryId: 4 },
    { id: 11, name: 'Montevideo', countryId: 4 },
    { id: 12, name: 'Ciudad de México', countryId: 5 },
    { id: 13, name: 'Tijuana', countryId: 5 },
    { id: 14, name: 'Florida', countryId: 6 },
    { id: 15, name: 'Texas', countryId: 6 },
  ]);

  await Company.bulkCreate([
    { id: 1, name: 'Ecom Experts', email: 'ee@mail.com', address: 'ABC 123', phoneNumber: '011 123 4651', cityId: 1 },
    { id: 2, name: 'Acámica', email: 'acamica@mail.com', address: 'QWE 362', phoneNumber: '011 123 4651', cityId: 1 },
    { id: 3, name: 'Despegar', email: 'despegar@mail.com', address: 'TGF 5223', phoneNumber: '011 123 4651', cityId: 3 },
    { id: 4, name: 'Botmaker', email: 'botmaker@mail.com', address: 'TGQ 6352', phoneNumber: '011 123 4651', cityId: 4 },
    { id: 5, name: 'Netflix', email: 'netflix@mail.com', address: 'PLOT 8522', phoneNumber: '011 123 4651', cityId: 15 },
    { id: 6, name: 'MercadoLibre', email: 'mercadolibre@mail.com', address: 'RFE 9635', phoneNumber: '011 123 4651', cityId: 1 },
    { id: 7, name: 'Globant', email: 'globant@mail.com', address: 'LMH 1234', phoneNumber: '011 123 4651', cityId: 7 },
    { id: 8, name: 'Telecom', email: 'telecom@mail.com', address: 'YTR 852', phoneNumber: '011 123 4651', cityId: 12 },
    { id: 9, name: 'Naranja', email: 'naranja@mail.com', address: 'BNH 5585', phoneNumber: '011 123 4651', cityId: 2 },
    { id: 10, name: 'Ualá', email: 'uala@mail.com', address: 'EEW 3352', phoneNumber: '011 123 4651', cityId: 11 },
  ]);
  
  await Contact.bulkCreate([
    { id: 1, firstName: 'Camila Soledad', lastName: 'Pantó', email: 'camilapanto123@gmail.com', companyId: 1, position: 'UX Designer', interest: 100, address: 'ABC 456', cityId: 1 },
    { id: 2, firstName: 'Agustín Emanuel', lastName: 'Soria', email: 'agustinesoria96@gmail.com', companyId: 2, position: 'UI Designer', interest: 100, address: 'ABC 456', cityId: 1 },
    { id: 3, firstName: 'Denver Steven', lastName: 'Soria', email: 'denver.steven@gmail.com', companyId: 3, position: 'Developer', interest: 100, address: 'ABC 456', cityId: 3 },
    { id: 4, firstName: 'Sebastian Agustín', lastName: 'Pantó', email: 'sebapanto@gmail.com', companyId: 4, position: 'Product', interest: 75, address: 'ABC 456', cityId: 4 },
    { id: 5, firstName: 'Stefanía Natalí', lastName: 'Soria', email: 'stafisoria@gmail.com', companyId: 5, position: 'Sales', interest: 75, address: 'ABC 456', cityId: 15 },
    { id: 6, firstName: 'Milena Victoria', lastName: 'Soria', email: 'milesoria@gmail.com', companyId: 6, position: 'UX Designer', interest: 50, address: 'ABC 456', cityId: 1 },
    { id: 7, firstName: 'Valentino', lastName: 'Boetto', email: 'valenboeto@gmail.com', companyId: 7, position: 'UI Designer', interest: 50, address: 'ABC 456', cityId: 7 },
    { id: 8, firstName: 'Juan', lastName: 'Sbeghen', email: 'juan.sbg@gmail.com', companyId: 8, position: 'Developer', interest: 25, address: 'ABC 456', cityId: 12 },
    { id: 9, firstName: 'Guillermina', lastName: 'Budano', email: 'guillebudano@gmail.com', companyId: 9, position: 'Product', interest: 25, address: 'ABC 456', cityId: 2 },
    { id: 10, firstName: 'Laura', lastName: 'Errante', email: 'laurapastelera@gmail.com', companyId: 10, position: 'Sales', interest: 0, address: 'ABC 456', cityId: 11 },
  ]);

  await ContactChannel.bulkCreate([
    { contactId: 1, channelId: 1, account: '123456', preference: 'FAVORITE' },
    { contactId: 2, channelId: 1, account: '123456', preference: 'FAVORITE' },
    { contactId: 2, channelId: 3, account: '123456', preference: 'FAVORITE' },
    { contactId: 3, channelId: 2, account: '123456', preference: 'FAVORITE' },
    { contactId: 3, channelId: 4, account: '123456', preference: 'FAVORITE' },
    { contactId: 4, channelId: 5, account: '123456', preference: 'FAVORITE' },
    { contactId: 4, channelId: 1, account: '123456', preference: 'FAVORITE' },
    { contactId: 5, channelId: 3, account: '123456', preference: 'FAVORITE' },
    { contactId: 5, channelId: 5, account: '123456', preference: 'FAVORITE' },
  ]);

  await User.bulkCreate([
    { username: 'admin', password: '123', firstName: 'Adminis', lastName: 'Trador', email: 'admin@mail.com', role: 'ADMIN', address: 'ABC 123', phoneNumber: '3526 1236 2221' },
    { username: 'analyst', password: '123', firstName: 'Ana', lastName: 'Lista', email: 'analyst@mail.com', role: 'BASICO', address: 'ABC 456', phoneNumber: '3652 9998 3625' },
    { username: 'frank', password: '123', firstName: 'Francis', lastName: 'Kay', email: 'frank@mail.com', role: 'ADMIN', address: 'ABC 789', phoneNumber: '3695 3251 2153' },
    { username: 'martinj', password: '123', firstName: 'Martin', lastName: 'Jay', email: 'martinj@mail.com', role: 'BASICO', address: 'QWE 123', phoneNumber: '1234 1236 2221' },
    { username: 'josephR', password: '123', firstName: 'Joseph', lastName: 'Red', email: 'josephr@mail.com', role: 'BASICO', address: 'QWE 365', phoneNumber: '215 5461 1254' },
  ]);

}

module.exports = populate;
