import formatDate from './formatDate';
import MakeainData from './mainData';

/* eslint-disable no-undef */
const renderPDF = (data) => {
  const { paymentsCounter, payments, formData } = data;

  const docDefinition = {
    info: {
      title: 'Счет на оплату',
      author: 'rizhik356',
      subject: 'Счет на оплату',
      keywords: 'Счет',
    },
    pageSize: 'A4',
    pageMargins: [40, 60, 40, 60],
    content: [
      {
        table: {
          widths: ['*', '*', 'auto', '*'],
          body: [
            [{
              colSpan: 2,
              rowSpan: 3,
              text: [
                { text: `${formData.bikRecipient}` },
                { text: '\n\nБанк получателя', fontSize: 10 },
              ],
            }, {},
            { text: 'БИК', fontSize: 13 },
            { text: `${formData.bikRecipient}` },
            ],
            ['', '', 'Сч. №', `${formData.AccountRecipient}`],
            ['', '', { colSpan: 2, text: '' }, ''],
            [{ text: `ИНН ${formData.innRecipient}` }, 'КПП', 'Сч. №', `${formData.CorrAccountRecipient}`],
            [{
              colSpan: 2,
              text: [
                { text: `${formData.bankRecipient}` },
                { text: '\n\nБанк получателя', fontSize: 10 },
              ],
            }, {},
            {},
            {},
            ],
          ],
        },
      },

      {
        text: `Счет на оплату № ${formData.paymentNumber} от ${formatDate(formData.paymentData)} г.`,
        style: 'header',
        bold: true,
        alignment: 'left',
        margin: [0, 20, 0, 0],
      },
      {
        canvas: [{
          type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 2,
        }],
      },
      ...MakeainData(
        formData,
        paymentsCounter,
        payments,
      ),
      {
        columns: [
          {
            width: 'auto',
            text: `Оплатить не позднее ${formatDate(formData.paymentLastDate)} г.`,
            margin: [0, 15, 0, 0],
          },
        ],
      },
      {
        columns: [
          {
            width: 'auto',
            text: 'Оплата данного счета означает согласие с условиями поставки товара.',
            margin: [0, 5, 0, 0],
          },
        ],
      },
      {
        columns: [
          {
            width: 'auto',
            text: 'Уведомление об оплате обязательно, в противном случае не гарантируется наличие товара на складе.',
            margin: [0, 5, 0, 0],
          },
        ],
      },
      {
        columns: [
          {
            width: 'auto',
            text: 'Товар отпускается по факту прихода денег на р/с Поставщика, самовывозом, при наличии доверенности и паспорта.',
            margin: [0, 5, 0, 15],
          },
        ],
      },
      {
        canvas: [{
          type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 2,
        }],
      },
      {
        columns: [
          {
            width: 'auto',
            text: 'Предприниматель',
            bold: true,
            margin: [0, 0, 80, 0],
          },
          {
            table: {
              widths: ['*'],
              body: [
                [
                  {
                    text: `${formData.nameRecipient}`,
                    border: [false, false, false, true],
                    alignment: 'right',
                  },
                ],
              ],
            },
          },
        ],
        margin: [0, 30, 0, 0],
        pageBreak: 'after',
      },
      {
        text: `Акт № ${formData.paymentNumber} от ${formatDate(formData.paymentData)} г.`,
        style: 'header',
        bold: true,
        alignment: 'left',
        margin: [0, 20, 0, 0],
      },
      {
        canvas: [{
          type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 2,
        }],
      },
      ...MakeainData(
        formData,
        paymentsCounter,
        payments,
      ),
      {
        columns: [
          {
            width: 'auto',
            text: 'Вышеперечисленные услуги выполнены полностью и в срок.',
            margin: [0, 5, 0, 0],
          },
        ],
      },
      {
        columns: [
          {
            width: 'auto',
            text: 'Заказчик претензий по объему, качеству и срокам оказания услуг не имеет.',
            margin: [0, 5, 0, 15],
          },
        ],
      },
      {
        canvas: [{
          type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 2,
        }],
      },
      {
        columns: [
          {
            width: '*',
            text: 'Исполнитель',
            bold: true,
            margin: [0, 15, 0, 5],
          },
          {
            width: 90,
            text: '',
            margin: [0, 15, 0, 5],
          },
          {
            width: '*',
            text: 'Заказчик',
            bold: true,
            margin: [0, 15, 0, 5],
          },
        ],
      },
      {
        table: {
          widths: ['*', 90, '*'],
          body: [
            [
              {
                text: `${formData.nameRecipient}`,
                border: [false, false, false, true],
                margin: [0, 0, 0, 30],
              },
              {
                text: '',
                border: [false, false, false, false],
                margin: [0, 0, 0, 30],
              },
              {
                text: `${formData.telPayer}`,
                margin: [0, 0, 0, 30],
                border: [false, false, false, true],
              },
            ],
          ],
        },
      },
    ],
  };
  pdfMake.createPdf(docDefinition).download(`Счет/Акт № ${formData.paymentNumber}.pdf`);
};

export default renderPDF;
