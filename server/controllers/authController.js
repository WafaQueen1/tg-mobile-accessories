const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const [users] = await db.execute(`
            SELECT u.*, r.name as role 
            FROM users u
            JOIN roles r ON u.role_id = r.id
            WHERE u.email = $1
        `, [email]);

        if (users.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const token = generateToken(user.id, user.role);
        
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });

        res.json({
            success: true,
            user: { id: user.id, email: user.email, name: user.first_name, role: user.role },
            token
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.register = async (req, res) => {
    try {
        const schema = Joi.object({
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required()
        });

        const { error } = schema.validate(req.body);
        if (error) return res.status(400).json({ success: false, message: error.details[0].message });

        const { first_name, last_name, email, password } = req.body;

        const [existing] = await db.execute('SELECT * FROM users WHERE email = $1', [email]);
        if (existing.length > 0) return res.status(400).json({ success: false, message: 'Email already registered' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Get default 'customer' role
        const [roles] = await db.execute("SELECT id FROM roles WHERE name = 'customer'");
        const roleId = roles.length > 0 ? roles[0].id : 2;

        const [result] = await db.execute(
            'INSERT INTO users (first_name, last_name, email, password_hash, role_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [first_name, last_name, email, hashedPassword, roleId]
        );

        res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.googleLogin = async (req, res) => {
    try {
        const { credential } = req.body;
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        const payload = ticket.getPayload();
        const { email, given_name, family_name, sub: google_id } = payload;

        // Check if user exists
        const [users] = await db.execute(`
            SELECT u.*, r.name as role 
            FROM users u
            JOIN roles r ON u.role_id = r.id
            WHERE u.email = $1
        `, [email]);

        let user;
        if (users.length === 0) {
            // Register new user
            const [roles] = await db.execute("SELECT id FROM roles WHERE name = 'customer'");
            const roleId = roles.length > 0 ? roles[0].id : 2;
            
            // For Google users, we don't have a password, so we use a random string
            const randomPassword = Math.random().toString(36).slice(-8);
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(randomPassword, salt);

            const [result] = await db.execute(
                'INSERT INTO users (first_name, last_name, email, password_hash, role_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [given_name, family_name || '', email, hashedPassword, roleId]
            );
            
            // Refetch to get role name
            const [newUser] = await db.execute(`
                SELECT u.*, r.name as role 
                FROM users u
                JOIN roles r ON u.role_id = r.id
                WHERE u.id = $1
            `, [result[0].id]);
            user = newUser[0];
        } else {
            user = users[0];
        }

        const token = generateToken(user.id, user.role);
        
        res.json({
            success: true,
            user: { id: user.id, email: user.email, name: user.first_name, role: user.role },
            token
        });
    } catch (err) {
        console.error("Google Login Error:", err);
        res.status(500).json({ success: false, message: 'Google authentication failed' });
    }
};
