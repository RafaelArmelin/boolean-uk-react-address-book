function ContactsList(props) {
  const { contacts, hideForm, setHideForm, setUserToEdit } = props;

  return (
    <aside className="contacts-section light-shadow">
      <header>
        <h2>Contacts</h2>
        <button
          onClick={() => setHideForm(!hideForm)}
          className="button new-contact-btn"
        >
          {hideForm ? "Create" : "Cancel"}
        </button>
      </header>
      <ul>
        {contacts.map((contact, index) => {
          const { firstName, lastName, address } = contact;

          return (
            <li key={index}>
              <h3>
                {firstName} {lastName}
              </h3>
              <button className="button" className="button new-contact-btn">
                {" "}
                View
              </button>

              <button
                className="button"
                className="button new-contact-btn"
                onClick={() => {
                  setUserToEdit(contact);
                }}
              >
                Edit{" "}
              </button>

              <p>
                {address.street}, {address.postCode}
              </p>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export default ContactsList;
