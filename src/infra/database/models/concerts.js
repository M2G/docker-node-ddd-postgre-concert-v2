const tableConcert = 'concerts';
const tableArtist = 'artists';

module.exports = function (sequelize, DataTypes) {
  const Concerts = sequelize.define(
    tableConcert,
    {
      artist_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      city: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      concert_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      datetime: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      display_name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      lat: {
        allowNull: false,
        type: DataTypes.DOUBLE,
      },
      lng: {
        allowNull: false,
        type: DataTypes.DOUBLE,
      },
      popularity: {
        primaryKey: false,
        type: DataTypes.DOUBLE,
      },
      status: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      type: {
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

  Concerts.hasOne(Artists, {
    foreignKey: 'artist_id',
    sourceKey: 'artist_id',
  });

  Artists.belongsTo(Concerts);

  return Concerts;
};
