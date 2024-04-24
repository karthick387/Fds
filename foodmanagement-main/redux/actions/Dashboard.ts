import axios from "axios";
import { clearError, setError, setLoading } from '../features/auth-slice';
import { setUser, setFood, setDistributor, setFoodRequest } from "../features/user-slice";

export const getUser = (email: any) => async (dispatch: any) => {
    dispatch(setLoading(true)); 
    try {
      const response = await axios.get(`/api/get-user/${email}`);
  
      if (response.status === 200) {
        dispatch(setUser(response.data));
        dispatch(clearError()); 
        return response.data; 
      } else {
        dispatch(setError(response.data)); 
        throw new Error('Error getting user details');
      }
    } catch (error: any) {
      dispatch(setError(error.message));
      throw error;
    } finally {
      dispatch(setLoading(false)); 
    }
  };

export const onUpdateUser = (user: any, email: any) => async (dispatch: any) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.put(`/api/update-user/${email}`, { data: user });
      console.log("RESPONSE:", response);
      if (response.status === 200) {
        dispatch(setUser(response.data));
        dispatch(clearError()); 
        return response.data; 
      } else {
        dispatch(setError(response.data)); 
        throw new Error('Error updating user details');
      }
    } catch (error: any) {
      dispatch(setError(error.message));
      throw error;
    } finally {
      dispatch(setLoading(false)); 
    }
  };

  export const createFood = (food: any) => async (dispatch: any) => {
    dispatch(setLoading(true)); 
    try {
      const response = await axios.post(`/api/create-food`, { data: food });
  
      if (response.status === 200) {
        dispatch(setFood(response.data));
        dispatch(clearError()); 
        return response.data; 
      } else {
        dispatch(setError(response.data)); 
        throw new Error('Error creating food details');
      }
    } catch (error: any) {
      dispatch(setError(error.message));
      throw error;
    } finally {
      dispatch(setLoading(false)); 
    }
};

export const getFood = (userId: any) => async (dispatch: any) => {
  dispatch(setLoading(true)); 
  try {
    const response = await axios.get(`/api/get-food/${userId}`);

    if (response.status === 200) {
      dispatch(setFood(response.data));
      dispatch(clearError()); 
      return response.data; 
    } else {
      dispatch(setError(response.data)); 
      throw new Error('Error getting food details');
    }
  } catch (error: any) {
    dispatch(setError(error.message));
    throw error;
  } finally {
    dispatch(setLoading(false)); 
  }
};

export const getFoodBasedOnFoodId = (foodId: any) => async (dispatch: any) => {
  dispatch(setLoading(true)); 
  try {
    const response = await axios.get(`/api/get-food-item/${foodId}`);

    if (response.status === 200) {
      dispatch(setFood(response.data));
      dispatch(clearError()); 
      return response.data; 
    } else {
      dispatch(setError(response.data)); 
      throw new Error('Error getting food details');
    }
  } catch (error: any) {
    dispatch(setError(error.message));
    throw error;
  } finally {
    dispatch(setLoading(false)); 
  }
};

export const getAllFoods = () => async (dispatch: any) => {
  dispatch(setLoading(true)); 
  try {
    const response = await axios.get(`/api/get-all-foods/`);

    if (response.status === 200) {
      dispatch(setFood(response.data));
      dispatch(clearError()); 
      return response.data; 
    } else {
      dispatch(setError(response.data)); 
      throw new Error('Error getting all food details');
    }
  } catch (error: any) {
    dispatch(setError(error.message));
    throw error;
  } finally {
    dispatch(setLoading(false)); 
  }
};

export const getAllDistributors = () => async (dispatch: any) => {
  dispatch(setLoading(true)); 
  try {
    const response = await axios.get(`/api/get-all-distributors`);

    if (response.status === 200) {
      dispatch(setDistributor(response.data));
      dispatch(clearError()); 
      return response.data; 
    } else {
      dispatch(setError(response.data)); 
      throw new Error('Error getting user details');
    }
  } catch (error: any) {
    dispatch(setError(error.message));
    throw error;
  } finally {
    dispatch(setLoading(false)); 
  }
};

export const createFoodRequest = (foodRequest: any) => async (dispatch: any) => {
  dispatch(setLoading(true)); 
  try {
    const response = await axios.post(`/api/create-food-request`, { data: foodRequest });

    if (response.status === 200) {
      dispatch(setFoodRequest(response.data));
      dispatch(clearError()); 
      return response.data; 
    } else {
      dispatch(setError(response.data)); 
      throw new Error('Error creating food request details');
    }
  } catch (error: any) {
    dispatch(setError(error.message));
    throw error;
  } finally {
    dispatch(setLoading(false)); 
  }
};

export const getFoodRequestBasedOnFoodId = (foodId: any) => async (dispatch: any) => {
  dispatch(setLoading(true)); 
  try {
    const response = await axios.get(`/api/get-food-request/${foodId}`);

    if (response.status === 200) {
      dispatch(setFoodRequest(response.data));
      dispatch(clearError()); 
      return response.data; 
    } else {
      dispatch(setError(response.data)); 
      throw new Error('Error getting food request details');
    }
  } catch (error: any) {
    dispatch(setError(error.message));
    throw error;
  } finally {
    dispatch(setLoading(false)); 
  }
};

export const onUpdateFoodRequest = (updatedData: any, foodId: any) => async (dispatch: any) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.put(`/api/update-food-request/${foodId}`, { data: updatedData });
    if (response.status === 200) {
      dispatch(setFoodRequest(response.data));
      dispatch(clearError()); 
      return response.data; 
    } else {
      dispatch(setError(response.data)); 
      throw new Error('Error updating food request details');
    }
  } catch (error: any) {
    dispatch(setError(error.message));
    throw error;
  } finally {
    dispatch(setLoading(false)); 
  }
};

export const onUpdateFoodRequestBasedOnReqId = (updatedData: any, foodReqId: any) => async (dispatch: any) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.put(`/api/update-distributor-status/${foodReqId}`, { data: updatedData });
    if (response.status === 200) {
      dispatch(setFoodRequest(response.data));
      dispatch(clearError()); 
      return response.data; 
    } else {
      dispatch(setError(response.data)); 
      throw new Error('Error updating distributor status of food request details');
    }
  } catch (error: any) {
    dispatch(setError(error.message));
    throw error;
  } finally {
    dispatch(setLoading(false)); 
  }
};

export const getFoodRequestBasedOnDistributorId = (distributorId: any) => async (dispatch: any) => {
  dispatch(setLoading(true)); 
  try {
    const response = await axios.get(`/api/get-foodRequest-basedOn-distributorId/${distributorId}`);
    if (response.status === 200) {
      dispatch(setFoodRequest(response.data));
      dispatch(clearError()); 
      return response.data; 
    } else {
      dispatch(setError(response.data)); 
      throw new Error('Error getting food request details based on distributor id');
    }
  } catch (error: any) {
    dispatch(setError(error.message));
    throw error;
  } finally {
    dispatch(setLoading(false)); 
  }
};

export const getFoodRequest = (distributorId: any) => async (dispatch: any) => {
  dispatch(setLoading(true)); 
  try {
    const response = await axios.get(`/api/get-foodRequest/${distributorId}`);
    if (response.status === 200) {
      dispatch(setFoodRequest(response.data));
      dispatch(clearError()); 
      return response.data; 
    } else {
      dispatch(setError(response.data)); 
      throw new Error('Error getting all food request details based on distributor id');
    }
  } catch (error: any) {
    dispatch(setError(error.message));
    throw error;
  } finally {
    dispatch(setLoading(false)); 
  }
};