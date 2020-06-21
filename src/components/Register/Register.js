/* NPM modules */
import React, { Component } from 'react';
import { withSnackbar } from 'notistack';
/* Material UI */
import Input from '@material-ui/core/Input';
/* Own modules */
import { withUserContext } from '../../context/UserContext';
import NodepopAPI from '../../services/NodepopAPI';
import Session from '../../models/Session';
import { compose } from '../../utils/Compose';
/* Assets */
import imageLogo from '../../assets/images/logo2.png';
/* CSS */
import './Register.css';

import Form from '../Form/Form';

/**
 * Register Form
 */
class Register extends Component {
  /**
   * Constructor
   */
  constructor(props) {
    super(props);
    const { session } = props;
    this.state = {
      error: false,
      name: session.name,
      surname: session.surname,
    };
  }

  changeInChildren = (e) => {
    this.setState((prevValue) => ({
      ...prevValue,
      ...e,
    }));
  };

  /**
   * Render
   */
  render() {
    const { name, surname, error } = this.state;
    const { endAdornment } = this.props;
    return (
      <div className="Register">
        <div className="Register__Wrapper">
          <img src={imageLogo} className="Register__Logo" alt="nodepop-logo" />
          <Form
            initialValue={{ name, surname }}
            onSubmit={this.handleSubmit}
            endAdornment={endAdornment}
            error={error}
            buttonText="Register"
            onChange={this.changeInChildren}
          >
            <Input type="text" name="name" />
            <Input type="password" name="surname" />
          </Form>
        </div>
      </div>
    );
  }

  /**
   * Did mount
   */
  componentDidMount() {
    this.checkApiConnection();
  }

  /**
   * Handle onSubmit event
   */
  handleSubmit = async (event) => {
    const { session, setSession, enqueueSnackbar, history } = this.props;
    const { name, surname, isRemember } = this.state;
    event.preventDefault();

    // Validación básica del formulario
    if (!name || !surname) {
      enqueueSnackbar('Rellene todos los campos del formulario', {
        variant: 'error',
      });
      return;
    }
    // Genero sesión y la guardo en LS si ha seleccionado "remember"
    const newSession = new Session(
      name,
      surname,
      session.apiUrl,
      session.maxAdverts,
    );
    setSession(newSession, isRemember, () => history.push('/'));
  };

  checkApiConnection = () => {
    const { session, enqueueSnackbar } = this.props;
    // Recuperar tags de la API para probar la conexion
    const { getTags } = NodepopAPI(session.apiUrl);
    getTags()
      .then(() => {
        // Conectado OK a la API
        this.setState(
          {
            error: false,
          },
          () =>
            enqueueSnackbar('Conectado con éxito a la API', {
              variant: 'success',
            }),
        );
      })
      .catch(() => {
        this.setState(
          {
            error: true,
          },
          () =>
            enqueueSnackbar('Error conectando con la API. Revise la URL.', {
              variant: 'error',
            }),
        );
      });
  };
}

export default compose(withUserContext, withSnackbar)(Register);
