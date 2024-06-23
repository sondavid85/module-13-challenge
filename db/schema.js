require('dotenv').config();
const mysql = require('mysql2/promise');

const {
  DB_HOST,
  DB_ROOT_USER,
  DB_ROOT_PASSWORD,
  DB_NAME,
  DB_USER,
  DB_PW,
} = process.env;

(async () => {
  try {
    const connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_ROOT_USER,
      password: DB_ROOT_PASSWORD,
      multipleStatements: true,
    });

    // Dynamically construct the queries
    const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`;
    const createUserQuery = `CREATE USER IF NOT EXISTS '${DB_USER}'@'%' IDENTIFIED BY '${DB_PW}';`;
    const grantPrivilegesQuery = `GRANT ALL PRIVILEGES ON \`${DB_NAME}\`.* TO '${DB_USER}'@'%';`;
    const flushPrivilegesQuery = `FLUSH PRIVILEGES;`;

    const sql = `${createDatabaseQuery} ${createUserQuery} ${grantPrivilegesQuery} ${flushPrivilegesQuery}`;

    // Execute the SQL commands
    await connection.query(sql);

    console.log('Database and user created successfully');

    await connection.end();
  } catch (error) {
    console.error('Error creating database and user:', error);
  }
})();
