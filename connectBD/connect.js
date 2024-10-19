import mysql from 'mysql2/promise';

async function connect() {
  try {
    const connection = await mysql.createConnection({
      host: 'mysqldb',
      user: 'root',
      password: 'Juanpablo1990',
      database: 'docker',
      port: 3308
    });
    console.log('Connection to MySQL established.');
    return connection;
  } catch (error) {
    console.error('Error connecting to MySQL:', error);
    throw error;
  }
}

export default connect;