import axios from "axios";

const currencyInstance = axios.create({
    baseURL: "https://min-api.cryptocompare.com/data/",
});

export const currencyApi = {
    getCurrency: (currencyFrom, currencyTo) => {
        return currencyInstance.get(
            `price?fsym=${currencyFrom}&tsyms=${currencyTo}`
        );
    },
    getBase: () => {
        return currencyInstance.get(`pricemulti?fsyms=USD,EUR&tsyms=UAH`);
    },
};
