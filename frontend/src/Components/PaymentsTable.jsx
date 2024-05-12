import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { deletePayment } from '../slices/paymentSlice';

const PaymentTable = () => {
  const payments = useSelector((state) => state.payments.payments);
  const dispatch = useDispatch();

  const handleDeletePayment = (id) => {
    dispatch(deletePayment(id));
  };

  const makeTable = () => (
    <Table striped hover responsive className="shadow rounded">
      <thead>
        <tr>
          <th>Наименование</th>
          <th>Кол-во</th>
          <th>Ед.</th>
          <th>Цена</th>
          <th>Сумма</th>
        </tr>
      </thead>
      <tbody>
        {payments.map((item) => {
          const {
            paymentPurpose,
            sumConvertToCurrency,
            sumOfPaymentAddition,
            quantity,
            paymentId,
          } = item;
          return (
            <tr key={paymentId}>
              <td>{paymentPurpose}</td>
              <td>{quantity !== '' ? quantity : 1}</td>
              <td>шт.</td>
              <td>{sumConvertToCurrency}</td>
              <td>{sumOfPaymentAddition}</td>
              <td className="col-lg-1 border-top">
                <Button
                  className="shadow"
                  onClick={() => handleDeletePayment(paymentId)}
                  variant="outline-danger"
                >
                  Удалить
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
  return (
    payments.length !== 0 ? makeTable() : null
  );
};

export default PaymentTable;
