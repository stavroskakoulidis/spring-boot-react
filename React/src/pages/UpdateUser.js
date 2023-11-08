import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateUser = () => {
  let navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState({
    name: "",
    surname: "",
    gender: "",
    birthdate: "",
    homeAddress: { address: "" },
    workAddress: { address: "" },
  });

  const { name, surname, gender, birthdate, homeAddress, workAddress } = user;

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/users/user/${id}`);
      setUser(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "workAddress" || name === "homeAddress") {
      setUser({ ...user, [name]: { address: value } });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const saveUser = async (e) => {
    e.preventDefault();
    console.log(user);

    const { workAddress, homeAddress } = user;
    if (workAddress && workAddress.address === "") {
      delete user.workAddress;
    }
    if (homeAddress && homeAddress.address === "") {
      delete user.homeAddress;
    }

    try {
      await axios.put(`http://localhost:8080/users/update/${id}`, user);
      navigate("/display-users");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="col-sm-8 py-2 px-5 offset-2 shadow">
      <h2 className="mt-5">Register New User</h2>
      <form onSubmit={(e) => saveUser(e)}>
        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="name">
            Name
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="name"
            id="name"
            required
            value={name}
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
        </div>

        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="surname">
            Surname
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="surname"
            id="surname"
            required
            value={surname}
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
        </div>

        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="gender">
            Gender
          </label>
          <select
            className="form-select"
            name="gender"
            value={gender}
            onChange={(e) => {
              handleInputChange(e);
            }}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="birthdate">
            Birthdate
          </label>
          <input
            type="date"
            className="form-control"
            name="birthdate"
            value={birthdate}
            onChange={(e) => {
              handleInputChange(e);
            }}
            required
          />
        </div>

        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="workAddress">
            Work Address
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="workAddress"
            id="workAddress"
            value={workAddress ? workAddress.address : ""}
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
        </div>

        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="homeAddress">
            Home Address
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="homeAddress"
            id="homeAddress"
            value={homeAddress ? homeAddress.address : ""}
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
        </div>

        <div className="row mb-5">
          <div className="col-sm-2 ">
            <button type="submit" className="btn btn-outline-success btn-lg">
              Save
            </button>
          </div>
          <div className="col-sm-2">
            <Link
              className="btn btn-outline-warning btn-lg"
              to={"/display-users"}
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
