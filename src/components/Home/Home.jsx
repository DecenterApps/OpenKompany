import React from 'react';
import { Link } from 'react-router-dom';
import HomeHeader from './HomeHeader/HomeHeader';
import CompanyList from './CompanyList/CompanyList'
import Footer from '../Footer/Footer'
import PendingTransaction from '../PendingTransaction/PendingTransaction';

class Home extends React.Component {
  render() {
    return (
      <div>
        <HomeHeader />
        <CompanyList />
        <Footer />
        <PendingTransaction />
      </div>
    );
  }
}

export default Home;