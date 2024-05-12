import React from 'react';
import {
  Form, Container, Row, Col, FloatingLabel, Button,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import Payment from './Payment';
import formInputCols from '../services/dataSource/formInputCols';
import PaymentTable from './PaymentsTable';
import PaymentDateInfo from './PaymentDateInfo';
import { addFormData, stateReset } from '../slices/paymentSlice';

const MainForm = () => {
  const dispatch = useDispatch();

  const makeInitialValues = () => {
    const initialValues = {};
    Object.values(formInputCols).forEach((item) => {
      item.forEach(({ name }) => {
        initialValues[name] = '';
      });
    });
    return initialValues;
  };
  const formik = useFormik({
    initialValues: makeInitialValues(),
    onSubmit: (values) => {
      dispatch(addFormData(values));
      formik.resetForm();
      dispatch(stateReset());
    },
  });

  const makeTable = (names) => names.map(({ title, name }) => (
    <div className="col-12 col-lg-5" key={title}>
      <FloatingLabel
        controlId={name}
        label={title}
        className="mb-3"
      >
        <Form.Control
          onChange={formik.handleChange}
          value={formik.values[name]}
          className="shadow"
          type="text"
          required
          name={name}
          placeholder={title}
        />
      </FloatingLabel>
    </div>
  ));
  return (
    <Form onSubmit={formik.handleSubmit}>
      <Container className="d-flex flex-column col-lg-9">
        <Row>
          <h1>Получатель</h1>
        </Row>
        <Row>
          <Col lg={12} className="d-flex flex-wrap justify-content-between">
            {makeTable(formInputCols.recipient)}
          </Col>
        </Row>
        <Row>
          <h1>Плательщик</h1>
        </Row>
        <Row className="d-flex flex-column">
          <Col lg={12} className="d-flex flex-wrap justify-content-between">
            {makeTable(formInputCols.payer)}
          </Col>
        </Row>
        <Payment props={{ formik }} />
        <PaymentTable />
        <PaymentDateInfo props={{ formik }} />
        <Col className="d-flex justify-content-center">
          <Button
            type="submit"
            className="shadow mt-3 col-12 col-lg-2 p-3 "
            variant="outline-dark"
          >
            Создать счет
          </Button>
        </Col>
      </Container>
    </Form>
  );
};

export default MainForm;
