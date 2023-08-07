import { useState } from 'react';
import { SongType } from '../types';

type MusicCardType = {
  music: SongType,
};

function MusicCard({ music }: MusicCardType) {
  const [favorita, setFavorita] = useState(false);

  function handleClickLiked() {
    setFavorita(true);
    console.log('gostou');
  }

  function handleClickDisliked() {
    setFavorita(false);
    console.log('nao gostou');
  }

  return (
    <div>
      <p>{`${music.trackName}`}</p>

      <audio data-testid="audio-component" src={ `${music.previewUrl}` } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        {' '}
        <code>audio</code>
        .
      </audio>

      <fieldset className="checkImg">
        {favorita
          ? (
            <label
              htmlFor={ `amou-${music.trackId}` }
              data-testid={ `checkbox-music-${music.trackId}` }
            >
              <input
                type="checkbox"
                id={ `amou-${music.trackId}` }
                onChange={ handleClickDisliked }
              />
              <img src="/src/images/checked_heart.png" alt="favorite" />
            </label>
          ) : (
            <label
              htmlFor={ `naoAmou-${music.trackId}` }
              data-testid={ `checkbox-music-${music.trackId}` }
            >
              <input
                type="checkbox"
                id={ `naoAmou-${music.trackId}` }
                onChange={ handleClickLiked }
              />
              <img src="/src/images/empty_heart.png" alt="favorite" />
            </label>
          ) }
      </fieldset>
    </div>
  );
}

export default MusicCard;
