import React, { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loginIdRef = useRef(null);
  const passwordRef = useRef(null);

  const ForgotPasswordHandler = () => {
    alert("you may have received an email with reset link");
    console.log(loginIdRef.current.value);

    {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC8eZWh_NRF0g1lmY3rubk_SzYAhR_fo3g",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: loginIdRef.current.value,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (res.ok) {
            console.log("Password reset succesfullly");
            console.log(res);
            return res.json();
          } else {
            return res.json().then((data) => {
              console.log(data);
              let errorMessage = "Email not able to sent for reset password";
              if (data && data.error && data.error.message) {
                errorMessage = data.error.message;
              }
              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const loginId = loginIdRef.current.value;
    const password = passwordRef.current.value;
    // Handle form submission logic

    if (loginId === "" || password === "") {
      alert("please enter both email and password");
      return;
    } else {
      {
        fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC8eZWh_NRF0g1lmY3rubk_SzYAhR_fo3g",
          {
            method: "POST",
            body: JSON.stringify({
              email: loginId,
              password: password,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => {
            if (res.ok) {
              console.log("Login succesfullly");
              // alert("Login succesful");
              console.log(res);

              return res.json();
            } else {
              return res.json().then((data) => {
                console.log(data);
                let errorMessage = "Authrntication filed!";
                if (data && data.error && data.error.message) {
                  errorMessage = data.error.message;
                }
                throw new Error(errorMessage);
              });
            }
          })
          .then((data) => {
            console.log(data);
            //   dispatch(authActions.login({token:data.idToken, email:data.email}));
            console.log(data.idToken);
            dispatch(
              authActions.login({ token: data.idToken, email: data.email })
            );

            alert("welcome to your mail box");

            history.push("/inbox");
          })
          .catch((err) => {
            alert(err.message);
          });
      }
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className="container mt-3">
        <h1 className="text-center">Sign In</h1>
        <Form.Group controlId="formLoginId">
          <Form.Label>Login ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter login ID"
            ref={loginIdRef}
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            ref={passwordRef}
          />
        </Form.Group>

        <div className="text-center">
          <Button type="submit" className="mt-2">
            Login
          </Button>
          <p className="text-muted">
            Forgot password??{" "}
            <span
              onClick={ForgotPasswordHandler}
              style={{ textDecoration: "underline", cursor: "pointer" }}
            >
              Click Here
            </span>
          </p>
        </div>
      </Form>
    </>
  );
};

export default Login;
