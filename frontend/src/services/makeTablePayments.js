const makeTable = (payArr) => {
  const newTable = {
    table: {
      widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto'],
      body: [
        ['№', 'Наименование работ, услуг', 'Кол-вo', 'Ед.', 'Цена', 'Сумма'],
      ],
    },
  };

  const normalizeSum = (sum) => sum.slice(0, -2);

  payArr.map(({
    paymentPurpose, quantity, sumConvertToCurrency, sumOfPaymentAddition,
  }, index) => newTable.table.body.push([
    index + 1,
    paymentPurpose,
    quantity, 'шт',
    normalizeSum(sumConvertToCurrency),
    normalizeSum(sumOfPaymentAddition),
  ]));

  return newTable;
};

export default makeTable;
