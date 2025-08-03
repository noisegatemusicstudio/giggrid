import React from 'react';

const styles = {
  Input: {
    top: '426px',
    left: '52px',
    width: '278px',
    height: '37px',
    padding: '0px 8px',
    border: '0',
    boxSizing: 'border-box',
    borderRadius: '6px',
    backgroundColor: '#ffffff',
    color: '#94a3b8',
    fontSize: '12px',
    fontFamily: 'Noto Sans JP',
    lineHeight: '36.99652862548828px',
    outline: 'none',
  },
};

const defaultProps = {
  text: 'Password',
};

const InputField = props => {
  return <input style={styles.Input} placeholder={props.text ?? defaultProps.text} />;
};

export default InputField;
