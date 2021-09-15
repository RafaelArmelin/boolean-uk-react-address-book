import { useState } from "react";
import ContactsList from "./ContactsList";

function CreateContactForm() {
  // [TODO] Write form handlers here and POST requests here...

  //Creating the Contact State
  const [firstName, setFistName] = useState("");
  const [lastName, setLastName] = useState("");
  const [blockContact, setBlockContact] = useState(false);

  //Creating the Address State
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState("");

  // console.log("CreateContactForm State: ", {
  //   contact: {
  //     firstName,
  //     lastName,
  //     blockContact,
  //   },
  //   address: { street, city, postCode },
  // });
  const handleSubmit = (event) => {
    event.preventDefault();

    const addressToCreate = {
      street,
      city,
      postCode,
    };

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addressToCreate),
    };

    fetch("http://localhost:3030/addresses", fetchOptions)
      .then((res) => res.json())
      .then((newAddress) => {
        // console.log("addresses POST request: ", newAddress);

        const contactToCreate = {
          firstName,
          lastName,
          blockContact,
          addressId: newAddress.id,
        };

        console.log("contact to create: ", contactToCreate);

        const fetchOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contactToCreate),
        };

        fetch(`http://localhost:3030/contacts`, fetchOptions)
          .then((res) => res.json())
          .then((newContact) => {
            console.log("New contact: ", newContact);

            const contactToAdd = {
              ...newContact,
              address: newAddress,
            };
            console.log("contactToAdd: ", contactToAdd);

            setContacts([...ContactsList, contactToAdd]);
          });
      });
  };

  //   const contactToCreate = {
  //     firstName,
  //     lastName,
  //     // addressId: newAddress.id,
  //   };

  //   const addressToCreate = {
  //     street,
  //     city,
  //     postCode,
  //   };

  //   const fetchOptionsTwo = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(addressToCreate),
  //   };

  //   fetch(`http://localhost:3030/addresses`, fetchOptionsTwo)
  //     .then((res) => res.json())
  //     .then((newAddress) => {
  //       console.log(newAddress);
  //     });
  // };

  const handleFistName = (event) => setFistName(event.target.value);
  const handleLastName = (event) => setLastName(event.target.value);
  const handleBlockCheckBox = (event) => setBlockContact(event.target.checked);
  const handleStreet = (event) => setStreet(event.target.value);
  const handleCity = (event) => setCity(event.target.value);
  const handlePostCode = (event) => setPostCode(event.target.value);

  return (
    <form
      className="form-stack light-shadow center contact-form"
      onChange={handleSubmit}
    >
      <h1>Create Contact</h1>
      <label htmlFor="first-name-input">First Name:</label>
      <input
        id="first-name-input"
        name="first-name-input"
        type="text"
        onChange={handleFistName}
      />
      <label htmlFor="last-name-input">Last Name:</label>
      <input
        id="last-name-input"
        name="last-name-input"
        type="text"
        onChange={handleLastName}
      />
      <label htmlFor="street-input">Street:</label>
      <input
        id="street-input"
        name="street-input"
        type="text"
        onChange={handleStreet}
      />
      <label htmlFor="city-input">City:</label>
      <input
        id="city-input"
        name="city-input"
        type="text"
        onChange={handleCity}
      />
      <label htmlFor="post-code-input">Post Code:</label>
      <input
        id="post-code-input"
        name="post-code-input"
        type="text"
        onChange={handlePostCode}
      />
      <div className="checkbox-section">
        <input
          id="block-checkbox"
          name="block-checkbox"
          type="checkbox"
          onChange={handleBlockCheckBox}
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
