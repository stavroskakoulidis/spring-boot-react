import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    surname: "",
    gender: "",
    birthdate: "",
    homeAddress: { id: "", address: "" },
    workAddress: { id: "", address: "" },
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/users/user/${id}`);
      console.log(result.data);
      setUser(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/users/delete/${id}`);
      navigate("/display-users");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container my-5">
      <div className="card">
        <h5 className="card-header text-center">User Information</h5>
        <div className="card-body">
          <p className="card-text">
            <strong>Name:</strong> {user.name}
          </p>
          <p className="card-text">
            <strong>Surname:</strong> {user.surname}
          </p>
          <p className="card-text">
            <strong>Gender:</strong> {user.gender}
          </p>
          <p className="card-text">
            <strong>Birthdate:</strong> {user.birthdate}
          </p>
          <p className="card-text">
            <strong>Work Address:</strong>{" "}
            {user.workAddress
              ? user.workAddress.address
              : "No Work Address Available"}
          </p>
          <p className="card-text">
            <strong>Home Address:</strong>{" "}
            {user.homeAddress
              ? user.homeAddress.address
              : "No Home Address Available"}
          </p>
          <div className="mt-3 text-center">
            <button
              className="btn btn-primary mx-5"
              onClick={() => navigate(`/update-user/${id}`)}
            >
              Update
            </button>
            <button
              className="btn btn-danger me-3"
              onClick={() => handleDelete(user.id)}
            >
              Delete
            </button>
            <button
              className="btn btn-primary mx-5 btn-warning"
              onClick={() => navigate("/display-users")}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
