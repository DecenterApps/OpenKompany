import React from 'react';

import './CreateForm.scss';

import Input from '../../Input/Input';
import Button from '../../Button/Button';

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
    };

    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
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
      </form>
    );
  }
}