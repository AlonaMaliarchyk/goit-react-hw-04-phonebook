import {useState, useEffect} from "react";
import ContactsState from "./ContactsState.js"
import ContactList from "./ContactList";
import ContactForm from "./ContactForm";
import Filter from './FilterContacts';
import { nanoid } from 'nanoid';
import css from './App.module.css';
const myContacts = 'contacts';
  const App = () => { 
    const [contacts, setContacts] = useState(() => {
      const contacts = JSON.parse(localStorage.getItem(myContacts));
      return contacts? contacts : ContactsState.contacts;
  });
    const [filter, setFilter] = useState("");
    
    useEffect(() => {
    localStorage.setItem(myContacts, JSON.stringify(contacts));
  }, [contacts]);
    
  const formSubmitHandl = (data) => {
    const { name, number } = data;
    const isExists = contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase());
    
    if (isExists) {
      alert(name + ' is alredy in contacts');
      return;
    }

    setContacts(prevContacts => {
      const newContacts = {
        id: nanoid(),
        name: name,
        number: number,
      }
      return [newContacts, ...prevContacts]
    });
  }
    
  const deleteContact = id => {
    setContacts(prevContacts=> prevContacts.filter(contact => 
        contact.id !== id
    ));
  }

  const handelFilter = (value) => {
    setFilter(prevFilter => (value));
  }
    
  const getFiltered = () => {
    if (!filter) {
    return contacts;
    }
    
    return contacts.filter((contact) => 
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }

  return (
    <div className={css.wrap}>
      <h1>Phonebook</h1>
        <ContactForm onSubmit={formSubmitHandl} />
      <h2>Contacts</h2>
      <Filter handelFilter={handelFilter} />
      <ContactList contacts={getFiltered()} deleteHandler={deleteContact} />
      </div>
  );
}

export default App;