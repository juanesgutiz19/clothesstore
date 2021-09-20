const { response } = require("express")

const validateFiles = (req, res = response, next ) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.urlFrontal || !req.files.urlBack ) {
        return res.status(400).json({
            msg: 'Debes subir ambas imágenes (Frontal y trasera)'
        });
    }
    next();
}

module.exports = {
    validateFiles
}
