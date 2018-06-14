import React from 'react';

import './Modal.scss';

export default class Modal extends React.Component {
  render() {
    const {
      title,
      children,
      isOpen,
      className,
      toggleModal,
    } = this.props;

    return (
      <div
        onClick={toggleModal}
        className={`modal-wrapper ${isOpen && 'active'} ${className}`}
      >
        <div className="modal" onClick={(e) => { e.stopPropagation(); }}>
          <div className="modal-header">{title}</div>
          <div className="modal-body">
            {children}
          </div>
        </div>
      </div>
    );
  }
}