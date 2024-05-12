import React from 'react';
import { Col, FloatingLabel, Form } from 'react-bootstrap';
import formInputCols from '../services/dataSource/formInputCols';

const PaymentDateInfo = ({ props }) => {
  const { formik } = props;
  const makeTable = (names) => names.map(({
    title, name, type, options,
  }) => {
    const formConrol = (
      <Form.Control
        onChange={formik.handleChange}
        value={formik.values[name]}
        className="shadow"
        label={title}
        style={{ minWidth: 165 }}
        type={type || 'text'}
        name={name}
        required
        placeholder={title}
      />
    );
    const formSelect = () => (
      <Form.Select
        className="shadow"
        name={name}
        onChange={formik.handleChange}
        required
        value={formik.values[name]}
      >
        {options.map((item) => (<option key={item.title} value={item.name}>{item.title}</option>))}
      </Form.Select>
    );
    return (
      <FloatingLabel
        controlId={name}
        required
        label={title}
        className="mb-3"
        key={title}
      >
        {options ? formSelect() : formConrol}
      </FloatingLabel>

    );
  });
  return (
    <Col className="d-flex flex-md-row flex-column justify-content-between mt-2">
      {makeTable(formInputCols.paymentDateInformation)}
    </Col>
  );
};

export default PaymentDateInfo;
