import React from 'react';

import './TabButton.scss';

const TabButton = ({ tab, activeTab, onClick }) => (
  <button
    className={`${activeTab === tab ? 'tab-button active' : 'tab-button'}`}
    onClick={() => onClick(tab)}
  >
    {tab.charAt(0).toUpperCase() + tab.slice(1)}
  </button>
);

export default TabButton;