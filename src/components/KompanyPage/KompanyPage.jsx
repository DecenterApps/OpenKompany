import React from 'react';
import { connect } from 'react-redux';
import { getKompany } from '../../actions/kompanyActions';

import PageHeader from '../PageHeader/PageHeader';
import Tabs from '../Tabs/Tabs';
import TabButton from '../Tabs/TabButton/TabButton';

import './KompanyPage.scss';

class KompanyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'home',
    };

    this.setActiveTab = this.setActiveTab.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.id || null;
    this.props.getKompany(id);
  }

  setActiveTab(tab) {
    this.setState({
      activeTab: tab,
    })
  }

  render() {
    const { kompany } = this.props;
    const { activeTab } = this.state;

    const tabs = ['home', 'team', 'transactions', 'payments'];

    return (
      <div>
        <PageHeader
          companyName={kompany.data.companyName}
          description={kompany.data.description}
        />

        <div className="triangle-background">
          <div className="container">
            <div className="tabs-wrapper">
              {
                tabs.map(tab => (
                  <TabButton tab={tab} activeTab={activeTab} onClick={this.setActiveTab} />
                ))
              }
            </div>
            <Tabs tab={activeTab} kompany={kompany} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  kompany: state.kompany,
});

const mapDispatchToProp = { getKompany };

export default connect(
  mapStateToProps,
  mapDispatchToProp,
)(KompanyPage);