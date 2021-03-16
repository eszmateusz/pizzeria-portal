import React from 'react';
import {NavLink} from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import styles from './Login.module.scss';

const Login = () => (
  <div className={styles.component}>
    <h2>Login</h2>
    <hr />
    <Container maxWidth='lg'>
      <form className={styles.form} noValidate autoComplete='off'>
        <TextField
          className={styles.input}
          id="outlined-secondary"
          label="Login"
          variant="outlined"
          color="secondary"
        />
        <TextField
          className={styles.input}
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          color="secondary"
        />
        <Button className={styles.button} size='large' variant="contained" color="secondary" component={NavLink} exact to={`${process.env.PUBLIC_URL}/`}>
          Login
        </Button>
      </form>
    </Container>
  </div>
);

export default Login;