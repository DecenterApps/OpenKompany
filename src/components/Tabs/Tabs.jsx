import React from 'react';

import HomeTab from './HomeTab/HomeTab';
import TeamTab from './TeamTab/TeamTab';
import TransactionsTab from './TransactionsTab/TransactionsTab';
import PaymentsTab from './PaymentsTab/PaymentsTab';
import TasksTab from './TasksTab/TasksTab';

const Tabs = ({ tab, kompany, isPaymentsInTab }) => (
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
      tab === 'tasks' &&
      <TasksTab kompany={kompany} />
    }
    {
      tab === 'payments' &&
      <PaymentsTab kompany={kompany} isPaymentsInTab={isPaymentsInTab} />
    }
  </div>
);

export default Tabs;