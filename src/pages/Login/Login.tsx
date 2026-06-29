import Headling from "../../components/Headllinig/Headling";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { PREFIX } from "../../helpers/API";
import axios, { AxiosError } from "axios";
import { useState } from "react";

export type LoginForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
};

export interface LoginResponse {
  access_token: string;
}

export function Login() {
  const [error, setError] = useState<string | null>();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError(null)
    const target = e.target as typeof e.target & LoginForm;
    const { email, password } = target;
    await sendLogin(email.value, password.value);
  };

  const sendLogin = async (email: string, password: string) => {
    try {
      const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
        email,
        password,
      });
      console.log(data);
      localStorage.setItem('jwt', data.access_token);
      navigate('/');
    } catch (e) {
      if (e instanceof AxiosError) {
        setError(e.response?.data.message);
      }
    }
  };

  return (
    <div className={styles["login"]} onSubmit={submit}>
      <Headling>Вход</Headling>
      {error && <div className={styles['error']}>{error}</div>}
      <form className={styles["form"]}>
        <div className={styles["field"]}>
          <label htmlFor="email">Ваш email</label>
          <Input id="email" name="email" placeholder="Email" />
        </div>
        <div className={styles["field"]}>
          <label htmlFor="password">Ваш пароль</label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
          />
        </div>
        <Button appearence="big">Вход</Button>
      </form>
      <div className={styles["links"]}>
        <div>Нет аккаунта?</div>
        <Link to="/auth/register">Зарегистрироваться</Link>
      </div>
    </div>
  );
}
