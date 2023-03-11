import React, { useState, useRef } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";

const ComposeEmail = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const toRef = useRef();
  const subjectRef = useRef();

  const senderEmail = useSelector((state) => state.auth.userEmail);
  const sanitizedSenderEmail = senderEmail.replace(/[@.]/g, "");

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    // Submit the form data here
    console.log(toRef.current.value);
    const receiverEmail = toRef.current.value;
    const sanitizedReceiverEmail = receiverEmail.replace(/[@.]/g, "");
    const message = {
      to: toRef.current.value,
      subject: subjectRef.current.value,
      content: editorState.getCurrentContent().getPlainText(),
    };
    // sending data to the outbox
    axios
      .post(
        `https://mail-box-f2b8c-default-rtdb.firebaseio.com/${sanitizedSenderEmail}/outbox.json`,
        message
      )
      .then((response) => {
        console.log(response);
        toRef.current.value = "";
        subjectRef.current.value = "";
        setEditorState("");
      })
      .catch((error) => {
        console.log(error);
      });

    //Sending data to inbox of the user
    axios
      .post(
        `https://mail-box-f2b8c-default-rtdb.firebaseio.com/${sanitizedReceiverEmail}/inbox.json`,
        {
          from: toRef.current.value,
          subject: subjectRef.current.value,
          content: editorState.getCurrentContent().getPlainText(),
          read: false,
        }
      )
      .then((response) => {
        console.log(response);
        toRef.current.value = "";
        subjectRef.current.value = "";
        setEditorState("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Form
      onSubmit={onSubmit}
      className="container mt-5"
      style={{ border: "2px solid black" }}
    >
      <h1>Compose Email</h1>
      <Form.Group controlId="to">
        <Form.Label style={{ textAlign: "left" }}>To:</Form.Label>
        <Form.Control type="text" ref={toRef} />
      </Form.Group>
      <Form.Group controlId="subject">
        <Form.Label style={{ textAlign: "left" }}>Subject:</Form.Label>
        <Form.Control type="text" ref={subjectRef} />
      </Form.Group>
      <Form.Group controlId="content">
        <Form.Label style={{ textAlign: "left" }}>Content:</Form.Label>
        <div style={{ boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)" }}>
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={onEditorStateChange}
          />
        </div>
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-3">
        Send
      </Button>
    </Form>
  );
};

export default ComposeEmail;
