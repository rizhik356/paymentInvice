import React, { useRef } from 'react';
import {
  Row, Form, FloatingLabel, Button,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import formInputCols from '../services/dataSource/formInputCols';
import { addPayment } from '../slices/paymentSlice';

const Payment = ({ props }) => {
  const dispatch = useDispatch();
  const paymentPurpose = useRef(null);

  const handleClick = () => {
    const formikPaymentValues = {
      paymentPurpose: props.formik.values.paymentPurpose,
      sum: props.formik.values.sum,
      quantity: props.formik.values.quantity,
      sumConvertToCurrency: 0,
      sumOfPaymentAddition: 0,
    };
    dispatch(addPayment(formikPaymentValues));
    const resetPaymentFormValues = { paymentPurpose: '', sum: '', quantity: '' };
    Object.keys(resetPaymentFormValues).forEach((fieldName) => {
      props.formik.setFieldValue(fieldName, resetPaymentFormValues[fieldName]);
    });
    props.formik.setTouched({});
    paymentPurpose.current.focus();
  };
  return (
    <Row>
      <h1>Платеж</h1>
      <div className="d-flex flex-lg-row flex-column justify-content-between">
        {formInputCols.payment.map((item) => (
          <FloatingLabel
            controlId={item.name}
            label={item.title}
            className={item.col ? `mb-3 ${item.col}` : 'mb-3'}
            key={item.name}
          >
            <Form.Control
              onChange={props.formik.handleChange}
              ref={item.name === 'paymentPurpose' ? paymentPurpose : null}
              className="shadow"
              type={item.type ? `${item.type}` : 'text'}
              name={item.name}
              placeholder={item.title}
              value={props.formik.values[item.name]}
            />
          </FloatingLabel>
        ))}
        <Button
          type="button"
          onClick={handleClick}
          className="shadow mb-3 col-lg-2"
          variant="outline-dark"
        >
          Добавить
        </Button>
      </div>
    </Row>
  );
};

export default Payment;
