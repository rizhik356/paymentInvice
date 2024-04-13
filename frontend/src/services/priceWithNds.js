import formatTocurrency from './formatToCurrency';

const priceWithNds = (payments, percents) => {
  const normalizePecents = percents === 'Без НДС' ? 0 : Number(percents);
  const paymentsSum = payments.reduce((acc, { quantity, sum }) => acc + (quantity * sum), 0);
  return formatTocurrency(paymentsSum + (paymentsSum * normalizePecents) / 100).slice(0, -2);
};

export default priceWithNds;
