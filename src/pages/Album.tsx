import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getMusics from '../services/musicsAPI';
import { SongType } from '../types';
import Loading from '../services/Loading';

function Album() {
  const [musicList, setMusicList] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [nomeArtista, setNomeArtista] = useState('');
  const [nomeAlbum, setNomeAlbum] = useState('');

  const params = useParams<{ id: string }>();
  const { id } = params;

  // console.log('params:');
  // console.log(params);

  /* Uma vez que não se pode transformar a callback do useEffect em função assíncrona...
  E sabendo que a função 'getMusics' é assíncrona...
  Passa a ser necessário criar uma função assíncrona dentro do useEffect
  e executar essa função logo em seguida. */

  /* Asssim, criei a função assíncrona 'recebeMusicas' dentro do useEffect.
  Ela irá aguardar o retorno da função 'getMusics' e irá armazenar
  esse retono na variável 'data' e depois, no Estado do componente. */

  useEffect(() => {
    async function recebeMusicas() {
      // setCarregando(true);
      const data = await getMusics(id);
      // console.log('data:');
      // console.log(data);
      // console.log('----');
      setNomeArtista(data[0].artistName);
      setNomeAlbum(data[0].collectionName);

      const musicas = data.splice(1);
      // console.log('copia apos splice:');
      // console.log(musicas);
      setMusicList(musicas);
      setCarregando(false);
    }
    recebeMusicas();
  }, []);

  /* Agora é só renderizar...
  Massssss antes de executar o useEffect,
  vale lembrar que o componente será renderizado pela primeira vez!
  ...nesse momento, o valor do Estado'musicsList' ainda é vazio!!!
  Para que a aplicação funcione corretamente, será necessário verificar se
  o Estado já estará preenchido com as informações! (linha 41) */

  return (
    <div>
      { carregando ? (<Loading />)
        : (
          <div>
            <h2 data-testid="artist-name">{`${nomeArtista}`}</h2>
            <h4 data-testid="album-name">{`${nomeAlbum}`}</h4>
            {musicList.map((musica) => {
              return (
                <p key={ musica.trackId }>{`${musica.trackName}`}</p>
              );
            })}
          </div>
        )}
    </div>
  );
}

export default Album;
