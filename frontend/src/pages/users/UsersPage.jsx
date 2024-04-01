import * as React from "react";
import UserCard from "./UserCard";

import { UserForm } from "./UserForm";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUsers } from "../../redux/slices/usersSlice";
import { useEffect } from "react";

export const UsersPage = () => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.users);
  const users = data.data;

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className="w-screen flex">
      <div className=" w-1/4 p-5">
        <UserForm update={0}/>
      </div>
      <div className=" w-3/4 p-5">
        {users.map((value) => {
          return (
            <div className=" w-full mb-1 pr-3">
              <UserCard users={value} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
