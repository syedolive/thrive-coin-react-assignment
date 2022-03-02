import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../../api/api";
import Alert from "../../components/Alert";
import ValidationError from "../../components/ValidationError";
import { validateLogin } from "../../helper/validation";
import { AlertInterface } from "../../lib/AlertInterface";
import { Credentials } from "../../lib/Credentials";
import { LoginDataInterface } from "../../lib/LoginData";
import { LoginValidation } from "../../lib/LoginValidation";
import { useUserContext } from "../../stores/user.store";
const Login: React.FC = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
  });
  const [validationErrors, setValidationErrors] =
    useState<null | LoginValidation>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertInterface | null>(null);
  const timerRef = useRef<any>(null);
  const {createSession} = useUserContext();
  const navigate = useNavigate();
  useEffect(() => {
    return () => {
        clearTimeout(timerRef.current);
    }
  }, []);
  const _onFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const { email, password } = credentials;
    const validation = await validateLogin(email, password);
    if (validation === undefined) {
      const loginData: LoginDataInterface = {
        sign_in: {
          email,
          password,
        },
      };
      setLoading(prevState => !prevState);
      try {
        const { data, status } = await instance({
          url: "users/sign_in",
          method: "POST",
          data: loginData,
        });
        if(status === 200 && data.hasOwnProperty('success') && data.success){
            setAlert({
                type: 'success',
                message: 'You have successfully logged in.'
            });
            const {data: {user}} = data;
            createSession(user);
            timerRef.current = setTimeout(() => {
                navigate('/invitations', {replace: true});
            }, 2000);
        }
      } catch (e: any) {
        if(e.response.status === 404){
            setAlert({
                type: 'danger',
                message: 'No user found for these credentials.'
            })
        }
      }finally{
        setLoading(prevState => !prevState);
      }
    } else {
      setValidationErrors(validation);
    }

  };
  const _showPassword = (): void => setShowPassword((prevState) => !prevState);
  const _onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };
  return (
    <section className="auth">
      <div className="container-fluid p-0">
        <div className="row no-gutters">
          <div className="col-lg-7 left-side">
            <img src="img/logo.png" alt="logo" />
          </div>
          <div className="col-lg-5 text-center right-side">
            <h2 className="mb-5">Welcome</h2>
            <Alert message={alert?.message} type={alert?.type}/>
            <form onSubmit={_onFormSubmit}>
              <div className="row no-gutters">
                <div className="col-12 mb-4">
                  <div className="input-parent">
                    <i className="fa-regular fa-envelope" />
                    <input
                      type="email"
                      className="auth-input"
                      placeholder="Email"
                      name="email"
                      value={credentials.email}
                      onChange={_onValueChange}
                      required
                    />
                  </div>
                  <ValidationError validationError={validationErrors} field="email"/>
                </div>
                <div className="col-12 mb-4">
                  <div className="input-parent">
                    <i className="fa-solid fa-lock" />
                    <input
                      type={!showPassword ? "password" : "text"}
                      className="auth-input"
                      name="password"
                      value={credentials.password}
                      placeholder="Password"
                      onChange={_onValueChange}
                      required
                    />
                    <button
                      className="password-switch"
                      type="button"
                      id="password_toggle"
                      onClick={_showPassword}
                    >
                      <i
                        className={`fa-solid fa-eye${
                          showPassword ? "-slash" : ""
                        }`}
                      />
                    </button>
                  </div>
                  <ValidationError validationError={validationErrors} field="password"/>
                </div>
                <div className="col-12 mb-4 text-right">
                  <a href="#!" className="color-blue">
                    Forgot Password?
                  </a>
                </div>
                <div className="col-12 mb-4">
                  <button type="submit" className="gradient-button w-100 hc-50">
                    {loading ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
                  </button>
                </div>
                <div className="col-12 mb-4 text-center">
                  <p className="mb-0 small-text">Have no Account yet?</p>
                </div>
                <div className="col-12">
                  <button type="button" className="outline-button w-100 hc-50">
                    Register
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
