import React from 'react';

interface ISend {
  fill?: string;
}

function Send({ fill = '#8018bd' }: ISend) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      viewBox='0 0 24 24'
      fill='none'
      stroke={fill}
      strokeWidth='1.75'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='lucide lucide-send-horizontal'
    >
      <path d='M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z' />
      <path d='M6 12h16' />
    </svg>
  );
}

export default Send;
