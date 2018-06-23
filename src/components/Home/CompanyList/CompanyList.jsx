import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './CompanyList.scss';

import magnifier from '../../../assets/magnifier.svg';

import Input from '../../Input/Input';
import Button from '../../Button/Button';
import CompanyCard from './CompanyCard/CompanyCard';
import TabButton from '../../Tabs/TabButton/TabButton';
import CompanyICOCard from './CompanyICOCard/CompanyICOCard';

import { getKompanies, getCurrentIcos } from '../../../actions/kompanyActions';

class CompanyList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      activeTab: 'Kompanies'
    };

    this.handleInput = this.handleInput.bind(this);
    this.setActiveTab = this.setActiveTab.bind(this);
  }

  async componentWillMount() {
    this.props.getKompanies();
    this.props.getCurrentIcos();
  }

  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  setActiveTab(tab) {
    this.setState({
      activeTab: tab,
    });
  }

  render() {
    const {
      activeTab,
    } = this.state;
    const {
      kompanies,
      icos,
    } = this.props;

    const tabs = ['Kompanies', 'Active ICOs'];

    return (
      <div className="company-list">
        <div className="container">
          <div className="company-list-header">
            <Link to="/create_kompany">
              <Button text="Create an OpenKompany" />
            </Link>
            <Input
              width="250px"
              height="48px"
              name="search"
              placeholder="Search Kompanies / ICOs"
              buttonContent={<img src={magnifier} alt="" />}
              value={this.state.search}
              onChange={this.handleInput}
            />
          </div>
          <div className="tabs-wrapper home">
            {
              tabs.map(tab => (
                <TabButton
                  tab={tab}
                  activeTab={activeTab}
                  onClick={this.setActiveTab}
                />
              ))
            }
          </div>
          <div className="list-wrapper">
            {
              activeTab === 'Kompanies' &&
              kompanies.filter(item => item.companyName.indexOf(this.state.search) !== -1)
                .map((company, i) => (
                  <CompanyCard
                    key={company.companyAddress}
                    company={company}
                  />
                ))
            }
            {
              activeTab === 'Active ICOs' &&
              icos.filter(item => item.name.indexOf(this.state.search) !== -1)
                .map((ico, i) => (
                  <CompanyICOCard
                    key={ico.icoAddress}
                    ico={ico}
                  />
                ))
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  kompanies: state.kompany.kompanies,
  icos: state.kompany.icos,
});

const mapDispatchToProps = {
  getKompanies,
  getCurrentIcos,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyList);
