import t from 'tcomb';

const Artists = t.struct({
  artist_id: t.maybe(t.Number),
  display_name: t.maybe(t.String),
  uri: t.maybe(t.String),
});

export default Artists;
