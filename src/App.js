import React, { useEffect, useState } from "react";
import ContactsList from "./components/ContactsList";
import CreateContactForm from "./components/CreateContactForm";
import EditContactForm from "./components/EditContactForm";
import "./styles.css";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [hideForm, setHideForm] = useState(true);
  const [userToEdit, setUserToEdit] = useState(null);
  console.log("userToEdit:", userToEdit);

  useEffect(() => {
    const url = `http://localhost:3030/contacts`;
    fetch(url)
      .then((res) => res.json())
      .then((ContactsData) => {
        setContacts(ContactsData);
      });
  }, []);

  return (
    <>
      <ContactsList
        contacts={contacts}
        hideForm={hideForm}
        setHideForm={setHideForm}
        setUserToEdit={setUserToEdit}
      />
      <main>
        {!hideForm && (
          <CreateContactForm contacts={contacts} setContacts={setContacts} />
        )}
        {<EditContactForm userToEdit={userToEdit} />}
      </main>
    </>
  );
}
