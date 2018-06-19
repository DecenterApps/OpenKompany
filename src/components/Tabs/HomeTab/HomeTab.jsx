import React from 'react';

import Separator from '../../Separator/Separator';
import Button from '../../Button/Button';

import './HomeTab.scss';

class HomeTab extends React.Component {
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
            <p className="dark-text label">ID:</p>
            <p className="light-text">{data.legalID}</p>
          </div>
          <div className="col-2">
            <p className="dark-text label">Wallet address:</p>
            <p className="light-text">{data.wallet}</p>
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
          <Button width="117px" text="Edit" />
        }
      </div>
    );
  }
}

export default HomeTab;