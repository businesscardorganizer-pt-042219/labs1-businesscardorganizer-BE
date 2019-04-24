// Update with your config settings.

module.exports = {

  development: {
    development: {
      client: 'sqlite3',
      connection: {
        filename: './data/businesscardorganizer.sqlite3'
      },
      useNullAsDefault: true,
      migrations: {
        directory: './data/migrations' 
      },
      seeds: {
        directory: './data/seeds'
      }
    },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
