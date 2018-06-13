import React from 'react';

import TeamMember from './TeamMember/TeamMember';
import Button from '../../Button/Button';

class TeamTab extends React.Component {
  render() {
    const teamMembers = [
      {
        name: 'Carlos Torres',
        contact: 'carlos@name.com',
        position: 'Front-end Engineer',
        salary: '1500$',
      },
      {
        name: 'Carlos Torres',
        contact: 'randomemail@gmail.com',
        position: 'Front-end Engineer',
        salary: '1500$',
      },
      {
        name: 'Carlos Torres',
        contact: 'carlos@name.com',
        position: 'Front-end Engineer',
        salary: '1500$',
      },
      {
        name: 'Carlos Torres',
        contact: 'carlos@name.com',
        position: 'Front-end Engineer',
        salary: '1500$',
      }, {
        name: 'Carlos Torres',
        contact: 'carlos@name.com',
        position: 'Front-end Engineer',
        salary: '1500$',
      },
      {
        name: 'Carlos Torres',
        contact: 'carlos@name.com',
        position: 'Front-end Engineer',
        salary: '1500$',
      },
      {
        name: 'Carlos Torres',
        contact: 'carlos@name.com',
        position: 'Front-end Engineer',
        salary: '1500$',
      },
      {
        name: 'Carlos Torres',
        contact: 'carlos@name.com',
        position: 'Front-end Engineer',
        salary: '1500$',
      }, {
        name: 'Carlos Torres',
        contact: 'carlos@name.com',
        position: 'Front-end Engineer',
        salary: '1500$',
      },
    ];

    return (
      <div>
        <div className="team-members">
          {
            teamMembers.map(member => (
              <TeamMember member={member} />
            ))
          }
        </div>
        <Button text="Add" width="117px" marginRight="19px" />
        <Button text="Remove" width="117px" />
      </div>
    );
  }
}

export default TeamTab;