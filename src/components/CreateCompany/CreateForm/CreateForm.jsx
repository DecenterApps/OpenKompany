import React from 'react';

import './CreateForm.scss';

import Input from '../../Input/Input';
import Button from '../../Button/Button';
import Modal from '../../Modal/Modal';

import { uploadFile } from '../../../services/ipfsService';
import { saveKompany } from '../../../services/ethereumService';

export default class CreateForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      companyName: '',
      wallet: '',
      founder: '',
      location: '',
      description: '',
      vision: '',
      contact: '',
      isOpen: false,
      employees: [],
      employeeName: '',
      employeePosition: '',
      employeeSalary: '',
      employeeContact: '',
      employeeContract: '',
      employeeWallet: '',
    };

    this.handleInput = this.handleInput.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.addEmployee = this.addEmployee.bind(this);
    this.createKompany = this.createKompany.bind(this);
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

  async createKompany(e) {
    e.preventDefault();
    const kompany = {
      companyName: this.state.companyName,
      wallet: this.state.wallet,
      founder: this.state.founder,
      location: this.state.location,
      vision: this.state.vision,
      description: this.state.description,
      contact: this.state.contact,
      employees: this.state.employees,
    };
    const hash = await uploadFile(kompany);

    kompany.hash = hash;
    saveKompany(kompany);

    // if success redirect
    this.props.history.push('/');

    console.log(hash);
  }

  addEmployee(e) {
    e.preventDefault();
    const {
      employeeName,
      employeePosition,
      employeeSalary,
      employeeContact,
      employeeContract,
      employeeWallet,
    } = this.state;

    this.setState({
      employeeName: '',
      employeePosition: '',
      employeeSalary: '',
      employeeContact: '',
      employeeContract: '',
      employeeWallet: '',
      employees: [
        ...this.state.employees,
        {
          employeeName,
          employeePosition,
          employeeSalary,
          employeeContact,
          employeeContract,
          employeeWallet
        }
      ]
    });
    this.toggleModal();
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
          <div className="form-column long">
            <Input
              name="wallet"
              placeholder="Wallet address"
              value={this.state.wallet}
              width="418px"
              onChange={this.handleInput}
            />
            <Input
              name="location"
              placeholder="Kompany location"
              value={this.state.location}
              width="418px"

              onChange={this.handleInput}
            />
          </div>
        </div>
        <div className="columns-wrapper">
          <div className="form-column">
            <Input
              name="contact"
              placeholder="Contact"
              value={this.state.contact}
              onChange={this.handleInput}
            />
          </div>
          <div className="form-column" />
        </div>
        <div className="columns-wrapper">
          <div className="form-column">
            <Input
              textarea
              name="description"
              placeholder="Description"
              height="100px"
              value={this.state.description}
              onChange={this.handleInput}
            />
          </div>
          <div className="form-column long">
            <Input
              textarea
              name="vision"
              placeholder="Vision"
              height="100px"
              width="418px"
              value={this.state.vision}
              onChange={this.handleInput}
            />
          </div>
        </div>
        <div className="columns-wrapper employees">
          <div className="form-column centered">
            <p>Employees:</p>
            <Button text="Add" onClick={this.toggleModal} />
          </div>
          <div className="form-column">
          </div>
        </div>
        {
          this.state.employees.map((item, i) => (
            <p className="light-text employee-name">{i + 1}. {item.employeeName}</p>
          ))
        }
        <Button className="create-button" text="Create" onClick={this.createKompany} />
        <Modal
          toggleModal={this.toggleModal}
          isOpen={this.state.isOpen}
          title="Add Employee"
          className="create-modal"
        >
          <div className="row">
            <div className="col-2">
              <Input
                name="employeeName"
                placeholder="Name"
                value={this.state.employeeName}
                onChange={this.handleInput}
                width="216px"
              />
            </div>
            <div className="col-2">
              <Input
                name="employeePosition"
                placeholder="Position"
                value={this.state.employeePosition}
                onChange={this.handleInput}
                width="216px"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-2">
              <Input
                name="employeeSalary"
                placeholder="Salary"
                type="number"
                value={this.state.employeeSalary}
                onChange={this.handleInput}
                width="216px"
              />
            </div>
            <div className="col-2">
              <Input
                name="employeeContact"
                placeholder="Contact"
                value={this.state.employeeContact}
                onChange={this.handleInput}
                width="216px"
              />
            </div>
          </div>
          <div className="row">
            <Input
              textarea
              name="employeeContract"
              placeholder="Contract"
              value={this.state.employeeContract}
              onChange={this.handleInput}
              width="100%"
              height="150px"
            />
          </div>
          <div className="row">
            <Input
              name="employeeWallet"
              placeholder="Wallet Address"
              value={this.state.employeeWallet}
              onChange={this.handleInput}
              width="100%"
            />
          </div>
          <Button text="Add to Team" onClick={this.addEmployee} />
        </Modal>
      </form>
    );
  }
}