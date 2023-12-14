module.exports = (req,res, next) => {
    next();
}

exports.verifyCsrf = (err, req,res,next) => {
    if(err && 'EBADCSRFTOKEN' === err.code  )
        return res.render('404')
}

exports.verifyToken = (req, res, next) => {
    res.locals.crsfToken = req.crsfToken();
    next();
}
