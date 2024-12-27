import React from 'react';

interface IEyeIcon2 {
  fill?: string;
}

export default function EyeIcon2({ fill = '#7e22ce' }: IEyeIcon2) {
  return (
    <svg
      width='18'
      height='20'
      viewBox='0 0 22 22'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M9.73302 4.076C12.0624 3.7984 14.4186 4.29082 16.4419 5.47805C18.4651 6.66528 20.0442 8.48208 20.938 10.651C21.0214 10.8755 21.0214 11.1225 20.938 11.347C20.5705 12.238 20.0848 13.0755 19.494 13.837M13.084 13.158C12.5182 13.7045 11.7604 14.0069 10.9738 14C10.1872 13.9932 9.43479 13.6777 8.87856 13.1215C8.32234 12.5652 8.00683 11.8128 8 11.0262C7.99316 10.2396 8.29554 9.48181 8.84202 8.916M16.479 16.499C15.1525 17.2848 13.6725 17.776 12.1394 17.9394C10.6063 18.1028 9.05597 17.9345 7.59365 17.4459C6.13133 16.9573 4.79121 16.1599 3.66423 15.1077C2.53725 14.0556 1.64977 12.7734 1.06202 11.348C0.978677 11.1235 0.978677 10.8765 1.06202 10.652C1.94865 8.50186 3.50869 6.69725 5.50802 5.509M1.00002 1L21 21'
        stroke={fill}
        strokeWidth='1.75'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}