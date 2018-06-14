import React from 'react';

import './CreateForm.scss';

import Input from '../../Input/Input';
import Button from '../../Button/Button';
import Modal from '../../Modal/Modal';

export default class CreateForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      companyName: '',
      wallet: '',
      founder: '',
      location: '',
      employee: '',
      vision: '',
      isOpen: false,
    };

    this.handleInput = this.handleInput.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  toggleModal(e) {
    e.stopPropagation();
    e.preventDefault();
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <form className="create-form">
        <p className="create-form-title">Create a Kompany</p>
        <div className="columns-wrapper">
          <div className="form-column">
            <Input
              name="companyName"
              placeholder="Kompany name"
              value={this.state.companyName}
              onChange={this.handleInput}
            />
            <Input
              name="founder"
              placeholder="Founder's full name"
              value={this.state.founder}
              onChange={this.handleInput}
            />
          </div>
          <div className="form-column">
            <Input
              name="address"
              placeholder="Wallet address"
              value={this.state.wallet}
              onChange={this.handleInput}
            />
            <Input
              name="search"
              placeholder="Kompany location"
              value={this.state.location}
              onChange={this.handleInput}
            />
          </div>
        </div>
        <Button text="Create" />
        <div className="columns-wrapper employees">
          <div className="form-column">
            <p>Employees:</p>
            <Input
              name="employee"
              buttonContent="Add"
              placeholder="Employee address"
              value={this.state.employee}
              onChange={this.handleInput}
              wideButton
              onButtonClick={this.toggleModal}
            />
          </div>
          <div className="form-column">
            <Input
              name="founder"
              placeholder="Vision"
              value={this.state.vision}
              onChange={this.handleInput}
            />
          </div>
        </div>
        <Modal
          toggleModal={this.toggleModal}
          isOpen={this.state.isOpen}
          title="Add Employee"
          className="create-modal"
        >
          <div className="row">
            <div className="col-2">
              <Input
                name="employee_name"
                placeholder="Name"
                value={this.state.vision}
                onChange={this.handleInput}
                width="216px"
              />
            </div>
            <div className="col-2">
              <Input
                name="employee_position"
                placeholder="Position"
                width="216px"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-2">
              <Input
                name="employee_contact"
                placeholder="Contact"
                value={this.state.vision}
                onChange={this.handleInput}
                width="216px"
              />
            </div>
            <div className="col-2">
              <Input
                name="employee_salary"
                placeholder="Salary"
                width="216px"
              />
            </div>
          </div>
          <div className="row">
            <Input
              name="employee_contract"
              placeholder="Contract"
              width="100%"
              height="150px"
              textarea
            />
          </div>
          <div className="row">
            <Input
              name="employee_address"
              placeholder="Wallet Address"
              width="100%"
            />
          </div>
          <Button text="Add to Team" />
        </Modal>
      </form>
    );
  }
}