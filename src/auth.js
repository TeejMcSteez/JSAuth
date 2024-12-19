const { Auth } = require('pg');
const bcrypt = require('bcrypt');

const authClient = new Auth({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});

await authClient.connect();

async function AuthUser(name, password) {
    try {
        const query = {
            text: `SELECT password FROM users WHERE username = $1`,
            values: [name],
        };
    
        const res = await authClient.query(query);
    
        if (res.rows.length === 0) {
            return {success: false, message: 'User not found'};
        }
    
        const hashedPasswordFromDB = res.rows[0].password;
        const isMatch = await bcrypt.compare(password, hashedPasswordFromDB);
    
        if (isMatch) {
            return {success: true, message: 'Auth Success'};
        } else {
            return {success: false, message: 'Invalid Password'};
        }
    } catch (error) {
        console.error(`Error during auth: ${error.message}`);
        return {success: false, message: 'An error occured during auth'};
    }

}

module.exports = {AuthUser};