const NavigationMenuSchema = {
  name: 'NavigationMenu',
  primaryKey: 'name', // Assuming 'name' is unique and can be used as a primary key
  properties: {
    name: 'string',
    menuItems: 'string[]', // Using string arrays to represent ObjectIds
  },
};

export const canBeSynced = false;

export default NavigationMenuSchema;