import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialState = {
    value: UserState;
};

type UserState = {
        userData: any;
        foodData: any;
        distributor: any;
        foodRequest: any;
};

const initialState = {
    value: {
        userData: null,
        foodData: null,
        distributor: null,
        foodRequest: null,
    } as UserState,
} as InitialState;

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<any>) => {
            state.value.userData = action.payload;
        },
        setFood: (state, action: PayloadAction<any>) => {
            state.value.foodData = action.payload;
        },
        setDistributor: (state, action: PayloadAction<any>) => {
            state.value.foodData = action.payload;
        },
        setFoodRequest: (state, action: PayloadAction<any>) => {
            state.value.foodRequest = action.payload;
        },
        clearUser: (state) => {
            state.value = {
                userData: null,
                foodData: null,
                distributor: null,
                foodRequest: null,
            };
        },
    },
});


export const { setUser, setFood, setFoodRequest, setDistributor, clearUser } = userSlice.actions;

export default userSlice.reducer;