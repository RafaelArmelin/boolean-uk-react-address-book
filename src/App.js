import { useEffect, useState } from "react";
import ContactsList from "./components/ContactsList";
import CreateContactForm from "./components/CreateContactForm";
import "./styles.css";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [hideForm, setHideForm] = useState(true);
  console.log("state: ", contacts);

  // [TODO] Write a useEffect to fetch contacts here...

  useEffect(() => {
    const url = "http://localhost:3030/contacts";
    console.log(url);

    fetch(url)
      .then((res) => res.json())
      .then((allContacts) => {
        console.log("inside contacts fetch: ", allContacts);

        setContacts(allContacts);
      });
  }, []);

  return (
    <>
      <ContactsList
        contacts={contacts}
        hideForm={hideForm}
        setHideForm={setHideForm}
      />
      <main>
        {!hideForm && (
          <CreateContactForm contacts={contacts} setContacts={setContacts} />
        )}
      </main>
    </>
  );
}
