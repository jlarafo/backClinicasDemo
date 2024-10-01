import path from "path";
import fs from 'fs';

import cloudinary from 'cloudinary';

// Configurar Cloudinary con tus credenciales
cloudinary.v2.config({
    cloud_name: 'dniiiwih9', 
    api_key: '255452514566172', 
    api_secret: 'l0DQ9FwJCCMBmgdmvuE98mqrUDo'
});


export const uploadSign = (req, res) => {
    const { image, customName } = req.body; // Se recibe la imagen y el nombre personalizado

    if (!image) {
        return res.status(400).json({ error: 'No image provided' });
    }

    // Definir un nombre personalizado (si se proporciona) o usar uno por defecto
    const publicId = customName ? `${customName}` : `image-${Date.now()}`;

    // Subir la imagen a Cloudinary con el nombre personalizado
    cloudinary.v2.uploader.upload(image, { folder: 'firmas',public_id: publicId }, (error, result) => {
        if (error) {
            return res.status(500).json({ error: 'Error uploading the image' });
        }
        res.json({
            message: 'Image uploaded successfully',
            url: result.secure_url,
            public_id: result.public_id, // Retornar el ID público de la imagen
        });
    });
};
