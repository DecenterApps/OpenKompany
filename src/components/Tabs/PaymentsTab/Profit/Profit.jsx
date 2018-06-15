import React from 'react';
import Input from '../../../Input/Input';
import Star from './Star';

import './Profit.scss';
import Button from '../../../Button/Button';

class Profit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      rating: -1,
      message: '',
      hoverIndex: -1,
    };
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

  render() {
    const {
      rating,
      value,
      message,
      hoverIndex,
    } = this.state;
    const points = [1, 2, 3, 4, 5];
    return (
      <div className="section section-profit">
        <p className="section-title">Add profit</p>
        <div>
          <Input
            name="value"
            placeholder="Value"
            value={this.state.value}
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
            name="search"
            placeholder="Value"
            width="563px"
            height="192px"
            textarea
            value={this.state.value}
            onChange={this.handleInput}
          />
        </div>
        <Button text="Pay"/>
      </div>
    );
  }
}

export default Profit;