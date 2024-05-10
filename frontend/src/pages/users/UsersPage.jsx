import * as React from "react";
import UserCard from "./UserCard";
import { UserForm } from "./UserForm";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../redux/slices/usersSlice";
import { useEffect, useState } from "react";
import { SearchUser } from "./SearchUser";

export const UsersPage = () => {
  const dispatch = useDispatch();

  const usersData = useSelector((state) => state.users);
  const users = usersData.data;

  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    setFilteredUsers(users)
  }, [users]);

  // Callback function to handle filtering of users
  const handleFilterUsers = (searchQuery) => {
    const filtered = users.filter((user) =>
      user.userName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  return (
    <div className="w-screen flex">
      <div className="w-1/4 p-5">
        <UserForm update={0} />
        {/* Pass the filtering function to SearchUser */}
        <SearchUser users={users} onFilterUsers={handleFilterUsers} />
      </div>
      <div className="w-3/4 p-5">
        {/* Render filtered users */}
        {filteredUsers.map((user) => (
          <div key={user.id} className="w-full mb-1 pr-3">
            <UserCard users={user} />
          </div>
        ))}
      </div>
    </div>
  );
};
