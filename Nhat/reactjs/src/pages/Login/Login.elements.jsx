import { Container, styled } from '@mui/material';
import { defaultSectionMargin, theme } from '../../GlobalMUI';

export const LoginWrapper = styled('div')({
  marginBottom: theme.spacing(defaultSectionMargin),
  paddingTop: theme.spacing(defaultSectionMargin),
  minHeight: '70vh',
});

export const LoginContainer = styled(Container)({});
