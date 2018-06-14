import React from 'react';

import Transactions from '../../Transactions/Transactions';

import './TransactionsTab.scss';

class TransactionsTab extends React.Component {
  render() {
    return (
      <div className="home-tab">
        <Transactions />
      </div>
    );
  }
}

export default TransactionsTab;