import React from 'react'

import PageHeader from '../PageHeader/PageHeader'
import CreateForm from './CreateForm/CreateForm';

export default class CreateCompany extends React.Component {
  render() {
    return (
      <div>
        <PageHeader hasLogo />
        <div className="container">
          <CreateForm />
        </div>
      </div>
    )
  }
}