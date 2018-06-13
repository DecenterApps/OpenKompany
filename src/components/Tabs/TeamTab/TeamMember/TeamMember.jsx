import React from 'react';

import Separator from '../../../Separator/Separator';

import './TeamMember.scss';

const TeamMember = ({ member }) => (
  <div className="team-member">
    <p className="team-member-name">{member.name}</p>
    <Separator smallMargin />
    <div className="personal-data">
      <div className="row">
        <div className="col-2">
          <div className="dark-text label">Contact</div>
          <div className="light-text">{member.contact}</div>
        </div>
        <div className="col-2">
          <div className="dark-text label">Position</div>
          <div className="light-text">{member.position}</div>
        </div>
      </div>
      <div className="row">
        <div className="col-1">
          <div className="dark-text label">Salary</div>
          <div className="light-text">{member.salary}</div>
        </div>
        <div className="col-1" />
      </div>
    </div>
  </div>
);

export default TeamMember;