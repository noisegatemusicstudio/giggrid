import React from 'react';

const styles = {
  Button: {
    cursor: 'pointer',
    top: '528px',
    left: '22px',
    width: '334px',
    height: '43px',
    padding: '0px 8px',
    border: '0',
    boxSizing: 'border-box',
    borderRadius: '22px',
    backgroundColor: '#fcc500',
    color: '#161616',
    fontSize: '14px',
    fontFamily: 'Noto Sans JP',
    fontWeight: 700,
    lineHeight: '27px',
    outline: 'none',
  },
};

const defaultProps = {
  label: 'Sign Up',
};

const Button = props => {
  return <button style={styles.Button}>{props.label ?? defaultProps.label}</button>;
};

export default Button;
