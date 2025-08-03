import React from 'react';

const styles = {
  ImageContainer: {
    top: '616px',
    left: '140px',
    width: '8px',
    height: '16px',
    backgroundImage: 'url(./image.png)',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
};

const defaultProps = {
  image: 'https://assets.api.uizard.io/api/cdn/stream/4251376f-768b-41b2-bc83-9703a3178f41.png',
};

const Image = props => {
  return (
    <div
      style={{
        ...styles.ImageContainer,
        backgroundImage: `url(${props.image ?? defaultProps.image})`,
      }}
    />
  );
};

export default Image;
