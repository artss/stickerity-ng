const config = {};

['development', 'production'].forEach((key) => {
  config[key] = {
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT || 5432),
    database: process.env.POSTGRES_NAME,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    dialect: 'postgres',
  };
});

module.exports = config;
