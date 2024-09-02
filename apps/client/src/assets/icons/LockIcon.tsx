import { createIcon } from '@chakra-ui/react';
export const LockIcon = createIcon({
  displayName: 'LockIcon',
  viewBox: '0 0 24 24',
  defaultProps: {
    fill: 'none',
    boxSize: '24px',
    color: 'nobel',
  },
  path: (
    <>
      <rect
        x="6.23623"
        y="10.6909"
        width="11.5273"
        height="7.70909"
        rx="1.30909"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M8.81836 10.7273V8.18182C8.81836 7.33795 9.15359 6.52864 9.75029 5.93193C10.347 5.33523 11.1563 5 12.0002 5C12.844 5 13.6534 5.33523 14.2501 5.93193C14.8468 6.52864 15.182 7.33795 15.182 8.18182V10.7273"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
});
