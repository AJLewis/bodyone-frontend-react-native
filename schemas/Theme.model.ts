const ThemeSchema = {
  name: 'Theme',
  properties: {
    id: 'string',
    name: 'string',
    dark: 'bool',
    colors: 'string', 
    fonts: 'string', 
    config: 'string',
  },
  primaryKey: 'id',
};

export const canBeSynced = false;

export default ThemeSchema;