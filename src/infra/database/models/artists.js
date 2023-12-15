// const { encryptPassword } = require('../../encryption');
const tableArtist = 'artists';

/*
  concert_id SERIAL PRIMARY KEY,
  type TEXT,
  uri TEXT,
  displayName TEXT,
  status TEXT,
  popularity double precision,
  datetime TEXT,
  city TEXT,
  lng double precision,
  lat double precision

  uri TEXT,
  displayName TEXT,
  concert_id SERIAL,
  artist_id SERIAL PRIMARY KEY,

*/

// eslint-disable-next-line func-names
module.exports = function (sequelize, DataTypes) {
  const Artists = sequelize.define(
    tableArtist,
    {
      artist_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      display_name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      uri: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    },
  );

  return Artists;
};
