import {useState} from "react";
import PropTypes from 'prop-types';
import IniatialState from './initialState.js';
import css from './ContactForm.module.css';

const ContactForm = ({onSubmit})=> {
    const [state, setState] = useState({ ...IniatialState });

    const handlSubmit = event => {
        event.preventDefault();
        onSubmit({ name, number });
        setState({ ...IniatialState});
    }
    
    
    const hendlerChange = ({target}) => {
        const { name, value } = target;
        setState(prevState => {
            return {...prevState, [name]: value}
        })
    }

    const { name, number } = state;

        return (
        <form onSubmit={handlSubmit}>
            <label>Name </label>
                    <input className={css.input}
                    type="text"
                    value={name}
                    onChange={hendlerChange}
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                />
                
                <label>
                    Number
                </label>
                    <input className={css.input}
                    type="tel"
                    value={number}
                    onChange={hendlerChange}
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    />
                <button className={css.addBtn} type="submit">Add contact</button>
        </form>
    )
}

ContactForm.propTypes={
    onSubmit: PropTypes.func.isRequired,
}
export default ContactForm; 

