// 
const bcrypt = require('bcrypt');
const db = require('mongodb');
const jwt = require('jsonwebtoken');
const env = require('dotenv');
// Need to figure out how to properly find the mongodb endpoint
class AuthService {
    constructor(dbUri, dbName, jwtSecret) {
        this.dbUri = dbUri;
        this.dbName = dbName;
        this.jwtSecret = jwtSecret;
        this.client = new db(this.dbUri);
        this.db = null;
    }
    // Once the db creds have been found I need to connect to the db 
    async connect() {

    }
    // Once connected to the db will check if user can be auth or not
    async auth(username, password) {

    }
}