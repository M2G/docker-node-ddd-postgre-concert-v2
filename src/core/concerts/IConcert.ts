interface IArtist {
  artist_id: number;
  display_name: string;
  uri: string;
}

interface IConcert {
  artist: IArtist;
  city: string;
  concert_id: number;
  datetime: Date;
  display_name: string;
  lat: number;
  lng: number;
  popularity: number;
  status: string;
  type: string;
  uri: string;
}

export default IConcert;
