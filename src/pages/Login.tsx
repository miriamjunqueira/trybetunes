import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../services/Loading';
import { createUser } from '../services/userAPI';

function Login() {
  const [login, setLogin] = useState('');
  const [carregando, setCarregando] = useState(false);

  function handleLoginChange(event: ChangeEvent<HTMLInputElement>) {
    setLogin(event.target.value);
  }

  function valida() {
    return (login.length >= 3);
  }

  //   function resetForm() {
  //     setLogin('');
  //   }

  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent<HTMLElement>) {
    event.preventDefault();
    setCarregando(true);
    // console.log('Entrei no handleSubmit');
    if (valida()) {
      await createUser({ name: login });
      setCarregando(false);
      navigate('/search');
    }
  }

  return (
    <div>
      {carregando ? (<Loading />) : (
        <div>
          <h1>Página de login</h1>
          <form
            className="form-de-login"
            onSubmit={ handleSubmit }
          >
            <label htmlFor="input-login"> Identifique-se com seu nome: </label>
            <input
              type="text"
              name="login"
              id="input-login"
              required
              onChange={ handleLoginChange }
              data-testid="login-name-input"
            />

            <button
              type="submit"
              disabled={ (!valida()) }
              data-testid="login-submit-button"
            >
              Entrar
            </button>
          </form>
        </div>
      )}
    </div>

  );
}
export default Login;
