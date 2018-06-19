import React from 'react';
import Input from '../../../Input/Input';
import Star from './Star';

import './Profit.scss';
import Button from '../../../Button/Button';

import { payToCompany } from '../../../../services/ethereumService';

class Profit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      rating: -1,
      message: '',
      hoverIndex: -1,
    };

    this.handlePayToKompany = this.handlePayToKompany.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }


  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleStar(i, isClick) {
    console.log(i, isClick);
    if (isClick === true) {
      return this.setState({
        rating: i,
      });
    }

    this.setState({
      hoverIndex: i,
    });
  }

  handleClear() {
    this.setState({
      hoverIndex: -1,
    });
  }

  handlePayToKompany(e) {
    e.preventDefault();
    const {
      value, rating, message,
    } = this.state;

    payToCompany(value, rating, message);
  }

  render() {
    const {
      rating,
      value,
      message,
      hoverIndex,
    } = this.state;

    const {
      kompany,
    } = this.props;

    const points = [1, 2, 3, 4, 5];
    return (
      <div className="section section-profit">
        <p className="section-title">Pay to {kompany.data.companyName || 'this kompany'}</p>
        <div>
          <Input
            name="value"
            type="number"
            placeholder="Value"
            value={value}
            onChange={this.handleInput}
          /> <span className="light-text"> &nbsp;&nbsp;&nbsp;ETH</span>
        </div>
        <div className="rating">
          <span>Rating</span>
          <div>
            {
              points.map((points, i) => (
                <Star
                  fill={(hoverIndex >= i || rating >= i) ? '#FFD700' : undefined}
                  handleHover={this.handleStar.bind(this, i)}
                  handleClear={this.handleClear.bind(this)}
                  handleClick={this.handleStar.bind(this, i, true)}
                />
              ))
            }
          </div>
        </div>
        <div>
          <Input
            name="message"
            placeholder="Message"
            width="563px"
            height="192px"
            textarea
            value={message}
            onChange={this.handleInput}
          />
        </div>
        <Button text="Pay" onClick={this.handlePayToKompany} />
      </div>
    );
  }
}

export default Profit;