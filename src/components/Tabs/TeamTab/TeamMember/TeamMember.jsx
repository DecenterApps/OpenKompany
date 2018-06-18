import React from 'react';

import Separator from '../../../Separator/Separator';

import './TeamMember.scss';

const TeamMember = ({ member }) => (
  <div className="team-member">
    <p className="team-member-name">{member.employeeName}</p>
    <Separator smallMargin />
    <div className="personal-data">
      <div>
        <div className="dark-text label">Contact</div>
        <div className="light-text">{member.employeeContact}</div>
      </div>
      <div>
        <div className="dark-text label">Position</div>
        <div className="light-text">{member.employeePosition}</div>
      </div>
      <div>
        <div className="dark-text label">Salary</div>
        <div className="light-text">{member.employeeSalary}</div>
      </div>
    </div>
  </div>
);

export default TeamMember;