import makeTable from './makeTablePayments';
import priceWithNds from './priceWithNds';
import sumToWords from './sumToWords';

const MakeainData = (
  formData,
  paymentsCounter,
  payments,
) => {
  const nds = formData.paymentNDS === 'Без НДС' || formData.paymentNDS === '' ? 'Без НДС' : `${formData.paymentNDS}%`;

  const sumWithNds = priceWithNds(payments, formData.paymentNDS);
  const sumWithoutNds = priceWithNds(payments, 0);

  const mainData = [
    {
      columns: [
        {
          width: 'auto',
          text: 'Поставщик\n(Исполнитель):',
          margin: [0, 0, 15, 0],
        },
        {
          width: '*',
          text: `${formData.nameRecipient}, ИНН ${formData.innRecipient}, ${formData.adressRecipient}, тел.: ${formData.telRecipient}`,
        },
      ],
      margin: [0, 10, 0, 0],
    },
    {
      columns: [
        {
          width: 'auto',
          text: 'Покупатель\n(Заказчик):',
          margin: [0, 0, 15, 0],
        },
        {
          width: '*',
          text: `${formData.telPayer}, ИНН ${formData.innPayer}, КПП ${formData.kppPayer}, ${formData.indexPayer}, ${formData.adressPayer}`,
        },
      ],
      margin: [0, 10, 0, 0],
    },
    {
      columns: [
        {
          width: 'auto',
          text: 'Основание:',
          margin: [0, 15, 15, 0],
        },
        {
          width: '*',
          text: 'Основной договор',
          bold: true,
          margin: [0, 15, 0, 15],
        },
      ],
    },
    makeTable(payments),
    {
      columns: [
        {
          width: '*',
          text: '',
        },
        {
          width: 'auto',
          text: 'Итого:',
          bold: true,
        },
        {
          width: 'auto',
          text: sumWithoutNds,
          margin: [15, 0, 0, 0],
        },
      ],
      margin: [0, 15, 0, 0],
    },
    {
      columns: [
        {
          width: '*',
          text: '',
        },
        {
          width: 'auto',
          text: 'В том числе НДС:',
          bold: true,
        },
        {
          width: 'auto',
          text: nds,
          margin: [15, 0, 0, 0],
        },
      ],
      margin: [0, 15, 0, 0],
    },
    {
      columns: [
        {
          width: '*',
          text: '',
        },
        {
          width: 'auto',
          text: 'Всего к оплате:',
          bold: true,
        },
        {
          width: 'auto',
          text: sumWithNds,
          margin: [15, 0, 0, 0],
        },
      ],
      margin: [0, 15, 0, 0],
    },
    {
      columns: [
        {
          width: 'auto',
          text: `Всего наименований ${paymentsCounter}, на сумму ${sumWithNds} руб.`,
        },
      ],
    },
    {
      columns: [
        {
          width: 'auto',
          text: sumToWords(sumWithNds),
          bold: true,
          margin: [0, 5, 0, 0],
        },
      ],
    },
  ];
  return mainData;
};

export default MakeainData;
