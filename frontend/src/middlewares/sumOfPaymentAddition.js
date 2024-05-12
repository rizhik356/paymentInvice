import formatTocurrency from '../services/formatters/formatToCurrency';

const sumOfPaymentAddition = () => (next) => (action) => {
  const { type, payload } = action;
  const makeSum = () => {
    const { sum, quantity } = payload;
    payload.sumOfPaymentAddition = formatTocurrency(sum * quantity);
    payload.sumConvertToCurrency = formatTocurrency(sum);
    return next(action);
  };
  return type === 'payments/addPayment' ? makeSum() : next(action);
};

export default sumOfPaymentAddition;
