import React from 'react';

const styles = {
  Card: {
    top: '605px',
    left: '200px',
    width: '78px',
    height: '39px',
    backgroundColor: '#db4437',
    borderRadius: '50px',
  },
};

const Card = props => {
  return <div style={styles.Card}>{props.children}</div>;
};

export default Card;
