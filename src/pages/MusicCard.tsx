import { SongType } from '../types';

type MusicCardType = {
  music: SongType,
};

function MusicCard({ music }: MusicCardType) {
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
    </div>
  );
}

export default MusicCard;
