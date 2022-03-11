import { styled, FormControl, Typography } from '@mui/material';
import { theme } from './GlobalMUI';
import { Link } from 'react-router-dom';

export const FormWrapper = styled('form')((props) => ({
  width: 450,
  maxWidth: '100%',
  padding: theme.spacing(3, 5),
  background: props.background || '#fff',
  boxShadow: theme.shadows[3],
  position: 'relative',
  margin: '0 auto',
  borderRadius: theme.shape.borderRadius,
}));

export const FromTitle = styled(Typography)({
  fontSize: 38,
  marginBottom: theme.spacing(2),
  textAlign: 'center',
  lineHeight: 1,
  [theme.breakpoints.down('sm')]: {
    fontSize: 28,
  },
});
export const FromSubtitle = styled(Typography)({
  fontSize: 14,
  marginBottom: theme.spacing(2),
  opacity: 0.8,
  textAlign: 'center',
});
export const FromGroup = styled(FormControl)({
  width: '100%',
});

export const LinkElement = styled(Link)({
  color: theme.palette.primary.main,
  fontWeight: 'bold',
  '&:hover': {
    textDecoration: 'underline',
  },
});

export const BackgroundImage = styled('div')((props) => ({
  background: props.image ? `url(${props.image})` : 'transparent',
  backgroundSize: 'cover',
  position: 'fixed',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  pointerEvents: 'none',
  zIndex: -1,
}));

export const BackgroundOverlay = styled('div')({
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0,0,0,.5)',
});

export const Paragraphy = styled(Typography)({
  lineHeight: 1.78,
});
