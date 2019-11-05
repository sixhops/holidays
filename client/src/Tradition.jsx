import React from 'react';

const Tradition = props => (
  <div>
    <h4>{props.tradition.name}</h4>
    <p>{props.tradition.description}</p>
  </div>
)
export default Tradition;
