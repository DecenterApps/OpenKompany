import React from 'react';

import Input from '../../../Input/Input';

import './Outcome.scss';
import Button from '../../../Button/Button';
import Separator from '../../../Separator/Separator';
import PayEmployee from './PayEmployee/PayEmployee';
import RecurringPayment from './RecurringPayment/RecurringPayment';
import Modal from '../../../Modal/Modal';

import {
  payService,
  payTeam,
  saveKompany,
  payRecurring
} from '../../../../services/ethereumService';
import { uploadFile } from '../../../../services/ipfsService';

class Outcome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      singlePaymentValue: '',
      singlePaymentAddress: '',
      isOpen: false,
      recurringName: '',
      recurringValue: '',
      recurringAddress: '',
      recurringDay: '',
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSinglePayment = this.handleSinglePayment.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.addRecurringPayment = this.addRecurringPayment.bind(this);
    this.handlePayRecurring = this.handlePayRecurring.bind(this);
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

  handleSinglePayment() {
    const {
      singlePaymentValue,
      singlePaymentAddress,
    } = this.state;

    payService(singlePaymentValue, singlePaymentAddress);
  }

  handleTeamPay(address, salary) {
    payTeam(address, salary);
  }

  async addRecurringPayment(e) {
    e.preventDefault();
    const payment = {
      recurringName: this.state.recurringName,
      recurringValue: this.state.recurringValue,
      recurringAddress: this.state.recurringAddress,
      recurringDay: this.state.recurringDay,
    };

    this.setState({
      recurringName: '',
      recurringValue: '',
      recurringAddress: '',
      recurringDay: '',
    });
    const alterKompany = { ...this.props.kompany.data };
    if (alterKompany.recurringPayments === undefined) {
      alterKompany.recurringPayments = [];
      alterKompany.recurringPayments.push(payment);
    } else {
      alterKompany.recurringPayments.push(payment);
    }

    const hash = await uploadFile(alterKompany);

    alterKompany.hash = hash;
    saveKompany(alterKompany);
    this.toggleModal();

    console.log(hash, alterKompany, this.props.kompany.data);
  }

  handlePayRecurring(value, address) {
    payRecurring(value, address);
  }

  render() {
    const {
      singlePaymentValue,
      singlePaymentAddress,
    } = this.state;

    const {
      kompany,
    } = this.props;

    const { employees } = kompany.data;

    const recurringPayments = kompany.data.recurringPayments || [];

    return (
      <div className="section-outcome">
        <p className="section-title">Pay a person / service</p>
        <div>
          <Input
            name="singlePaymentValue"
            placeholder="Value"
            type="number"
            value={singlePaymentValue}
            onChange={this.handleInput}
          /> <span className="light-text"> &nbsp;&nbsp;&nbsp;ETH</span>
        </div>
        <div>
          <Input
            name="singlePaymentAddress"
            width="567px"
            placeholder="Wallet address"
            value={singlePaymentAddress}
            onChange={this.handleInput}
          />
        </div>
        <Button width="74px" text="Pay" onClick={this.handleSinglePayment} />

        <Separator largeMargin />

        <p className="section-title">Team payments</p>

        {
          kompany.data.employees.map((employee, i) =>
            (
              <PayEmployee
                {...employee}
                handlePay={this.handleTeamPay}
              />
            ))
        }

        <Separator largeMargin />

        <p className="section-title">Recurring payments</p>

        <div className="recurring-payments">
          {
            recurringPayments
              .map((payment, i) => (
                <RecurringPayment {...payment} handlePay={this.handlePayRecurring} />
              ))
          }
        </div>
        <Button text="Add" width="74px" onClick={this.toggleModal} />
        <Modal
          toggleModal={this.toggleModal}
          isOpen={this.state.isOpen}
          title="Add a recurring payment"
          className="create-modal"
        >
          <div className="row">
            <div className="col-2">
              <Input
                name="recurringName"
                placeholder="Name"
                value={this.state.recurringName}
                onChange={this.handleInput}
                width="216px"
              />
            </div>
            <div className="col-2">
              <Input
                name="recurringValue"
                placeholder="Value"
                type="number"
                value={this.state.recurringValue}
                onChange={this.handleInput}
                width="216px"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-2">
              <Input
                name="recurringAddress"
                placeholder="Address"
                value={this.state.recurringAddress}
                onChange={this.handleInput}
                width="216px"
              />
            </div>
            <div className="col-2">
              <Input
                name="recurringDay"
                placeholder="Day"
                type="number"
                value={this.state.recurringDay}
                onChange={this.handleInput}
                width="216px"
              />
            </div>
          </div>
          <Button text="Close" width="117px" onClick={this.toggleModal} />
          <Button text="Add" width="117px" onClick={this.addRecurringPayment} />
        </Modal>
      </div>
    );
  }
}

export default Outcome;