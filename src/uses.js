const AuthService = require('./auth');

async function main() {
    const auth = new AuthService(
        process.env.MONGODB_URI,
        process.env.DB_NAME,
        process.env.JWT_SECRET
    );

    try {
        await auth.connect();
        
        // Register a new user
        const registration = await auth.registerUser('username', 'password');
        
        // Authenticate a user
        const authentication = await auth.auth('username', 'password');
        
        // Don't forget to disconnect when done
        await auth.disconnect();
    } catch (error) {
        console.error(error);
    }
}