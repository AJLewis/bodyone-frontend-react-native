import {privateApi} from './ApiConfig'

export const FetchStreaksAward = async (userId: string) => {
  try {

      return 'fetched';
      const response = await privateApi.get(`/streaks/award/${userId}`);
      
      if (response.status !== 200) {
          throw new Error("Failed to fetch streaks award");
      }

      return response.data;
  } catch (error: any) {
      console.error("Error fetching streaks award:", error);
      throw error.response ? error.response.data.msg : error.message;
  }
};