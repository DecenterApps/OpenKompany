import React from 'react';

import './RecurringPayment.scss';
import Button from '../../../../Button/Button';

class RecurringPayment extends React.Component {
  render() {
    const {
      recurringName,
      recurringValue,
      recurringAddress,
      recurringDay,
      handlePay,
    } = this.props;

    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return (
      <div className="recurring-payment">
        <div className="payment-name">
          {recurringName}
        </div>
        <div className="payment-info">
          <span>{recurringValue}</span>
          <Button text="Pay" width="74px" onClick={() => handlePay(recurringValue, recurringAddress)} />
        </div>
        <div className="payment-date">
          {recurringDay}.{month}.{year}.
        </div>
      </div>
    );
  }
}

export default RecurringPayment;
