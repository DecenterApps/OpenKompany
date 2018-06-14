import React from 'react';

import './TabButton.scss';
import Button from '../../Button/Button';

const TabButton = ({
  tab,
  activeTab,
  onClick,
  isPaymentsInTab,
  changePayments,
}) => (
  <div
    className={`
    ${activeTab === tab ? 'tab-button active' : 'tab-button'}
    ${activeTab === 'payments' && 'no-padding'}
      `}
    onClick={() => onClick(tab)}
  >
    {tab.charAt(0).toUpperCase() + tab.slice(1)}
    {
      tab === 'payments' && activeTab === 'payments' &&
      <div>
        <div
          className={`in-out-button ${isPaymentsInTab && 'active'}`}
          onClick={changePayments}
        >
          IN
        </div>
        <div
          className={`in-out-button ${!isPaymentsInTab && 'active'}`}
          onClick={changePayments}
        >
          OUT
        </div>
      </div>
    }
  </div>
);

export default TabButton;