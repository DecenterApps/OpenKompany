import React from 'react';

import Separator from '../Separator/Separator';

import './Transactions.scss';

class Transactions extends React.Component {
  render() {
    const txs = [
      {
        txHash: '0xA5Fdb57fEd1DFA68557e88C3Ba3786A9Ca8Fa518',
        value: 100,
      },
      {
        txHash: '0xA5Fdb57fEd1DFA68557e88C3Ba3786A9Ca8Fa518',
        value: 100,
      },
      {
        txHash: '0xA5Fdb57fEd1DFA68557e88C3Ba3786A9Ca8Fa518',
        value: 100,
      },
      {
        txHash: '0xA5Fdb57fEd1DFA68557e88C3Ba3786A9Ca8Fa518',
        value: 100,
      },
      {
        txHash: '0xA5Fdb57fEd1DFA68557e88C3Ba3786A9Ca8Fa518',
        value: 100,
      },
      {
        txHash: '0xA5Fdb57fEd1DFA68557e88C3Ba3786A9Ca8Fa518',
        value: 100,
      },
      {
        txHash: '0xA5Fdb57fEd1DFA68557e88C3Ba3786A9Ca8Fa518',
        value: 100,
      },
      {
        txHash: '0xA5Fdb57fEd1DFA68557e88C3Ba3786A9Ca8Fa518',
        value: 100,
      },
    ];

    return (
      <div className="transactions">
        <div className="row">
          <div className="col-2">
            <div className="dark-text label">transactions</div>
          </div>
          <div className="col-2">
            <div className="dark-text label">value</div>
          </div>
        </div>
        {
          txs.map((tx, i) => (
            <div className="row">
              <div className="col-2">
                <div className="light-text">
                  <a
                    href={`https://etherscan.io/tx/${tx.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {tx.txHash}
                  </a>
                </div>
              </div>
              <div className="col-2">
                <div className="light-text">
                  {tx.value} $
                </div>
              </div>
            </div>
          ))
        }
        <Separator smallMargin />
        <p className="price">{txs.reduce((acc, tx) => tx.value + acc, 0)} $</p>
      </div>
    );
  }
}

export default Transactions;