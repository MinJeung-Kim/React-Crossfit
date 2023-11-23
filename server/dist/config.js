import dotenv from "dotenv";
dotenv.config();
function required(key, defaultValue = undefined) {
    const value = process.env[key] || defaultValue;
    if (value == null) {
        throw new Error(`key ${key} is undefined`);
    }
    return value;
}
export const config = {
    jwt: {
        secretKey: String(required("JWT_SECRET")),
        expiresInSec: required("JWT_EXPIRES_SEC", 86400),
    },
    bcrypt: {
        saltRounds: required("BCRYPT_SALT_ROUNDS", 12),
    },
    db: {
        host: String(required("DB_HOST")),
        user: String(required("DB_USER")),
        database: String(required("DB_DATABASE")),
        password: String(required("DB_PASSWORD")),
    },
    port: required("PORT", 8080),
    cors: {
        allowedOrigin: required("CORS_ALLOW_ORIGIN"),
    },
};
//# sourceMappingURL=config.js.map