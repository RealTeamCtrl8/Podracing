module.exports = function (handler) {
    return (req, res, next) => {
        return handler(req)
            .then(result => res.json(result))
            .catch(next);
    };
};