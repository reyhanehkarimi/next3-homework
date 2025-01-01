"use client";
import React, { useState, useEffect } from "react";
import UserCard from "../components/UserCard";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const resUsers = await fetch("https://dummyjson.com/users");
        if (!resUsers.ok) throw new Error("Failed to fetch users");
        const usersData = await resUsers.json();
        setUsers(usersData.users);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4 justify-center text-center bg-gradient-to-r from-blue-50 via-white to-blue-50">
      <h1 className="text-2xl font-semibold text-blue-700 ">Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

export default UsersList;
