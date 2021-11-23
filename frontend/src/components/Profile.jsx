import React from "react";
import '../index.css';

const Profile = ({item}) => (
    <div class="profile">
        <div class="title">
            <h2>Your Profile</h2>
        </div>
        <div class="description">
            <img src={item.picture.large} alt="Image" />
            <p>First Name : {item.name.first}</p>
            <p>Last Name : {item.name.last}</p>
            <p>Age : {item.registered.age}</p>
            <p>Email : {item.email}</p>
            <p>Cell Phone : {item.phone}</p>
            <p>Country : {item.location.country}</p>
            <p>City : {item.location.city}</p>
            <p>Postcode : {item.location.postcode}</p>
            <p>Street : {item.location.street.number} {item.location.street.name}</p>
        </div>
    </div>
        );

export default Profile;