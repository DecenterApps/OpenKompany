import React from 'react';
import { connect } from 'react-redux';

import { requestTransaction, successTransaction } from '../../../actions/kompanyActions';
import { getTasks } from '../../../services/ethereumService';

class TasksTab extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      tasks: [],
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  async componentDidMount() {
    const tasks = await getTasks(this.props.companyAddress, this.props.tokenAddress);
    console.log(tasks);
    this.setState({
      tasks,
    });
  }

  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  toggleModal(e) {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const {
      kompany,
    } = this.props;

    return (
      <div>
        <div className="tasks">
          <div className="list-wrapper">
            {
              this.state.tasks.map(task => (
                <div className="company-card">
                  <p className="company-title">Task</p>
                  <div className="active-ico">
                    {
                      !task.cancelled && !task.finalised ? 'Running' : 'Cancelled'
                    }
                  </div>
                  <div className="company-stats">
                    <p><span className="stat-label">Due date: </span> {task.dueDate}
                    </p>
                    <p><span className="stat-label">Domain ID: </span> {task.domainId}</p>
                    <p><span className="stat-label">Balance: </span> {task.balance}</p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  requestTransaction,
  successTransaction,
};

export default connect(
  (state) => ({
    companyAddress: state.kompany.data.companyAddress,
    tokenAddress: state.kompany.data.tokenAddress,
  }),
  mapDispatchToProps
)(TasksTab);
