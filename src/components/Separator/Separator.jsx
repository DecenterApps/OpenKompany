import React from 'react';

export default ({ smallMargin, largeMargin }) => (
  <div
    className={`separator ${largeMargin && 'large-margin'} ${smallMargin && 'small-margin'}`}
  />
)