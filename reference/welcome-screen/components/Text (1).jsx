import React from 'react';

const styles = {
  Text: {
    color: '#ffffff',
    fontSize: '10px',
    fontFamily: 'Noto Sans JP',
    lineHeight: '16px',
  },
};

const defaultProps = {
  text: 'or connect with',
};

const Text = props => {
  return <div style={styles.Text}>{props.text ?? defaultProps.text}</div>;
};

export default Text;
