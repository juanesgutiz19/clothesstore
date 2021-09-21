

const fileIsGreaterThan1MB = ( fileSize ) => {
    if ( fileSize > 1000000){
        return true;
    }
    return false;
};

// const uploadFilesToCloudinary = async(tempFilePathFrontal, tempFilePathBack, sizeFrontal, sizeBack) =>{

//     let urlBack;
//     let urlFrontal;

//     if ( fileIsGreaterThan1MB(sizeFrontal) && fileIsGreaterThan1MB(sizeBack)){
//         const { secure_url: frontal } = await cloudinary.uploader.upload( tempFilePathFrontal, { quality: 50 } );
//         const { secure_url: back } = await cloudinary.uploader.upload( tempFilePathBack, { quality: 50 } );
//         urlFrontal = frontal;
//         urlBack = back;
//     } else if (fileIsGreaterThan1MB(sizeFrontal)){
//         const { secure_url: frontal } = await cloudinary.uploader.upload( tempFilePathFrontal, { quality: 50 } );
//         const { secure_url: back } = await cloudinary.uploader.upload( tempFilePathBack );
//         urlFrontal = frontal;
//         urlBack = back;
//     } else if(fileIsGreaterThan1MB(sizeBack)){
//         const { secure_url: back } = await cloudinary.uploader.upload( tempFilePathBack, { quality: 50 } );
//         const { secure_url: frontal } = await cloudinary.uploader.upload( tempFilePathFrontal);
//         urlBack = back;
//         urlFrontal = frontal;
//     }else {
//         const { secure_url: frontal } = await cloudinary.uploader.upload( tempFilePathFrontal );
//         const { secure_url: back } = await cloudinary.uploader.upload( tempFilePathBack );
//         urlFrontal = frontal;
//         urlBack = back;
//     }

//     return [urlBack, urlFrontal]

// }

module.exports = { fileIsGreaterThan1MB }