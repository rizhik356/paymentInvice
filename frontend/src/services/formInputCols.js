const formInputCols = {
  recipient: [
    { title: 'ИНН', name: 'innRecipient' },
    { title: 'Название', name: 'nameRecipient' },
    { title: 'Индекс', name: 'indexRecipient' },
    { title: 'Адрес', name: 'adressRecipient' },
    { title: 'Телефон', name: 'telRecipient' },
    { title: 'Банк', name: 'bankRecipient' },
    { title: 'БИК', name: 'bikRecipient' },
    { title: 'Корр. счёт', name: 'CorrAccountRecipient' },
    { title: 'Расчётный счёт', name: 'AccountRecipient' },
  ],
  payer: [
    { title: 'ИНН', name: 'innPayer' },
    { title: 'Название', name: 'telPayer' },
    { title: 'КПП', name: 'kppPayer' },
    { title: 'Индекс', name: 'indexPayer' },
    { title: 'Адрес', name: 'adressPayer' },
  ],
  payment: [
    { title: 'Назначение платежа', name: 'paymentPurpose', col: 'col-lg-5' },
    { title: 'Сумма', name: 'sum' },
    {
      title: 'Кол-во', name: 'quantity', type: 'number', col: 'col-lg-1',
    },
  ],
  paymentDateInformation: [
    { title: 'Номер счета', name: 'paymentNumber', type: 'number' },
    { title: 'Дата счета', name: 'paymentData', type: 'date' },
    { title: 'Оплатить не позднее', name: 'paymentLastDate', type: 'date' },
    {
      title: 'НДС',
      name: 'paymentNDS',
      options: [
        { title: 'Без НДС', name: 'Без НДС' },
        { title: '0%', name: '0' },
        { title: '10%', name: '10' },
        { title: '18%', name: '18' },
      ],

    },
  ],
};

export default formInputCols;
