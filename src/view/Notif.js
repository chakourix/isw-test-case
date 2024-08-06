import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";

export function Notif(show = false) {
  // const [show, setShow] = useState(true);

  if (show) {
    setTimeout(() => {
      show = false;
    }, 1500);
    return (
      <Alert
        className="alert"
        key={"success"}
        variant={"success"}
        onClose={() => setShow(false)}
        dismissible
      >
        Sucessfully Deleted
      </Alert>
    );
  }
}
