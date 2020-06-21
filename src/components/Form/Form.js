import React, { useState } from 'react';
//Material UI
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

const Form = ({
  initialValue,
  onSubmit,
  endAdornment,
  error,
  buttonText,
  onChange,
}) => {
  const [state, setState] = useState(initialValue);

  /**
   * Cambio en un input
   */
  const handleChange = ({ target }) => {
    const { name, type, checked, value } = target;

    let nuevoState = { ...state };
    nuevoState[name] = type === 'checkbox' ? checked : value;
    onChange(nuevoState);
    setState(nuevoState);
  };

  return (
    <form className="Register__Form" onSubmit={onSubmit}>
      {Object.keys(initialValue).map((field) => {
        return (
          <FormControl key={field}>
            <Input
              name={field}
              value={state[field] || ''}
              onChange={handleChange}
              type="text"
              placeholder={`type your ${field}`}
              autoComplete="username"
              startAdornment={
                <InputAdornment position="start" className="InputIcon__Icon">
                  <AccountCircleIcon />
                </InputAdornment>
              }
              endAdornment={endAdornment}
              required
            />
          </FormControl>
        );
      })}
      <Button
        className="button"
        type="submit"
        variant="contained"
        color="primary"
        disabled={!!error}
      >
        {buttonText}
      </Button>
    </form>
  );
};

export default Form;
