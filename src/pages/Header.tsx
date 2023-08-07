import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loading from '../services/Loading';
import { getUser } from '../services/userAPI';

function Header() {
  const [carregando, setCarregando] = useState(true);
  const [nomeUsuario, setNomeUsuario] = useState('');

  useEffect(() => {
    async function recuperaInfosUsuario() {
      const infos = await getUser();
      setNomeUsuario(infos.name);
      setCarregando(false);
    }
    recuperaInfosUsuario();
  }, []);

  return (
    <header data-testid="header-component">
      {carregando
        ? (
          <div>
            <Loading />
          </div>
        )
        : (
          <div>
            <p data-testid="header-user-name">
              Bem vindo
              {' '}
              {`${nomeUsuario}`}
            </p>

            <nav id="nav">
              <NavLink data-testid="link-to-search" to="/search">Search</NavLink>
              {' '}
              <NavLink data-testid="link-to-favorites" to="/favorites">
                Favourites
              </NavLink>
              {' '}
              <NavLink data-testid="link-to-profile" to="/profile">Profile</NavLink>
            </nav>
          </div>
        )}
    </header>
  );
}

export default Header;
