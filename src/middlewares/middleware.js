module.exports = (req,res, next) => {
    console.log();
    console.log('passei no middleware');
    console.log();
    next();
}