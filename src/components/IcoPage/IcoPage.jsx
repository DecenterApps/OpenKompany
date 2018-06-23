import React from 'react';
import { connect } from 'react-redux';
import {
  getCurrentIco,
  requestTransaction,
  successTransaction,
} from '../../actions/kompanyActions';

import PageHeader from '../PageHeader/PageHeader';
import Footer from '../Footer/Footer';

import './IcoPage.scss';
import PendingTransaction from '../PendingTransaction/PendingTransaction';
import Separator from '../Separator/Separator';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Modal from '../Modal/Modal';
import { buyTokens } from '../../services/ethereumService';

class IcoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      isOpen: false,
    };

    this.handleInput = this.handleInput.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.buyTokens = this.buyTokens.bind(this);
  }

  componentDidMount() {
    const hash = this.props.match.params.hash || null;
    if (!hash) return;
    this.props.getCurrentIco(hash);
  }

  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  toggleModal(e) {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  async buyTokens() {
    const {
      amount,
    } = this.state;

    try {
      await buyTokens(
        this.props.ico.icoAddress,
        this.props.ico.price,
        amount,
        this.props.requestTransaction,
        this.props.successTransaction,
      );
    } catch (e) {
      console.error(e);
    }

    this.toggleModal();
  }

  render() {
    const { ico } = this.props;

    if (!ico) return <div>Loading...</div>;

    return (
      <div>
        <PageHeader
          companyName={`${ico.name} (${ico.symbol})`}
        />
        <div className="triangle-background">
          <div className="container padded">
            <div className="row">
              <div className="col-1">
                <p className="dark-text label">Token Name:</p>
                <p className="light-text">{ico.name}</p>
              </div>
              <div className="col-1">
                <p className="dark-text label">Token decimals:</p>
                <p className="light-text">{ico.decimals.toString()}</p>
              </div>
              <div className="col-2">
                {/*<p className="dark-text label">Wallet address:</p>*/}
                {/*<p className="light-text">{data.wallet}</p>*/}
              </div>
            </div>
            <div className="row">
              <div className="col-1">
                <p className="dark-text label">Token Symbol:</p>
                <p className="light-text">{ico.symbol}</p>
              </div>
              <div className="col-1">
                <p className="dark-text label">Price:</p>
                <p className="light-text">{ico.price.toString()} Ξ</p>
              </div>
              <div className="col-2" />
            </div>
            <Separator />
            <Button text={'Buy tokens'} onClick={this.toggleModal} />
          </div>
          <Footer />
        </div>
        <PendingTransaction />
        <Modal
          toggleModal={this.toggleModal}
          isOpen={this.state.isOpen}
          title="Buy tokens"
          className="create-modal"
        >
          <div className="row">
            <div className="col-2">
              <Input
                name="amount"
                placeholder="Amount"
                value={this.state.amount}
                onChange={this.handleInput}
                width="216px"
              />
            </div>
            <div className="col-2 price">
              Price: {this.state.amount * ico.price} Ξ
            </div>
          </div>
          <Button text="Close" width="117px" onClick={this.toggleModal} />
          <Button text="Buy" width="117px" onClick={this.buyTokens} />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ico: state.kompany.ico,
});

const mapDispatchToProp = {
  getCurrentIco,
  requestTransaction,
  successTransaction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProp,
)(IcoPage);