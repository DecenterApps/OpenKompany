import React from 'react';

import './PaymentsTab.scss';
import Profit from './Profit/Profit';
import Outcome from './Outcome/Outcome';

class PaymentsTab extends React.Component {
  render() {
    const {
      isPaymentsInTab,
      kompany,
    } = this.props;

    return (
      <div>
        {
          isPaymentsInTab &&
          <Profit />
        }
        {
          !isPaymentsInTab &&
          <Outcome kompany={kompany}/>
        }
      </div>
    );
  }
}

export default PaymentsTab;