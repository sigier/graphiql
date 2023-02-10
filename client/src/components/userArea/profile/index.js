import React from "react";
import UserArea from "../../hoc/userArea";
import Stats from "./stats";

const Profile = (props) => {
    return(
        <UserArea>
            <Stats {...props}></Stats>
        </UserArea>
    )
}

export default Profile;