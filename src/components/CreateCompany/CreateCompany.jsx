import React from 'react'

import PageHeader from '../PageHeader/PageHeader'
import CreateForm from './CreateForm/CreateForm';
import PendingTransaction from '../PendingTransaction/PendingTransaction';

export default class CreateCompany extends React.Component {
  render() {
    return (
      <div>
        <PageHeader hasLogo />
        <div className="container">
          <CreateForm history={this.props.history} />
        </div>

        <PendingTransaction />
      </div>
    )
  }
}