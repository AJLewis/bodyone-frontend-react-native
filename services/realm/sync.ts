import { privateApi, publicApi, configApi } from '../api/ApiConfig'; // Import the APIs
import { update } from './crud';

export const syncData = async (schemaName: string, db: 'private' | 'public' | 'config', data: object | any, realm: Realm) => {
  try {
    let api;
    if (db === 'private') {
      api = privateApi;
    } else if(db === 'public') {
      api = publicApi; 
    }else if (db === 'config') {
      api = configApi;
    } else {
      throw new Error(`Unknown schema: ${schemaName}`);
    }

    const response = await api.post(`/${schemaName.toLowerCase()}/sync`, data);

    if (response.data && response.data.lastModified) {
      const serverTimestamp = new Date(response.data.lastModified).getTime();
      const localTimestamp = new Date(data.lastModified).getTime();

      if (db === 'config' && serverTimestamp > localTimestamp) {
        // Server Wins for 'config'
        update(realm, schemaName, response.data.primaryKey, response.data);
      } else if (db === 'private' && serverTimestamp < localTimestamp) {
        // Client Wins for 'private'
        // No need to do anything as the client data remains unchanged
      }
    }
    
    console.log(`Data synced for ${schemaName}:`, response.data);
  } catch (error) {
    console.error(`Error syncing data for ${schemaName}:`, error);
  }
};
