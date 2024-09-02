import { ComponentStyleConfig, defineStyle, SystemStyleObject } from '@chakra-ui/react';

const main: SystemStyleObject = {
  bgColor: 'blueRibbon',
  _hover: {
    color: 'white',
    bgColor: '#0041C8',
    borderColor: '#0041C8',
  },
  _disabled: {
    color: 'white',
    bgColor: '#0041C8',
    cursor: 'not-allowed',
    opacity: 0.4,
    _hover: {
      bgColor: '#0041C8!important',
      color: 'white',
    },
  },
  _loading: {
    opacity: 1,
  },
};

const dark: SystemStyleObject = {
  bgColor: 'transparent',
  _hover: {
    color: 'white',
    bgColor: '#000000',
    borderColor: '#000000',
  },
  _disabled: {
    color: 'white',
    bgColor: '#000000',
    cursor: 'not-allowed',
    opacity: 0.4,
    _hover: {
      bgColor: '#000000!important',
      color: 'white',
    },
  },
  _loading: {
    opacity: 1,
  },
};

const darkInvert: SystemStyleObject = {
  color: 'nobelSecondary',
  bgColor: 'woodsmoke',
  borderColor: 'shark',
  borderRadius: '12px',
  _hover: {
    color: 'white',
    bgColor: 'black',
  },
  _disabled: {
    color: 'white',
    bgColor: '#000000',
    cursor: 'not-allowed',
    opacity: 0.4,
    _hover: {
      bgColor: '#000000!important',
      color: 'white',
    },
  },
  _loading: {
    opacity: 1,
  },
};

const transparent: SystemStyleObject = {
  color: 'white',
  bgColor: 'transparent',
  _hover: {
    color: 'white',
    bgColor: 'transparent',
  },
  _disabled: {
    color: 'white',
    bgColor: 'transparent',
    cursor: 'not-allowed',
    opacity: 0.4,
    _hover: {
      bgColor: 'transparent',
      color: 'white',
    },
  },
  _loading: {
    opacity: 1,
  },
};

const gray: SystemStyleObject = {
  ...dark,
  bgColor: '#313138',
};

const outlineBlue: SystemStyleObject = {
  ...main,
  bgColor: 'transparent',
  border: '1px solid',
  borderColor: 'blueRibbon',
  color: 'blueRibbon',
};

const outlineBlueWhite: SystemStyleObject = {
  ...main,
  bgColor: 'transparent',
  border: '1px solid',
  borderColor: 'blueRibbon',
  color: 'white',
  _disabled: {
    opacity: 0.4,
  },
};

const authNav: SystemStyleObject = {
  bgColor: 'transparent',
  border: '1px solid',
  borderColor: '#23232C',
  _hover: {
    color: '#FFFFFF',
    bgColor: '#000000',
    borderColor: '#23232C',
  },
  _disabled: {
    color: '#333339',
    bgColor: 'transparent',
    cursor: 'not-allowed',
    opacity: 0.4,
    _hover: {
      bgColor: '#000000!important',
      color: 'white',
    },
  },
  _loading: {
    opacity: 1,
  },
};

const medium = defineStyle({
  fontSize: '18px',
  px: '30px',
  py: '10px',
  borderRadius: '30px',
});

const small = defineStyle({
  fontSize: '12px',
  px: '20px',
  py: '6.6px',
  borderRadius: '20px',
});

export const Button: ComponentStyleConfig = {
  baseStyle: {
    color: 'white',
    fontWeight: 400,
    lineHeight: 'normal',
    borderRadius: '30px',
    border: '1px solid',
    borderColor: 'transparent',
    textTransform: 'capitalize',
    fontFamily: 'Proxima-Nova',
  },
  sizes: {
    medium,
    small,
  },
  variants: {
    main,
    dark,
    darkInvert,
    authNav,
    outlineBlue,
    gray,
    outlineBlueWhite,
    transparent,
  },
  defaultProps: {
    variant: 'main',
    size: 'medium',
  },
};
