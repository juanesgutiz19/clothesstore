const { response } = require("express")

const validateFiles = (req, res = response, next ) => {
    
    const validExtensions = ['png','jpg','jpeg'];
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.urlFrontal || !req.files.urlBack ) {
        return res.status(400).json({
            msg: 'Debes subir ambas imágenes (Frontal y trasera)'
        });
    }
    
    const { urlFrontal, urlBack } = req.files;
    const splittedNameFrontal = urlFrontal.name.split('.');
    const frontalExtension = splittedNameFrontal[ splittedNameFrontal.length - 1 ];
    const splittedNameBack = urlBack.name.split('.');
    const backExtension = splittedNameBack[ splittedNameBack.length - 1 ];
    if (!validExtensions.includes(backExtension) || !validExtensions.includes(frontalExtension)){
        return res.status(400).json({
            msg: 'Solo se permiten las extensiones png, jpg y jpeg'
        });
    }
    next();
}

module.exports = {
    validateFiles
}
