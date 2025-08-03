import React from 'react';

const styles = {
  Button: {
    cursor: 'pointer',
    top: '483px',
    left: '23px',
    width: '336px',
    height: '37px',
    padding: '0px 8px',
    border: '0',
    boxSizing: 'border-box',
    borderRadius: '22px',
    backgroundColor: '#22c55e',
    color: '#000000',
    fontSize: '15px',
    fontFamily: 'Noto Sans JP',
    fontWeight: 500,
    lineHeight: '27px',
    outline: 'none',
  },
};

const defaultProps = {
  label: 'Login',
};

const Button = props => {
  return <button style={styles.Button}>{props.label ?? defaultProps.label}</button>;
};

export default Button;
