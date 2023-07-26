import Sidebar from "../sidebar/Sidebar";
import PersonIcon from "./PersonIcon";
import "./Profile.css";

const Profile = (props) => {
  return (
    <div>
      <div className="profileContainer">
        <PersonIcon className="personIcon" />
        <div className="profileText">Email: {props.userEmail}</div>
        <div className="profileText">
          Roles:{" "}
          {props.userRoles.map((role, index) =>
            role
              .substring(5)
              .concat(index < props.userRoles.length - 1 ? ", " : "")
          )}
        </div>
      </div>
      <Sidebar open={false} />
    </div>
  );
};

export default Profile;
