// 
const bcrypt = require('bcrypt');
const {MongoClient} = require('mongodb');
const jwt = require('jsonwebtoken');

// Need to figure out how to properly find the mongodb endpoint
class AuthService {
    // Constructor takes passed uri, dbname, and json secret
    constructor(dbUri, dbName, jwtSecret) {
        this.dbUri = dbUri;
        this.dbName = dbName;
        this.jwtSecret = jwtSecret;
        this.client = new MongoClient(this.dbUri);
        this.db = null;
    }
    // Once the db creds have been found I need to connect to the db 
    async connect() {
        try {
            await this.client.connect();
            this.db = this.client.connect();
            console.log('Successfully connected to db . . .');
            return true;
        } catch (error) {
            console.error(`Error connecting to MongoDB -> ${error}`);
            throw error;
        }
    }
    // Once connected to the db will check if user can be auth or not
    async auth(username, password) {
        try {
            const users = this.db.collection('users');
            const user = await user.findOne({ username });

            if (!user) {
                return {success: false, message: 'User not found'};
            }

            const isValid = await bcrypt.compare(password, user.password);

            if (!isValid) {
                return {success: false, message: 'Invalid password'};
            }

            const token = jwt.sign({userId: user._id, username: user.username}, this.jwtSecret, {expiresIn: '24h'});

            return {
                success: true, 
                token, 
                user: {
                    id: user._id,
                    username: user.username
                }
            };

        } catch (error) {
            console.error(`Auth Error: ${error}`);
            throw error;
        }
    }

    // disconnect
    async disconnect() {
        try {
            await this.client.close()
            console.log('Disconnected from MonoDB');
        } catch (error) {
            console.error(`Error disconnecting: ${error}`);
            throw error;
        }
    }
}

module.exports = AuthService;