import React from 'react';
import { Link } from 'react-router-dom';

import './CompanyList.scss';

import magnifier from '../../../assets/magnifier.svg';

import Input from '../../Input/Input';
import Button from '../../Button/Button';
import CompanyCard from './CompanyCard/CompanyCard';

class CompanyList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
    };

    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    const kompanies = JSON.parse(localStorage.getItem('kompanies')) || [];

    return (
      <div className="company-list">
        <div className="container">
          <div className="company-list-header">
            <Link to="/create_kompany">
              <Button text="Create OpenKompany" />
            </Link>
            <Input
              width="250px"
              height="48px"
              name="search"
              placeholder="Search Kompany"
              buttonContent={<img src={magnifier} alt="" />}
              value={this.state.search}
              onChange={this.handleInput}
            />
          </div>
          <div className="list-wrapper">
            {
              kompanies.map((company, i) => (
                <CompanyCard
                  key={Date.now() + Math.random() + company.companyName}
                  company={company}
                />
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default CompanyList;
