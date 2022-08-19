import './Form.css'
import {useState} from "react";

const  Form = (props) => {
    const [value, setValue] = useState('');

    return(
        <form className='form' onSubmit={e => {
            e.preventDefault();
            props.putTodo(value);
            setValue('');
        }
        }>
            <img className="input-img" src="/angle-down.svg"/>
            <input type='text'
                   placeholder='What needs to be done?'
                   className='input'
                   value={value}
                   onChange={ e => setValue(e.target.value)}
            />
        </form>
    );
};

export default Form;