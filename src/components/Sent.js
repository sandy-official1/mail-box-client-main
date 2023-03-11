import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Card, ListGroup, Modal } from "react-bootstrap";

const Sent = () => {
  const email = localStorage.getItem("email");
  const sanitizedEmail = email.replace(/[@.]/g, "");

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://mail-box-f2b8c-default-rtdb.firebaseio.com/${sanitizedEmail}/outbox.json`
      )
      .then((response) => {
        console.log(`logging from sent box${JSON.stringify(response.data)}`);

        if (response.data) {
          setMessages(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <div>
        <h3>Inbox</h3>
        <Card className="text-left">
          <ListGroup variant="flush">
            {Object.keys(messages)
              .reverse()
              .map((key, index) => (
                <ListGroup.Item key={key}>
                  <div>
                    {`${messages[key].to}: ${messages[key].subject} - ${messages[key].content}`}
                  </div>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Card>
      </div>
    </div>
  );
};

export default Sent;
