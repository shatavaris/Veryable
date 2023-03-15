import React from "react";
import {useState} from "react";
import "./App.css";
import usersData from "./users.json";
//Import the icons
import { ReactComponent as ExpandLessIcon} from '../src/icons/expand_less.svg';
import { ReactComponent as ExpandMoreIcon} from './icons/expand_more.svg';
import { ReactComponent as UserIcon } from './icons/user.svg';
import { ReactComponent as GroupIcon } from '../src/icons/group.svg';

const UserList = () => {
  const [expandedUser, setExpandedUser] = useState(null); //For expanding the boxes
  const [selectedRole, setSelectedRole] = useState(""); //For the filtering

  //If there are no users in the users.json file
  if (usersData.length === 0) 
  {
    return <div> 
        <div className="header" style={{width: "100%", height: "64px"}}>
          <GroupIcon src={GroupIcon} alt="Users" style={{ fill: "#2081C3" , height: "60%", padding: 0}} />
          <p-nav>USERS</p-nav>
        </div>
        <div className="error_box"> Error: There are no users to show. </div>
    </div>
  }
  
  //For expanding the box
  const handleUserClick = (user) => {
    setExpandedUser(user.id === expandedUser?.id ? null : user);
  };

  //For the
  const filteredUsers = selectedRole
    ? usersData.filter((user) => user.role === selectedRole)
    : usersData;

  const roleOptions = [
    { value: "", label: "All roles" },
    { value: "Administrator", label: "Administrator" },
    { value: "User", label: "User" },
    { value: "Viewer", label: "Viewer" },
  ];

  //To format dates and phone number
  usersData.map((user)=> {
    let new_createdAt = new Date(user.createdAt);
    user.createdAt = new_createdAt.toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'});
    user.createdAt = user.createdAt.replace(/,/g, '');

    let new_lastLoggedIn = new Date(user.lastLoggedIn);
    user.lastLoggedIn = new_lastLoggedIn.toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'});
    user.lastLoggedIn = user.lastLoggedIn.replace(/,/g, '');

    let match = user.phone.match(/^(\d{3})(\d{3})(\d{4})$/);
    if(match)
    {
      user.phone = '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }

    return null

  });
  
  return (
    <div className="user-box">
      <div className="header" style={{width: "800px", height: "64px", display: "flex", }}>
        <GroupIcon src={GroupIcon} alt="Users" style={{ fill: "#2081C3" , height: "60%", padding: 0}} />
        <p-nav>USERS</p-nav>
        <div className="filter-container">
          <select
            id="role-filter"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            style={{position: "absolute", right: 350, top: 35}}
          >
            {roleOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredUsers.map((user) => (
        // let created_date = new Date(user.createdAt);
        <div key={user.id} onClick={() => handleUserClick(user)}>
          <div className="user-info">
            <div class="svgBox">
              <UserIcon
                src={UserIcon}
                alt={user.role}
                style={
                  user.role === "Administrator" //If the user is an Administrator
                    ? { fill: "#2081C3", width: "70px", height: "100%", padding: 0 }
                    : user.role === "User" //If the user is an user
                    ? { fill: "#68AAAB", width: "70px", height: "100%", padding: 0}
                    : user.role === "Viewer" //If the user is a Viewer
                    ? { fill: "#7E7E7E", width: "70px", height: "100%", padding: 0 }
                    //If the user happens to be something else, this is the deault color.
                    : { fill: "#7d73d7", width: "70px", height: "100%", padding: 0 }
                }
              />  
            </div>

            <div className="InfoName">
            {user.firstName || user.lastName ?
              <p-user_name>{`${user.firstName ? user.firstName : ''} ${user.lastName ? user.lastName : ''}`}</p-user_name>
              :
              <p-user_name>{"Name not available."}</p-user_name>
            }
            <br />
            {user.role ?
              <p-job>{user.role}</p-job>
              :
              <p-job>{"User's role not available."}</p-job>
            }
            <br />
            {user.email ?
              <p-email>{`${user.email} \n`}</p-email>
              :
              <p-email>{"Email not available."}</p-email>
            }
              {user.id === expandedUser?.id ? (
                <>
                  <br />
                  <br />
                  {user.street || user.city || user.state || user.zip ?
                    <>
                      <p-detail_header>{"Address" }</p-detail_header>
                      <p-user_info>
                        {user.street ? `${user.street}, ` : ''}
                        {user.city ? `${user.city}, ` : ''}
                        {user.state ? `${user.state} ` : ''}
                        {user.zip ? user.zip : ''}
                      </p-user_info>
                      <br />
                    </>
                    :
                    <>
                      <p-detail_header>{"Address" }</p-detail_header>
                      <p-user_info>{"Address not available"}</p-user_info>
                      <br />
                    </>
                  }
                  <>
                    <p-detail_header>{"Phone" }</p-detail_header>
                    {user.phone ? <p-user_info>{user.phone}</p-user_info> : <p-user_info>{"Phone number not available."}</p-user_info>}
                    <br />
                  </>
                  <>
                    <p-detail_header>{"Created At " }</p-detail_header>
                    {user.createdAt ? <p-user_info>{user.createdAt}</p-user_info> : <p-user_info>{"This information is not available."}</p-user_info>}
                    <br />
                  </>
                  <>
                    <p-detail_header>{"Last Logged In" }</p-detail_header>
                    {user.lastLoggedIn ? <p-user_info>{user.lastLoggedIn}</p-user_info> : <p-user_info>{"This information is not available."}</p-user_info>}
                    <br />
                  </>
                </>
              ) : null}
            </div>

            <div className="expand-icon-container">
              {user.id === expandedUser?.id ? (
                <ExpandLessIcon src={ExpandLessIcon} alt="Collapse" style = {{fill: "#7E7E7E"}} />
              ) : (
                <ExpandMoreIcon src={ExpandMoreIcon} alt="Expand" style = {{fill: "#7E7E7E"}} />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;