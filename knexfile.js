// Update with your config settings.

module.exports = {

    development: {
      client: 'sqlite3',
      connection: {
        filename: `${__dirname}/data/cards.sqlite3`
      },
      pool: {
        afterCreate: (conn, done) => {
          conn.run('PRAGMA foreign_keys = ON', done);
        },
      },
      useNullAsDefault: true,
      
      migrations: {
        directory: `${__dirname}/data/migrations` 
      },
      seeds: {
        directory: `${__dirname}/data/seeds`
    },
  }
    
}