import { useEffect, useState } from "react";

function EditContactForm(props) {
  const { contacts, setContacts, userToEdit } = props;

  //   const [name, setName] = useState("");
  //   const [lastName, setLastName] = useState("");
  //   const [street, setStreet] = useState("");
  //   const [city, setCity] = useState("");
  //   const [postCode, setPostCode] = useState("");
  //   const [check, setCheck] = useState(false);

  const [userName, setUserName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userStreet, setUserStreet] = useState("");
  const [userCity, setUserCity] = useState("");
  const [userPostCode, setUserPostcode] = useState("");
  const [check, setCheck] = useState(false);

  useEffect(() => {
    if (userToEdit) {
      setUserName(userToEdit.firstName);
      setUserLastName(userToEdit.lastName);
      setUserStreet(userToEdit.address.street);
      setUserCity(userToEdit.address.city);
      setUserPostcode(userToEdit.address.postCode);
      setCheck(userToEdit.check);
    }
  }, [userToEdit]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const userToUpdate = {
      userName,
      userLastName,
      //   userStreet,
      //   userCity,
      //   userPostCode,
      check,
    };

    const fetchOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userToUpdate),
    };

    fetch(`http://localhost:3030/contacts/${userToEdit.id}`, fetchOptions)
      .then((res) => res.json())
      .then((updatedUser) => {
        console.log("users PUT request: ", updatedUser);

        const updatedUsers = users.map((user) => {
          if (user.id === updatedUser.id) {
            return {
              ...updatedUser,
            };
          } else {
            return user;
          }
        });

        setUsers(updatedUsers);
      });
  };

  const handleUserNameInput = (event) => {
    setUserName(event.target.value);
  };
  const handleUserLastNameInput = (event) => {
    setUserLastName(event.target.value);
  };
  const handleStreetInput = (event) => {
    setUserStreet(event.target.value);
  };
  const handleCityInput = (event) => {
    setUserCity(event.target.value);
  };
  const handlePostCodeInput = (event) => {
    setUserPostCode(event.target.value);
  };
  const handleCheckbox = (event) => {
    setCheck(event.target.checked);
  };

  return (
    <form
      className="form-stack light-shadow center contact-form"
      //   onSubmit={handleSubmit}
    >
      <h1>Edit Contact</h1>
      <label for="first-name-input">First Name:</label>
      <input
        id="first-name-input"
        name="first-name-input"
        type="text"
        value={userName}
        onChange={handleUserNameInput}
      />
      <label for="last-name-input">Last Name:</label>
      <input
        id="last-name-input"
        name="last-name-input"
        type="text"
        value={userLastName}
        onChange={handleUserNameInput}
      />
      <label for="street-input">Street:</label>
      <input
        id="street-input"
        name="street-input"
        type="text"
        value={userStreet}
        onChange={handleUserNameInput}
      />
      <label for="city-input">City:</label>
      <input
        id="city-input"
        name="city-input"
        type="text"
        value={userCity}
        onChange={handleUserNameInput}
      />
      <label for="post-code-input">Post Code:</label>
      <input
        id="post-code-input"
        name="post-code-input"
        type="text"
        value={userPostCode}
        onChange={handleUserNameInput}
      />
      <div className="checkbox-section">
        <input
          id="block-checkbox"
          name="block-checkbox"
          type="checkbox"
          value={check}
          onChange={handleUserNameInput}
        />
        <label for="block-checkbox">Block</label>
      </div>
      <div className="actions-section">
        <button className="button blue" type="submit">
          Save
        </button>
      </div>
    </form>
  );
}

export default EditContactForm;
