import { createIcon } from '@chakra-ui/react';
export const EyeIcon = createIcon({
  displayName: 'EyeIcon',
  viewBox: '0 0 24 24',
  defaultProps: {
    fill: 'none',
    boxSize: '24px',
    color: 'nobel',
  },
  path: (
    <>
      <path
        d="M5.21424 12.7851C4.9351 12.2989 4.9351 11.7013 5.21424 11.2151C6.68299 8.65687 9.03228 7 11.6798 7C14.3273 7 16.6766 8.65685 18.1453 11.215C18.4245 11.7012 18.4245 12.2988 18.1453 12.785C16.6766 15.3432 14.3273 17.0001 11.6798 17.0001C9.03227 17.0001 6.683 15.3433 5.21424 12.7851Z"
        stroke="#B3B3B3"
        strokeWidth="1.2"
      />
      <circle cx="11.6797" cy="12" r="1.87501" stroke="#B3B3B3" strokeWidth="1.2" />
    </>
  ),
});
