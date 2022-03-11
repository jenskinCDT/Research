import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Box,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  FormHelperText,
} from '@mui/material';
import React, { useState } from 'react';
import { FormWrapper, FromGroup, FromSubtitle, FromTitle } from '../../GlobalElements';
import { theme } from '../../GlobalMUI';
import { LoginContainer, LoginWrapper } from './Login.elements';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Navigate, useLocation } from 'react-router';
const schema = yup
  .object({
    email: yup.string().email('Địa chỉ email không hợp lệ').required('Vui lòng nhập email'),
    password: yup.string().required('Vui lòng nhập mật khẩu').min(6, 'Mật khẩu tối thiểu 6 kí tự'),
  })
  .required();

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { search } = useLocation();
  //const dispatch = useDispatch();
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // const error = useSelector((state) => state.auth.isError);
  const isAuthenticated = false;
  const error = false;

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const mouseDownHandler = (event) => {
    event.preventDefault();
  };
  const showPasswordHandler = () => {
    setShowPassword((prevState) => !prevState);
  };
  const onSubmit = (data) => {};
  if (isAuthenticated) {
    var backUrl = new URLSearchParams(search).get('backUrl') || '/';
    return <Navigate to={backUrl} />;
  }
  return (
    <div>
      <LoginWrapper>
        <LoginContainer>
          <FormWrapper onSubmit={handleSubmit(onSubmit)}>
            <FromTitle>Đăng Nhập</FromTitle>
            <FromSubtitle>Đăng nhập tài khoản keycloak</FromSubtitle>
            <FromGroup fullWidth margin="normal">
              <Controller
                name="username"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="text"
                    error={!!errors.email}
                    label="Tài khoản"
                    helperText={errors.email ? errors.email.message : ''}
                    fullWidth
                    autoFocus
                  />
                )}></Controller>
            </FromGroup>
            <FromGroup fullWidth margin="normal" error={!!errors.password}>
              <InputLabel htmlFor="password">Mật khẩu</InputLabel>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <OutlinedInput
                    {...field}
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={showPasswordHandler}
                          onMouseDown={mouseDownHandler}
                          edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                )}></Controller>
              <FormHelperText color="secondary">{errors.password?.message}</FormHelperText>
            </FromGroup>
            {error && (
              <Box>
                <FormHelperText error>Email hoặc mật khẩu không hợp lệ</FormHelperText>
              </Box>
            )}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: theme.spacing(3),
              }}>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="GHI NHỚ"
                sx={{
                  span: {
                    fontSize: {
                      xs: 12,
                      md: 14,
                    },

                    fontWeight: 600,
                  },
                }}
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              disabled={
                !!errors.email ||
                !!errors.password ||
                getValues('email')?.length === 0 ||
                getValues('password')?.length === 0
              }>
              Đăng Nhập
            </Button>
          </FormWrapper>
        </LoginContainer>
      </LoginWrapper>
    </div>
  );
}

export default Login;
