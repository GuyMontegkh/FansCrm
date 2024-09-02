import { createIcon } from '@chakra-ui/react';
export const ErrorIcon = createIcon({
  displayName: 'ErrorIcon',
  viewBox: '0 0 24 24',
  defaultProps: {
    fill: 'none',
    boxSize: '24px',
  },
  path: (
    <>
      <circle cx="12" cy="12" r="11" stroke="#F26464" strokeWidth="1.2" />
      <path
        d="M12 7V13"
        stroke="#F26464"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 16V17.5"
        stroke="#F26464"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
});
