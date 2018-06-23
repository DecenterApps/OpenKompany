import React from 'react';
import { connect } from 'react-redux';

import Separator from '../../Separator/Separator';
import Button from '../../Button/Button';

import './HomeTab.scss';
import Modal from '../../Modal/Modal';
import Input from '../../Input/Input';
import { requestTransaction, successTransaction } from '../../../actions/kompanyActions';
import { createIco, payService } from '../../../services/ethereumService';

class HomeTab extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tokenName: '',
      tokenSymbol: '',
      tokenDecimals: '',
      isOpen: false,
    };

    this.handleInput = this.handleInput.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.startIco = this.startIco.bind(this);
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

  async startIco() {
    const {
      tokenName,
      tokenSymbol,
      tokenDecimals,
    } = this.state;

    await createIco(
      this.props.companyAddress,
      tokenName,
      tokenSymbol,
      tokenDecimals,
      this.props.requestTransaction,
      this.props.successTransaction,
    );
  }

  render() {
    const { kompany } = this.props;

    if (kompany.isFetching) {
      return (
        <div>
          Loading...
        </div>
      );
    }

    const { data, userType } = kompany;

    return (
      <div className="home-tab">
        <div className="row">
          <div className="col-1">
            <p className="dark-text label">Founder:</p>
            <p className="light-text">{data.founder}</p>
          </div>
          <div className="col-1">
            {/*<p className="dark-text label">ID:</p>*/}
            {/*<p className="light-text">{data.legalID}</p>*/}
          </div>
          <div className="col-2">
            {/*<p className="dark-text label">Wallet address:</p>*/}
            {/*<p className="light-text">{data.wallet}</p>*/}
          </div>
        </div>
        <div className="row">
          <div className="col-1">
            <p className="dark-text label">Contact:</p>
            <p className="light-text">{data.contact}</p>
          </div>
          <div className="col-1">
            <p className="dark-text label">Location:</p>
            <p className="light-text">{data.location}</p>
          </div>
          <div className="col-2" />
        </div>
        <Separator />
        <div className="row">
          <div className="col-1">
            <div className="dark-text label">Employees:</div>
            {
              data.employees && data.employees
                .map((employee, i) =>
                  (
                    <div key={i} className="light-text employee">
                      {employee.employeeName}
                    </div>
                  ))
            }
          </div>
          <div className="col-1" />
          <div className="col-2">
            <div className="dark-text label">Vision:</div>
            <div className="light-text vision">{data.vision}</div>
          </div>
        </div>
        {
          userType === 'founder' &&
          <Button width="117px" text="Start an ICO" onClick={this.toggleModal} />
        }
        <Modal
          toggleModal={this.toggleModal}
          isOpen={this.state.isOpen}
          title="Start an ICO"
          className="create-modal"
        >
          <div className="row">
            <div className="col-2">
              <Input
                name="tokenName"
                placeholder="Token name"
                value={this.state.tokenName}
                onChange={this.handleInput}
                width="216px"
              />
            </div>
            <div className="col-2">
              <Input
                name="tokenSymbol"
                placeholder="Token symbol"
                value={this.state.tokenSymbol}
                onChange={this.handleInput}
                width="216px"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-2">
              <Input
                name="tokenDecimals"
                type="number"
                placeholder="Token decimals"
                value={this.state.tokenDecimals}
                onChange={this.handleInput}
                width="216px"
              />
            </div>
            <div className="col-2">
            </div>
          </div>
          <Button text="Close" width="117px" onClick={this.toggleModal} />
          <Button text="START" width="117px" onClick={this.startIco} />
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = {
  requestTransaction,
  successTransaction,
};

export default connect(
  (state) => ({
    companyAddress: state.kompany.data.companyAddress,
  }),
  mapDispatchToProps
)(HomeTab);