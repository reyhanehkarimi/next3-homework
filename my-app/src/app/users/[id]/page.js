"use client";
import React, { useEffect, useState } from "react";

export default function UserDetail({ params }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/users/${params.id}`);
        if (!res.ok) throw new Error("Failed to fetch user details");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [params.id]);

  if (loading) 
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 via-white to-blue-50">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );

  if (error) 
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 via-white to-blue-50">
        <p className="text-lg text-red-600">Error: {error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-50 p-8 flex items-center justify-center">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:scale-105">
        <div className="text-center mb-6">
          <div className="inline-block mb-4">
            <img
              className="h-24 w-24 rounded-full border-4 border-white shadow-md"
              src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`}
              alt={`${user.firstName} ${user.lastName}`}
            />
          </div>
          <h1 className="text-3xl font-semibold text-gray-800 mb-2">{user.firstName} {user.lastName}</h1>
          <p className="text-lg text-gray-600">Email: {user.email}</p>
        </div>

        <div className="text-center  text-gray-700">
          <p className="mb-2"><span className="font-bold">Phone:</span> {user.phone}</p>
          <p className="mb-2"><span className="font-bold">Age:</span> {user.age}</p>
          <p className="mb-2">
            <span className="font-bold">Address:</span> {user.address.address}, {user.address.city}, {user.address.state}
          </p>
          <p className="mb-2"><span className="font-bold">Company:</span> {user.company.name}</p>
        </div>

        <div className="text-center mt-6">
          <button
            className=" w-full py-2 px-4 bg-blue-900
             text-white font-bold rounded-lg hover:bg-blue-800 transition duration-300"
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
