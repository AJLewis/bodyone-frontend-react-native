
import Realm from 'realm';
import { syncData } from './sync';

// Create
export const create = async (realm: Realm, schemaName: string, db:  'public' | 'config' | 'private', data: object) => {
  try {
    realm.write(() => {
      realm.create(schemaName, data);
    });

    // Dynamically import the schema file based on schemaName
    const schemaModule = await import(`../schemas/../${schemaName}.model.ts`);
    
    // Check if the schema can be synced
    if (schemaModule.canBeSynced) {
      syncData(schemaName, db, data, realm); // Trigger the sync operation
    }

    return true;
  } catch (error) {
    console.error('Error creating object:', error);
    return false;
  }
};

// Read
export const read = (realm: Realm, schemaName: string, filter?: object | string) => {
  let filterStr: string;
  if (filter) {
    if (typeof filter === 'object') {
      filterStr = convertFilterObjToString(filter);
    } else {
      filterStr = filter;
    }
    return realm.objects(schemaName).filtered(filterStr);
  }
  return realm.objects(schemaName);
};

// Update
export const update = async (realm: Realm, schemaName: string, primaryKey: any, data: object) => {
  try {
    realm.write(() => {
      let objectToUpdate = realm.objectForPrimaryKey(schemaName, primaryKey);
      if (objectToUpdate) {
        Object.assign(objectToUpdate, data);
      }
    });
    return true;
  } catch (error) {
    console.error('Error updating object:', error);
    return false;
  }
};

// Delete
export const remove = async (realm: Realm, schemaName: string, primaryKey: any) => {
  try {
    realm.write(() => {
      let objectToDelete = realm.objectForPrimaryKey(schemaName, primaryKey);
      if (objectToDelete) {
        realm.delete(objectToDelete);
      }
    });
    return true;
  } catch (error) {
    console.error('Error deleting object:', error);
    return false;
  }
};

const convertFilterObjToString = (filterObj: object): string => {
  const filterEntries = Object.entries(filterObj);
  const filterStrings = filterEntries.map(([key, value]) => {
    if (typeof value === 'string') {
      return `${key} == "${value}"`;
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      return `${key} == ${value}`;
    }
    // Add more conditions if needed for other data types
    return '';
  });
  return filterStrings.join(' AND ');
};