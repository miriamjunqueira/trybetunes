import { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

function Search() {
  const [nomeArtista, setNomeArtista] = useState('');
  const [nomeArtistaBuscado, setNomeArtistaBuscado] = useState('');
  const [listaArtistas, setListaArtistas] = useState<any[]>([]);

  function valida() {
    return (nomeArtista.length >= 2);
  }

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setNomeArtista(event.target.value);
  }

  function resetForm() {
    setNomeArtista('');
  }

  async function handleSubmit(event: FormEvent<HTMLElement>) {
    event.preventDefault();
    if (valida()) {
      setListaArtistas(await searchAlbumsAPI(nomeArtista));
      setNomeArtistaBuscado(nomeArtista);
      resetForm();
    }
  }

  return (
    <div>
      <form
        className="form-de-busca"
        onSubmit={ handleSubmit }
      >
        <label htmlFor="search-input">Digite o nome do artista que procura:</label>
        <input
          type="text"
          name="nomeArtista"
          id="search-input"
          required
          onChange={ handleSearchChange }
          value={ nomeArtista }
          data-testid="search-artist-input"
        />

        <button
          type="submit"
          disabled={ (!valida()) }
          data-testid="search-artist-button"
        >
          Pesquisar
        </button>
      </form>

      {(listaArtistas.length === 0)

        ? (
          <div>
            <p>Nenhum álbum foi encontrado</p>
          </div>
        )
        : (
          <div>
            <p>{`Resultado de álbuns de: ${nomeArtistaBuscado}`}</p>
            {listaArtistas.map((artista) => {
              return (
                <div key={ artista.collectionId }>
                  <Link
                    to={ `/album/${artista.collectionId}` }
                    data-testid={ `link-to-album-${artista.collectionId}` }
                    key={ artista.collectionId }
                  >
                    <p>{artista.collectionName}</p>

                  </Link>
                </div>
              );
            })}
          </div>
        )}

    </div>
  );
}

export default Search;
