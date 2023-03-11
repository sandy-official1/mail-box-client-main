import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, ListGroup, Modal } from "react-bootstrap";

const Inbox = () => {
  const email = localStorage.getItem("email");
  const sanitizedEmail = email.replace(/[@.]/g, "");

  const [messages, setMessages] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);

  const setIsReadToTrue = () => {
    const key = localStorage.getItem("key which is clicked");
    axios
      .patch(
        `https://mail-box-f2b8c-default-rtdb.firebaseio.com/${sanitizedEmail}/inbox/${key}.json`,
        { read: true }
      )
      .then((response) => {
        console.log("Todo updated successfully:", response.data);
      })
      .catch((error) => {
        console.log("Error updating todo:", error);
      });
  };

  const setKeyToLocalStorege = (key) => {
    localStorage.setItem("key which is clicked", key);
    setIsReadToTrue();
    setSelectedEmail(messages[key]);
  };

  const deleteEmail = (key) => {
    axios
      .delete(
        `https://mail-box-f2b8c-default-rtdb.firebaseio.com/${sanitizedEmail}/inbox/${key}.json`
      )
      .then((response) => {
        console.log("Email deleted successfully:", response.data);
        const updatedMessages = { ...messages };
        delete updatedMessages[key];
        setMessages(updatedMessages);
      })
      .catch((error) => {
        console.log("Error deleting email:", error);
      });
  };

  useEffect(() => {
    const fetchMessages = () => {
      axios
        .get(
          `https://mail-box-f2b8c-default-rtdb.firebaseio.com/${sanitizedEmail}/inbox.json`
        )
        .then((response) => {
          console.log(
            `logging from local inbox ${JSON.stringify(response.data)}`
          );

          if (response.data) {
            setMessages(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const intervalId = setInterval(fetchMessages, 500); // fetch messages every 2 seconds

    // Cleanup function to clear the interval when the component unmounts or when the dependency array changes
    return () => clearInterval(intervalId);
  }, [sanitizedEmail, deleteEmail, setKeyToLocalStorege]);

  const handleClose = () => {
    setSelectedEmail(null);
  };

  const countUnreadMessages = Object.values(messages).reduce(
    (count, message) => {
      if (message.read === false) {
        return count + 1;
      }
      return count;
    },
    0
  );

  //   console.log(`There are ${countUnreadMessages} unread messages.`);

  return (
    <div>
      <h3>Inbox {`There are ${countUnreadMessages} unread messages.`}</h3>
      <Card className="text-left">
        <ListGroup variant="flush">
          {Object.keys(messages)
            .reverse()
            .map((key, index) => (
              <ListGroup.Item key={key}>
                <div onClick={() => setKeyToLocalStorege(key)}>
                  {!messages[key].read && (
                    <span
                      style={{
                        display: "inline-block",
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor: "blue",
                        marginRight: "5px",
                      }}
                    ></span>
                  )}
                  {`${messages[key].from}: ${messages[key].subject} - ${messages[key].content} ${messages[key].read}`}
                </div>
                <button
                  style={{ marginLeft: "auto" }}
                  onClick={() => deleteEmail(key)}
                >
                  Delete
                </button>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Card>
      <Modal show={selectedEmail !== null} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Email Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>From: </strong>
            {selectedEmail && selectedEmail.from}
          </p>
          <p>
            <strong>Subject: </strong>
            {selectedEmail && selectedEmail.subject}
          </p>
          <p>
            <strong>Content: </strong>
            {selectedEmail && selectedEmail.content}
          </p>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Inbox;
