const convertToNumber = () => (next) => (action) => {
  const { type, payload } = action;

  const makeConvert = () => {
    const sumToNumber = payload.sum.includes(',')
      ? Number(payload.sum.replace(',', '.'))
      : Number(payload.sum);
    const quantityToNumber = payload.quantity === '' ? 1 : Number(payload.quantity);
    payload.sum = sumToNumber;
    payload.quantity = quantityToNumber;
    return next(action);
  };
  return type === 'payments/addPayment' ? makeConvert() : next(action);
};

export default convertToNumber;
