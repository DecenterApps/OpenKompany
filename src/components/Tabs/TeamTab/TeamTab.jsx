import React from 'react';

import TeamMember from './TeamMember/TeamMember';
import Button from '../../Button/Button';
import { uploadFile } from '../../../services/ipfsService';
import Input from '../../Input/Input';
import Modal from '../../Modal/Modal';
import { saveKompany } from '../../../services/ethereumService';

class TeamTab extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      employeeName: '',
      employeePosition: '',
      employeeSalary: '',
      employeeContact: '',
      employeeContract: '',
      employeeWallet: '',
    };

    this.addEmployee = this.addEmployee.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  async addEmployee(e) {
    e.preventDefault();
    const kompany = {
      employeeName: this.state.employeeName,
      employeePosition: this.state.employeePosition,
      employeeSalary: this.state.employeeSalary,
      employeeContact: this.state.employeeContact,
      employeeContract: this.state.employeeContract,
      employeeWallet: this.state.employeeWallet,
    };

    this.setState({
      employeeName: '',
      employeePosition: '',
      employeeSalary: '',
      employeeContact: '',
      employeeContract: '',
      employeeWallet: '',
    });

    const alterKompany = this.props.kompany.data;

    alterKompany.employees = [
      ...alterKompany.employees,
      kompany,
    ];

    alterKompany.hash = await uploadFile(alterKompany);

    // Update kompany
    saveKompany(alterKompany);

    this.toggleModal();
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

  render() {
    const {
      kompany,
    } = this.props;

    return (
      <div>
        <div className="team-members">
          {
            kompany.data.employees.map(member => (
              <TeamMember member={member} />
            ))
          }
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
        {
          kompany.userType === 'founder' &&
          <div>
            <Button text="Add" width="117px" marginRight="19px" onClick={this.toggleModal} />
            <Button text="Remove" width="117px" />
          </div>
        }
      </div>
    );
  }
}

export default TeamTab;