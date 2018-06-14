import React from 'react';

import Separator from '../../../Separator/Separator';

import './TeamMember.scss';

const TeamMember = ({ member }) => (
  <div className="team-member">
    <p className="team-member-name">{member.name}</p>
    <Separator smallMargin />
    <div className="personal-data">
      <div>
        <div className="dark-text label">Contact</div>
        <div className="light-text">{member.contact}</div>
      </div>
      <div>
        <div className="dark-text label">Position</div>
        <div className="light-text">{member.position}</div>
      </div>
      <div>
        <div className="dark-text label">Salary</div>
        <div className="light-text">{member.salary}</div>
      </div>
    </div>
  </div>
);

export default TeamMember;