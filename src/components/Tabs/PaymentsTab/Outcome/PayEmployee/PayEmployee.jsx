import React from 'react';

import './PayEmployee.scss';
import Button from '../../../../Button/Button';

const PayEmployee = ({
  employeeName,
  employeeSalary,
  employeeWallet,
  handlePay,
  payedDate = null,
}) => (
  <div className="pay-employee">
    <div className="employee-info">
      <span className="light-text">{employeeName}</span>
      <span className="dark-text">{employeeSalary}</span>
    </div>
    {
      !payedDate &&
      <Button width="74px" text="Pay" onClick={() => handlePay(employeeWallet, employeeSalary)} />
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