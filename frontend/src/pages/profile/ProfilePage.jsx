import React from "react";
import profileImg from "../../assets/profile1.png";

export const ProfilePage = () => {
  return (
    <div className="w-screen">
      <div className=" w-full justify-center  flex">
        <img className="w-1/3 mt-10 rounded-lg " src={profileImg} alt=""></img>
      </div>
      <div>
        1. userId 2. userType 3. userName 4. userPassword 5. userRoles 6.
        userPhone 7. userEmail
      </div>
    </div>
  );
};
