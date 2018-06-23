import React from 'react';
import Web3 from 'web3';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from '../Home/Home';
import CreateCompany from '../CreateCompany/CreateCompany';
import KompanyPage from '../KompanyPage/KompanyPage';
import store from '../../store';
import { bootstrapNodes } from '../../services/ipfsService';
import { executeWhenReady } from '../../services/ethereumService';
import IcoPage from '../IcoPage/IcoPage';

class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      hasMetamask: false,
      ipfsConnected: false,
    };
  }

  componentWillMount() {
    executeWhenReady(() => {
      window.node = new Ipfs({
        repo: 'open-kompany',
        config: {
          Bootstrap: bootstrapNodes,
          Addresses: {
            Swarm: [],
          },
        }
      });

      node.on('ready', () => {
        this.setState({
          ipfsConnected: true,
        });
      });

      console.log(window.web3);
      const hasMetamask = typeof window.web3 !== 'undefined';

      if (hasMetamask) {
        window.web3 = new Web3(web3.currentProvider);
      }

      this.setState({
        isLoading: false,
        hasMetamask,
      });
    });
  }

  render() {
    const {
      hasMetamask,
      isLoading,
      ipfsConnected,
    } = this.state;

    if (isLoading || !ipfsConnected) {
      return <div>Loading...</div>;
    }

    if (!hasMetamask) {
      return <div>No metamask!</div>;
    }

    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/create_kompany" component={CreateCompany} />
          <Route path="/kompany/:hash" component={KompanyPage} />
          <Route path="/ico/:hash" component={IcoPage} />
        </div>
      </Router>
    );
  }
}

export default Routes;
