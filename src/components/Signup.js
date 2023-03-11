import React, { useRef } from "react";
import { Form, Button } from "react-bootstrap";

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (!email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    } else if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    } else {
      {
        console.log("succes!!");
        fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC8eZWh_NRF0g1lmY3rubk_SzYAhR_fo3g",
          {
            method: "POST",
            body: JSON.stringify({
              email: email,
              password: password,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).then((res) => {
          if (res.ok) {
            console.log("senAccount created succesfullly");
            alert("Account created succesful");
          } else {
            return res.json().then((data) => {
              // console.log(data);
              let errorMessage = "Authrntication filed!";
              if (data && data.error && data.error.message) {
                errorMessage = data.error.message;
              }
              alert(errorMessage);
            });
          }
        });
      }
    }
  };

  return (
    <div className="container">
      <h1>Signup Form</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" ref={emailRef} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            ref={passwordRef}
          />
        </Form.Group>

        <Form.Group controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            ref={confirmPasswordRef}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Signup;
