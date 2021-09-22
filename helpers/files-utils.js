const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL );

const fileIsGreaterThan1MB = ( fileSize ) => {
    if ( fileSize > 1000000){
        return true;
    }
    return false;
};

const uploadFilesToCloudinary = async( tempFilePath, size ) =>{
    if ( fileIsGreaterThan1MB(size)) {
        const { secure_url } = await cloudinary.uploader.upload( tempFilePath, { quality: 50 } );
        return secure_url;
    }else {
        const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
        return secure_url;
    }
}

module.exports = { uploadFilesToCloudinary, fileIsGreaterThan1MB }