module.exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/company-login')
    }
}

module.exports.isNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect('/candidate-login')
    } else {
        next()
    }
}

module.exports.checkRole = (role) => (req, res, next) => {
    console.log('req.user:', req.user)
    // console.log('req.currentCandidate:', req.currentCandidate)
    // console.log('req.currentCompany:', req.currentCandidate)
    if (!req.user) {
        res.render('denied-route');
    } else if (req.user.role === 'COMPANY') {
        if (req.isAuthenticated && req.user.role === role) {
            console.log('company checkRole working')
            next();
        } else {
            console.log('company checkRole not working')
            res.render('denied-route');
        }
    } else if (req.user.role === 'CANDIDATE') {
        if (req.isAuthenticated && req.user.role === role) {
            console.log('candidate checkRole working')
            next();
        } else {
            console.log('candidate checkRole not working')
            res.render('denied-route');
        }
    } else {
        console.log('No checkRole working')
        next();
    }
}