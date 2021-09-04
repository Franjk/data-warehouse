const Channel = require('./Channel');
const Company = require('./Company');
const Contact = require('./Contact');
const ContactChannel = require('./ContactChannel');
const City = require('./City');
const Country = require('./Country');
const Region = require('./Region');
const User = require('./User');

Channel.belongsToMany(Contact, { through: ContactChannel });
Channel.hasMany(ContactChannel);

Company.belongsTo(City);

Contact.belongsTo(City);
Contact.belongsTo(Company);
Contact.belongsToMany(Channel, { through: ContactChannel });
Contact.hasMany(ContactChannel);

ContactChannel.belongsTo(Contact, { onDelete: 'cascade', foreignKey: { allowNull: false } });
ContactChannel.belongsTo(Channel, { foreignKey: { allowNull: false } });

City.hasMany(Contact);
City.belongsTo(Country, { onDelete: 'cascade', foreignKey: { allowNull: false } });

Country.hasMany(City);
Country.belongsTo(Region, { onDelete: 'cascade', foreignKey: { allowNull: false } });

Region.hasMany(Country);

module.exports = {
  Channel,
  City,
  Company,
  Contact,
  ContactChannel,
  Country,
  Region,
  User,
};
