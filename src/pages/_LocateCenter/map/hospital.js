import * as React from 'react';

const ICON = `M7,1C6.4,1,6,1.4,6,2v4H2C1.4,6,1,6.4,1,7v1
c0,0.6,0.4,1,1,1h4v4c0,0.6,0.4,1,1,1h1c0.6,0,1-0.4,1-1V9h4c0.6,0,1-0.4,1-1V7c0-0.6-0.4-1-1-1H9V2c0-0.6-0.4-1-1-1H7z`;

const pinStyle = {
  fill: '#d00',
  stroke: 'none'
};

function Hospital(props) {
  const {size = 20} = props;

  return (
    // <svg height={size} viewBox="0 0 24 24" style={pinStyle}>
    //   <path d={ICON} />
    // </svg>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" height="19" width="19"><title>hospital-15.svg</title><rect fill="#fff" x="0" y="0" width="19" height="19"></rect><path fill="#d00" transform="translate(2 2)" d="M7,1C6.4,1,6,1.4,6,2v4H2C1.4,6,1,6.4,1,7v1
	c0,0.6,0.4,1,1,1h4v4c0,0.6,0.4,1,1,1h1c0.6,0,1-0.4,1-1V9h4c0.6,0,1-0.4,1-1V7c0-0.6-0.4-1-1-1H9V2c0-0.6-0.4-1-1-1H7z"></path></svg>
  );
}

export default React.memo(Hospital);
