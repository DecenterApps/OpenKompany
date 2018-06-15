import React from 'react';

import Input from '../../../Input/Input';

import './Outcome.scss';
import Button from '../../../Button/Button';
import Separator from '../../../Separator/Separator';
import PayEmployee from './PayEmployee/PayEmployee';
import RecurringPayment from './RecurringPayment/RecurringPayment';
import Modal from '../../../Modal/Modal';

class Outcome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      singlePayment: {
        value: '',
        address: '',
      },
      isOpen: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal(e) {
    console.log(1);
    e.stopPropagation();
    e.preventDefault();
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const {
      singlePayment,
    } = this.state;

    const {
      kompany,
    } = this.props;

    const { employees } = kompany.data;

    employees[2].payedDate = '24.2.2018';

    return (
      <div className="section-outcome">
        <p className="section-title">Pay a person / service</p>
        <div>
          <Input
            name="value"
            placeholder="Value"
            value={singlePayment.value}
            onChange={this.handleInput}
          /> <span className="light-text"> &nbsp;&nbsp;&nbsp;ETH</span>
        </div>
        <div>
          <Input
            name="address"
            width="567px"
            placeholder="Wallet address"
            value={singlePayment.address}
            onChange={this.handleInput}
          />
        </div>
        <Button width="74px" text="Pay" />

        <Separator largeMargin />

        <p className="section-title">Team payments</p>

        {
          kompany.data.employees.map((employee, i) => <PayEmployee {...employee} />)
        }

        <Separator largeMargin />

        <p className="section-title">Recurring payments</p>

        <div className="recurring-payments">
          {
            kompany.data.recurringPayments
              .map((payment, i) => <RecurringPayment {...payment} />)
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
                name="payment_name"
                placeholder="Name"
                value={this.state.vision}
                onChange={this.handleInput}
                width="216px"
              />
            </div>
            <div className="col-2">
              <Input
                name="payment_value"
                placeholder="Value"
                width="216px"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-2">
              <Input
                name="employee_address"
                placeholder="Address"
                value={this.state.vision}
                onChange={this.handleInput}
                width="216px"
              />
            </div>
            <div className="col-2">
              <Input
                name="employee_day"
                placeholder="Day"
                width="216px"
              />
            </div>
          </div>
          <Button text="Close" width="117px" onClick={this.toggleModal} />
          <Button text="Add" width="117px" />
        </Modal>
      </div>
    );
  }
}

export default Outcome;