import t from 'tcomb';
import Artists from 'domain/artists';

const Concert = t.struct({
  artist: t.maybe(Artists),
  city: t.maybe(t.String),
  concert_id: t.maybe(t.Number),
  datetime: t.maybe(t.String),
  display_name: t.maybe(t.String),
  lat: t.maybe(t.Number),
  lng: t.maybe(t.Number),
  popularity: t.maybe(t.Number),
  status: t.maybe(t.String),
  type: t.maybe(t.String),
  uri: t.maybe(t.String),
});

export default Concert;
