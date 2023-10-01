import React from 'react'

function UserDetails({ user }) {
    // const {profiles, username, avatar} = props
    // console.log(profiles);
  return (
    <>
     <div className="right">
          <div className="userDetails">
          <h2 className="userDetailsText">USER DETAILS</h2>
          </div>
          
          <img className="profilePicRight" src="profile_icon.png" />
          <div className="nameContainer">

          <div className="name"><b>@{user.profile.username}</b></div>
          </div>
          
          <div className="description">
          <div className="descriptionText">{user.Bio}</div>
            </div>

            <div className="fullNameContainer">
            <div className="fullName">Full Name</div>
            <div className="fullNameText">{user.profile.firstName + " " + user.profile.lastName}</div>
            </div>

            <div className="jobTitleContainer">
            <div className="jobTitle">Job Title</div>
            <div className="jobTitleText">{user.jobTitle}</div>
            </div>

            <div className="emailContainer">
            <div className="email">Email</div>
            <div className="emailText">{user.profile.email}</div>
            </div>
            
              

        </div>
    </>
  )
}

export default UserDetails
