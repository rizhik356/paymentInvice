import { createSlice, current } from '@reduxjs/toolkit';
import renderPDF from '../services/renderPdf/renderPDF';

const initialState = {
  paymentsCounter: 0,
  payments: [],
  formData: {},
};

const paymentSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    addPayment: (state, { payload }) => {
      state.paymentsCounter += 1;
      const copyPayload = { ...payload };
      copyPayload.paymentId = state.paymentsCounter;
      state.payments.push(copyPayload);
    },
    deletePayment: (state, { payload }) => {
      state.payments = state.payments.filter((item) => item.paymentId !== payload);
    },
    addFormData: (state, { payload }) => {
      state.formData = payload;
      renderPDF(current(state));
    },
    stateReset: () => initialState,
  },
});

export const {
  addPayment, deletePayment, addFormData, stateReset,
} = paymentSlice.actions;

export default paymentSlice.reducer;
