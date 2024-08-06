import React, { useState, useEffect } from "react";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Notif } from "./Notif";

function MemberItem({ member, onMemberChange }) {
  const styles = {
    width: "50px",
    height: "50px",
  };
  const navigate = useNavigate();

  return (
    <ListGroup.Item
      as="li"
      className="d-flex justify-content-between align-items-start"
    >
      <div>
        <div
          className="mt-2 rounded-circle border d-flex justify-content-center align-items-center"
          style={styles}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            className="bi bi-person-circle"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            <path
              fillRule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
            />
          </svg>
        </div>
      </div>
      <div className="ms-2 me-auto">
        <div className="fw-bold">
          {member.name} {member.isAdmin === "1" ? "(admin)" : ""}
        </div>
        {member.phoneNumber}
        <br></br>
        <small>{member.email}</small>
      </div>
      <Button
        variant="outline-success"
        size="sm"
        className="mt-4 m-1"
        onClick={() => navigate("/member/" + member.id)}
      >
        <FaEye />
      </Button>{" "}
      <Button
        variant="outline-danger"
        size="sm"
        className="mt-4 m-1"
        onClick={() => {
          if (confirm("are you sure you want to delete " + member.name + "?")) {
            axios
              .delete("http://localhost:8000/teams/" + member.id)
              .then((response) => {
                onMemberChange();
              })
              .catch((error) => {
                console.log(error);
              });
          }
        }}
      >
        <MdDelete />
      </Button>
    </ListGroup.Item>
  );
}

export default function TeamMembers() {
  const [members, setMembers] = useState({ count: 0, data: [] });
  const navigate = useNavigate();
  const fetchTeamMembers = () => {
    axios
      .get("http://localhost:8000/teams/")
      .then((response) => {
        setMembers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchTeamMembers();
  }, []);

  return (
    <>
      <div>
        <h1>
          Team Memebers{"  "}
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => navigate("/member/")}
            type="button"
          >
            <IoMdAddCircleOutline />
          </Button>
        </h1>
        <small>You have {members.count} team members</small>
      </div>
      <ListGroup as="ol">
        {members.data.map((el, i) => {
          return <MemberItem key={i} member={el} onMemberChange={(a)=>{
            fetchTeamMembers();
          }}></MemberItem>;
        })}
      </ListGroup>
    </>
  );
}
