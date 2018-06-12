import React from 'react';

import HomeTab from './HomeTab/HomeTab';
import TeamTab from './TeamTab/TeamTab';
import TransactionsTab from './TransactionsTab/TransactionsTab';
import PaymentsTab from './PaymentsTab/PaymentsTab';

const Tabs = ({ tab, kompany }) => (
  <div>
    {
      tab === 'home' &&
      <HomeTab kompany={kompany} />
    }
    {
      tab === 'team' &&
      <TeamTab kompany={kompany} />
    }
    {
      tab === 'transactions' &&
      <TransactionsTab kompany={kompany} />
    }
    {
      tab === 'payments' &&
      <PaymentsTab kompany={kompany} />
    }
  </div>
);

export default Tabs;