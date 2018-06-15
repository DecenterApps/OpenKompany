import React from 'react';

import './RecurringPayment.scss';
import Button from '../../../../Button/Button';

class RecurringPayment extends React.Component {
  render() {
    const {
      name,
      value,
      day,
    } = this.props;
    // {
    //   name: 'Cloud',
    //     value: 250,
    //   address: '',
    //   day: '21',
    // },
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return (
      <div className="recurring-payment">
        <div className="payment-name">
          {name}
        </div>
        <div className="payment-info">
          <span>{value}</span>
          <Button text="Pay" width="74px" />
        </div>
        <div className="payment-date">
          {day}.{month}.{year}.
        </div>
      </div>
    );
  }
}

export default RecurringPayment;
