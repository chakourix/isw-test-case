import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function Member() {
  const [member, setMember] = useState({});
  const [validated, setValidated] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  if (id) {
    useEffect(() => {
      axios
        .get("http://localhost:8000/teams/" + id)
        .then((response) => {
          setMember(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  }
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    event.preventDefault();
    event.stopPropagation();

    setValidated(true);
    // console.log(event.target);
    let teamMember = {
      name: event.target.name.value,
      email: event.target.email.value,
      phoneNumber: event.target.phoneNumber.value,
      isAdmin: event.target.isAdmin.value,
    };
    if (!id) {
      axios
        .post("http://localhost:8000/teams/", teamMember)
        .then((response) => {
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .put("http://localhost:8000/teams/" + id, teamMember)
        .then((response) => {
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const handleChange = (e) => {
    // console.log({[e.target.name] : e.target.value})
    setMember([e.target.name] = e.target.value);
  };
  const handleRoleChange = (e) => {
    console.log({'isAdmin' : e.target.value})
    setMember({'isAdmin' : e.target.value});
  };
  return (
    <div className="m-4">
      <Button
        size="sm"
        variant="outline-dark"
        onClick={() => {
          navigate("/");
        }}
      >
        Back
      </Button>

      <h2>Welcome {member.name}</h2>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        method="post"
      >
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={member.name}
            required
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={member.email}
            placeholder="name@example.com"
            onChange={handleChange}
            name="email"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="number"
            placeholder="xxx xxx xxxx"
            name="phoneNumber"
            value={member.phoneNumber}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.email">
          <Form.Label>Role</Form.Label>
          <div key={`default-radio`} className="mb-3">
            <Form.Check // prettier-ignore
              type="radio"
              inline
              id="1"
              name="isAdmin"
              value={1}
              checked={'1' == member.isAdmin}
              onChange={handleRoleChange}
              label={`Admin - Can delete members`}
            />

            <Form.Check
              type="radio"
              inline
              id="0"
              value={0}
              checked={'1' != member.isAdmin}
              onChange={handleRoleChange}
              label={`Regular - Can't delete members`}
              name="isAdmin"
            />
          </div>
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}
