import React from 'react';

import TeamMember from './TeamMember/TeamMember';
import Button from '../../Button/Button';

class TeamTab extends React.Component {
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
        <Button text="Add" width="117px" marginRight="19px" />
        <Button text="Remove" width="117px" />
      </div>
    );
  }
}

export default TeamTab;