import React from 'react';
import { connect } from 'react-redux';

import './PendingTransaction.scss';

import loader from './assets/loader.png';
import succImg from './assets/success.png';
import close from './assets/close.png';

import { successTransaction } from '../../actions/kompanyActions';

class PendingTransaction extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      show: this.props.pendingTransaction.isOpen,
      success: false,
    };
  }

  componentDidUpdate(prevProps) {
    const previousPendingTx = prevProps.pendingTransaction.isOpen;
    const currentPendingTx = this.props.pendingTransaction.isOpen;
    if (!previousPendingTx && currentPendingTx) {
      this.setState({
        show: true,
        success: false,
      });
    }
    if (previousPendingTx && !currentPendingTx) {
      this.setState({
        success: true,
      });

      setTimeout(() => {
        this.props.successTransaction();
        this.setState({
          show: false,
        });
      }, 3000);
    }
  }

  render() {
    const {
      show,
      success,
    } = this.state;

    const {
      pendingTransaction,
    } = this.props;

    return (
      <div className={`pending-transaction ${show ? 'show' : undefined}`}>
        <img className={`loader ${success ? 'no-animation' : undefined}`}
             src={success ? succImg : loader} alt="" />
        <span>{success ? 'SUCCESS' : 'PENDING TRANSACTION'}</span>
        <a
          href={`https://rinkeby.etherscan.io/tx/${pendingTransaction.txHash}`}
          className="tx-hash"
          target="_blank"
        >
          {pendingTransaction.txHash}
        </a>
        <button onClick={() => {
          this.props.successTransaction();
          this.setState({
            show: false,
            success: false,
          });
        }} className="pending-tx">
          <img src={close} />
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  pendingTransaction: state.kompany.pendingTransaction,
});

const mapDispatchToProps = {
  successTransaction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PendingTransaction);