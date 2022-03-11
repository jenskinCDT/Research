import { createTheme, Skeleton, styled } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#01579b',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 950,
      lg: 1200,
      xl: 1536,
    },
  },
});

export const defaultPadding = theme.spacing(3);
export const defaultPaddingMobile = theme.spacing(1);

export const defaultColor = '#ddd';
export const SkeletonImage = styled(Skeleton)({
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
});

export const defaultSectionMargin = theme.spacing(8);
export const defaultSectionMarginMobile = theme.spacing(4);
