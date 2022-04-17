import { currencyApi } from "../../../api/api";
import {
    RATES_REQUEST,
    RATES_ERROR,
    RATES_SUCCESS,
    CURRENCY_TOGGLE_LOADING,
    CURRENCY_BASE,
} from "./constants";

export const getRatesRequest = (currencyFrom, currencyTo) => ({
    type: RATES_REQUEST,
    payload: { currencyFrom, currencyTo },
});

export const getRatesError = (error, { currencyFrom, currencyTo }) => ({
    type: RATES_ERROR,
    payload: { error, currencyFrom, currencyTo },
});

export const getRatesSuccess = (data, { currencyFrom, currencyTo }) => ({
    type: RATES_SUCCESS,
    payload: { data, currencyFrom, currencyTo },
});

export const setBase = (payload) => ({
    type: CURRENCY_BASE,
    payload,
});

export const isLoading = (isLoading) => ({
    type: CURRENCY_TOGGLE_LOADING,
    isLoading,
});

/* THUNK CREATOR */

export const getRates = (currencyFrom, currencyTo) => async (dispatch) => {
    dispatch(getRatesRequest(currencyFrom, currencyTo));
    try {
        const { data } = await currencyApi.getCurrency(
            currencyFrom,
            currencyTo
        );
        const rate = data[currencyTo];
        dispatch(getRatesSuccess({ rate }, { currencyFrom, currencyTo }));
    } catch (error) {
        dispatch(getRatesError(error.message, { currencyFrom, currencyTo }));
    }
};

export const getBase = () => async (dispatch) => {
    dispatch(isLoading(true));
    try {
        const { data } = await currencyApi.getBase();
        dispatch(isLoading(false));
        dispatch(setBase(data));
        console.log(data);
    } catch (error) {
        dispatch(isLoading(false));
    }
};
