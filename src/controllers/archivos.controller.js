import path from "path";
import fs from 'fs';


export const uploadImage = (req, res) => {
    const { image } = req.body;

    if (!image) {
        return res.status(400).json({ error: 'No image provided' });
    }

    // Extraer el tipo de imagen y el contenido
    const base64Data = image.replace(/^data:image\/png;base64,/, '');

    // Definir la ruta para guardar la imagen
    // const filePath = path.join(__dirname, '../uploads', `image-${Date.now()}.png`);
    const filePath = path.join(process.cwd(), 'uploads', `image-${Date.now()}.png`);

    
    // Escribir el archivo en disco
    fs.writeFile(filePath, base64Data, 'base64', (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error saving the image' });
        }
        res.json({ message: 'Image saved successfully', filePath });
    });
};

