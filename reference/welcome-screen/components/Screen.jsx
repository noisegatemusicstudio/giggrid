import React from 'react';

const styles = {
  Screen: {
    backgroundColor: '#161616',
  },
};

const Screen = props => {
  return <div style={styles.Screen}>{props.children}</div>;
};

export default Screen;
