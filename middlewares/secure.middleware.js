module.exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        next();
    }
}

module.exports.isNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.render('denied-route')
    } else {
        next()
    }
}

module.exports.checkRole = (role) => (req, res, next) => {
    if (!req.user) {
        if (req.url.includes('company') || req.url.includes('offer')) {
            res.redirect('/company-login');
        } else if (req.url.includes('candidate')) {
            res.redirect('/candidate-login');
        }
    } else if (req.user.role === 'COMPANY') {
        if (req.isAuthenticated && req.user.role === role) {
            console.log('company checkRole if')
            next();
        } else {
            console.log('company checkRole else');
            res.redirect('/candidate-login');
        }
    } else if (req.user.role === 'CANDIDATE') {
        if (req.isAuthenticated && req.user.role === role) {
            console.log('candidate checkRole if')
            next();
        } else {
            console.log('candidate checkRole else');
            res.redirect('/company-login');
        }
    } else {
        console.log('No checkRole working')
        next();
    }
}