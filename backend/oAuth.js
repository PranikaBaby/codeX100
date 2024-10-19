// server.js
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const session = require('express-session');

const app = express();
const PORT = 3000;

// Use sessions to keep track of user login state
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Serialize user
passport.serializeUser((user, done) => {
    done(null, user);
});


passport.deserializeUser((obj, done) => {
    done(null, obj);
});

// Google Strategy
passport.use(new GoogleStrategy({
    clientID: 'YOUR_GOOGLE_CLIENT_ID',
    clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

// GitHub Strategy
passport.use(new GitHubStrategy({
    clientID: 'YOUR_GITHUB_CLIENT_ID',
    clientSecret: 'YOUR_GITHUB_CLIENT_SECRET',
    callbackURL: '/auth/github/callback'
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

// Routes
app.get('/', (req, res) => {
    res.send('<h1>Welcome</h1><a href="/auth/google">Login with Google</a><br><a href="/auth/github">Login with GitHub</a>');
});

// Google Auth
app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/profile');
    });

// GitHub Auth
app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/profile');
    });

// Profile Route
app.get('/profile', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/');
    }
    res.send(`<h1>Hello ${req.user.displayName || req.user.username}</h1><a href="/logout">Logout</a>`);
});

// Logout
app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
