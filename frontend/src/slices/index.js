import { configureStore } from '@reduxjs/toolkit';
import paymentReducer from './paymentSlice.js';
import convertToNumber from '../middlewares/convertToNumber.js';
import sumOfPaymentAddition from '../middlewares/sumOfPaymentAddition.js';

const store = configureStore({
  reducer: {
    payments: paymentReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat([convertToNumber, sumOfPaymentAddition]),
});

export default store;
