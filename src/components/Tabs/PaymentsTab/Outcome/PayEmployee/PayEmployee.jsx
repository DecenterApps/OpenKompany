import React from 'react';

import './PayEmployee.scss';
import Button from '../../../../Button/Button';

const PayEmployee = ({
  name,
  salary,
  handlePay,
  payedDate,
}) => (
  <div className="pay-employee">
    <div className="employee-info">
      <span className="light-text">{name}</span>
      <span className="dark-text">{salary}</span>
    </div>
    {
      !payedDate &&
      <Button width="74px" text="Pay" />
    }
    {
      payedDate &&
      <div>
        <span className="label-pay">Payed</span>
        <span className="date-payed">{payedDate}</span>
      </div>
    }
  </div>
);

export default PayEmployee;