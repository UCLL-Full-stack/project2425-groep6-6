import React from "react";

const UserTable: React.FC = () => {
  const users = [
    { username: "jolan", password: "jolan123", role: "customer" },
    { username: "admin", password: "admin123", role: "admin" },
    { username: "chef", password: "chef123", role: "chef" },
    { username: "bartender", password: "bartender123", role: "bartender" },
  ];

  return (
    <table className="table-auto border-collapse border border-gray-500 w-full mt-4">
      <thead>
        <tr>
          <th className="border border-gray-500 px-4 py-2">Username</th>
          <th className="border border-gray-500 px-4 py-2">Password</th>
          <th className="border border-gray-500 px-4 py-2">Role</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index}>
            <td className="border border-gray-500 px-4 py-2 text-center">
              {user.username}
            </td>
            <td className="border border-gray-500 px-4 py-2 text-center">
              {user.password}
            </td>
            <td className="border border-gray-500 px-4 py-2 text-center">
              {user.role}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
