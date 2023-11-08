import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UsersView = () => {
  const [users, setUsers] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    loadUsers();
  }, []);

  const handleClcikTable = (id) => {
    navigate(`/user-profile/${id}`);
  };

  const loadUsers = async () => {
    try {
      const result = await axios.get("http://localhost:8080/users");
      console.log(result.data);
      setUsers(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section>
      <h2 className=" text-center">Users</h2>
      <table className="table table-bordered table-hover shadow table-striped">
        <thead>
          <tr className="text-center">
            <th>Name</th>
            <th>Surname</th>
          </tr>
        </thead>

        <tbody className="text-center">
          {users.map((user, index) => {
            return (
              <tr
                key={user.id}
                style={{ cursor: "pointer" }}
                onClick={() => handleClcikTable(user.id)}
              >
                <td>{user.name}</td>
                <td>{user.surname}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default UsersView;
