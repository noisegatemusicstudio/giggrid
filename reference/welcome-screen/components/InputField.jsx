import React from 'react';

const styles = {
  Input: {
    top: '380px',
    left: '51px',
    width: '279px',
    height: '39px',
    padding: '0px 8px',
    border: '0',
    boxSizing: 'border-box',
    borderRadius: '6px',
    backgroundColor: '#ffffff',
    color: '#94a3b8',
    fontSize: '12px',
    fontFamily: 'Noto Sans JP',
    lineHeight: '38.99305725097656px',
    outline: 'none',
  },
};

const defaultProps = {
  text: 'Email',
};

const InputField = props => {
  return <input style={styles.Input} placeholder={props.text ?? defaultProps.text} />;
};

export default InputField;
