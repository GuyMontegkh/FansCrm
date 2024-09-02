import { createIcon } from '@chakra-ui/react';
export const SuccessIcon = createIcon({
  displayName: 'SuccessIcon',
  viewBox: '0 0 24 24',
  defaultProps: {
    fill: 'none',
    boxSize: '24px',
  },
  path: (
    <>
      <rect
        x="0.6"
        y="0.6"
        width="22.8"
        height="22.8"
        rx="11.4"
        stroke="#014FEF"
        strokeWidth="1.2"
      />
      <path
        d="M7.28613 12.4045L10.5656 15.6839L17.1246 9.12496"
        stroke="#014FEF"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </>
  ),
});
