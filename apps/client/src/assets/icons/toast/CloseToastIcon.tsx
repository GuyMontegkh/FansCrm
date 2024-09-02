import { createIcon } from '@chakra-ui/react';
export const CloseToastIcon = createIcon({
  displayName: 'CloseToastIcon',
  viewBox: '0 0 24 24',
  defaultProps: {
    fill: 'none',
    boxSize: '24px',
  },
  path: (
    <>
      <path
        d="M8 8L16.2258 16.2258"
        stroke="#F3F3F3"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 16.2258L16.2258 7.99998"
        stroke="#F3F3F3"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
});
