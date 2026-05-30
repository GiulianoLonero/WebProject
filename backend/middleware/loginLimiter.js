const rateLimit = require("express-rate-limit");

const waitingTime = 5*60*1000

// Trial limiter by IP, // Doesn't occurr "next()" because is already in rateLimit
const loginLimiter = rateLimit({
    windowMs: waitingTime,
    max: 3,
    message: {
        message: "Too many trials, try again in 5 minutes"
    },
    standardHeaders: true
});

module.exports = loginLimiter