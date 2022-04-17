import {
    RATES_REQUEST,
    RATES_ERROR,
    RATES_SUCCESS,
    CURRENCY_TOGGLE_LOADING,
    CURRENCY_BASE,
} from "./constants";

const initialState = {
    preloader: false,
    base: null,
};

const ratesReducer = (state = initialState, action) => {
    switch (action.type) {
        case RATES_REQUEST:
            return {
                ...state,
                [`${action.payload.currencyFrom}/${action.payload.currencyTo}`]:
                    { isLoading: true, data: null, error: false },
            };
        case RATES_ERROR:
            return {
                ...state,
                [`${action.payload.currencyFrom}/${action.payload.currencyTo}`]:
                    {
                        isLoading: false,
                        data: null,
                        error: action.payload.error,
                    },
            };
        case RATES_SUCCESS:
            return {
                ...state,
                [`${action.payload.currencyFrom}/${action.payload.currencyTo}`]:
                    {
                        isLoading: false,
                        data: action.payload.data,
                        error: false,
                    },
            };
        case CURRENCY_TOGGLE_LOADING:
            return {
                ...state,
                isLoading: action.isLoading,
            };
        case CURRENCY_BASE:
            return {
                ...state,
                base: action.payload,
            };
        default:
            return state;
    }
};

export default ratesReducer;
