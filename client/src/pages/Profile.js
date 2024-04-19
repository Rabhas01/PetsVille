import React from 'react';
import { useState, useEffect } from "react";
import Nav from "../components/Nav";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState({
    pet_name: "",
    species: "",
    size: "",
    breed: "",
    age: "",
    picture: "",
  });

  useEffect(() => {
    const fetchProfilesResponse = async () => {
      try {
        const axiosRes = await axios.get(
          "http://localhost:3002/profiles?searchType=location"
        );
        axiosRes.data.sort((a, b) => a.distance - b.distance);
        setProfiles(axiosRes.data);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    fetchProfilesResponse();
  }, []);

  useEffect(() => {
    const userObj = profiles.find(user => user.user_id === sessionStorage.getItem("USER_ID"));
    if (userObj) {
      setData({
        pet_name: userObj.pet_name,
        species: userObj.species,
        size: userObj.size,
        breed: userObj.breed,
        age: userObj.age,
        picture: userObj.picture,
      });
    }
  }, [profiles]);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const dataToSend = { ...data, user_id: sessionStorage.getItem("USER_ID") };
      await axios.post("http://localhost:3002/profiles/update", dataToSend);
      await navigate("/Home");
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onEdit = (e) => {
    e.preventDefault();
    setEdit(!edit);
  };

  const uploadImage = async (files) => {
    try {
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("upload_preset", "vjuxaevv");
      const response = await axios.post("https://api.cloudinary.com/v1_1/petsville-1/image/upload", formData);
      setData((prevData) => ({
        ...prevData,
        picture: response.data.url,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Nav minimal={true} setShowModal={() => {}} showModal={false} />
      <div className="edit-form">
        <form className="form-box" onSubmit={onSubmit}>
          <section>
            <h3 className="header">{edit ? "Edit Profile" : "Profile"}</h3>

            {!edit && (
              <>
                <div className="profile-display">
                  <div>
                    <img
                      src={data.picture}
                      alt="owners dog pic"
                      width="100px"
                      height="100px"
                    />
                  </div>
                  <div>Name: {data.pet_name} </div>
                  <div>Species: {data.species} </div>
                  <div>Size: {data.size} </div>
                  <div>Breed: {data.breed} </div>
                  <div>Age: {data.age} </div>
                  <button type="button" className="edit-button" onClick={onEdit}>Edit</button>
                </div>
              </>
            )}

            {edit && (
              <>
                <input
                  id="name"
                  type="text"
                  name="pet_name"
                  placeholder="Name"
                  value={data.pet_name}
                  onChange={onChange}
                  required
                />
                <br />
                <select className="species" name="species" value={data.species} onChange={onChange}>
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                  <option value="Hamster">Hamster</option>
                  <option value="Snake">Snake</option>
                </select>
                <br />
                <select className="size" name="size" value={data.size} onChange={onChange}>
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                </select>
                <br />
                <input
                  type="text"
                  name="breed"
                  placeholder="Breed"
                  value={data.breed}
                  onChange={onChange}
                  required
                />
                <br />
                <input
                  id="age"
                  type="number"
                  name="age"
                  placeholder="Age"
                  value={data.age}
                  onChange={onChange}
                  required
                />
                <br />
                <label htmlFor="uploads">Choose an image you want to upload:</label>
                <input
                  type="file"
                  name="picture"
                  onChange={(event) => uploadImage(event.target.files)}
                />
                <div className="buttons">
                  <button className="update-button" type="submit">Update</button>
                  <button type="button" className="cancel-button" onClick={onEdit}>Cancel</button>
                </div>
              </>
            )}
          </section>
        </form>
      </div>
    </>
  );
};

export default Profile;
