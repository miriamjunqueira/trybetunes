import { AlbumType } from '../types';

const searchAlbumsAPI = async (artist: string): Promise<AlbumType[]> => {
  const artistNameURL = encodeURI(artist).replaceAll('%20', '+');

  const getAlbumsAPI = `https://itunes.apple.com/search?entity=album&term=${artistNameURL}&attribute=allArtistTerm`;

  const APIResponse = await fetch(getAlbumsAPI);

  const { results }: { results: AlbumType[] } = await APIResponse.json();

  // console.log('Results:');
  // console.log(results);
  // console.log('-----------');

  const response = results.map((artistInfo) => ({ ...artistInfo }));

  // console.log('Response:');
  // console.log(response);

  return response;
};

export default searchAlbumsAPI;
