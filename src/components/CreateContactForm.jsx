import { useState } from "react";

function CreateContactForm(props) {
  const { contacts, setContacts } = props;

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState("");
  const [check, setCheck] = useState(false);

  const handleUserNameInput = (e) => {
    setName(e.target.value);
  };
  const handleUserLastNameInput = (e) => {
    setLastName(e.target.value);
  };
  const handleStreetInput = (e) => {
    setStreet(e.target.value);
  };
  const handleCityInput = (e) => {
    setCity(e.target.value);
  };
  const handlePostCodeInput = (e) => {
    setPostCode(e.target.value);
  };
  const handleCheckbox = (e) => {
    setCheck(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const contactAdress = {
      street: street,
      city: city,
      postCode: postCode,
    };

    const fetchOptionsAddress = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactAdress),
    };

    fetch("http://localhost:3030/addresses", fetchOptionsAddress)
      .then((res) => res.json())
      .then((newAddress) => {
        console.log("Inside POST response", newAddress);

        const contactToCreate = {
          firstName: name,
          lastName: lastName,
          blockContact: check,
          addressId: newAddress.id,
        };

        const fetchOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contactToCreate),
        };

        fetch("http://localhost:3030/contacts", fetchOptions)
          .then((res) => res.json())
          .then((newUser) => {
            console.log("Inside POST response", newUser);

            const contactToAdd = {
              ...newUser,
              address: newAddress,
            };

            setContacts([...contacts, contactToAdd]);
          });
      });
  };

  return (
    <form
      className="form-stack light-shadow center contact-form"
      onSubmit={handleSubmit}
    >
      <h1>Create Contact</h1>
      <label htmlFor="first-name-input">First Name:</label>
      <input
        id="first-name-input"
        name="first-name-input"
        type="text"
        onChange={handleUserNameInput}
        value={name}
      />
      <label htmlFor="last-name-input">Last Name:</label>
      <input
        id="last-name-input"
        name="last-name-input"
        type="text"
        onChange={handleUserLastNameInput}
        value={lastName}
      />
      <label htmlFor="street-input">Street:</label>
      <input
        id="street-input"
        name="street-input"
        type="text"
        onChange={handleStreetInput}
        value={street}
      />
      <label htmlFor="city-input">City:</label>
      <input
        id="city-input"
        name="city-input"
        type="text"
        onChange={handleCityInput}
        value={city}
      />
      <label htmlFor="post-code-input">Post Code:</label>
      <input
        id="post-code-input"
        name="post-code-input"
        type="text"
        onChange={handlePostCodeInput}
        value={postCode}
      />
      <div className="checkbox-section">
        <input
          id="block-checkbox"
          name="block-checkbox"
          type="checkbox"
          onChange={handleCheckbox}
          checked={check}
        />
        <label htmlFor="block-checkbox">Block</label>
      </div>
      <div className="actions-section">
        <button className="button blue" type="submit">
          Create
        </button>
      </div>
    </form>
  );
}

export default CreateContactForm;
