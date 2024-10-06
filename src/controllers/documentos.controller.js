import { pool } from "../db.js";
import https from 'https'; // Cambiado de http a https para manejar URLs https

export const getDocumentos = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM documentos");
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const getDocumento = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("SELECT * FROM documentos WHERE id = ?", [id]);

        if (rows.length <= 0) {
            return res.status(404).json({ message: "Documento not found" });
        }

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const deleteDocumentos = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("DELETE FROM documentos WHERE id = ?", [id]);

        if (rows.affectedRows <= 0) {
            return res.status(404).json({ message: "Documento not found" });
        }

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};


export const createDocumento = async (req, res) => {
    try {
        // Aquí asumimos que req.body es un arreglo
        const documentos = req.body;

        // Verificamos que req.body sea un arreglo
        if (!Array.isArray(documentos)) {
            return res.status(400).json({ message: "El cuerpo de la solicitud debe ser un arreglo" });
        }

        // Creamos un array de promesas para insertar cada documento
        const promises = documentos.map(async (documento) => {
            const { documento: doc, item, descripcion, cantidad, precio, fecha } = documento;
            
            const [result] = await pool.query(
                "INSERT INTO documentos (documento, item, descripcion, cantidad, precio, fecha) VALUES (?, ?, ?, ?, ?, ?)",
                [doc, item, descripcion, cantidad, precio, fecha]
            );

            return { id: result.insertId, doc, item, descripcion, cantidad, precio, fecha };
        });

        // Esperamos a que todas las promesas se resuelvan
        const results = await Promise.all(promises);

        // Enviamos la respuesta con los resultados
        res.status(201).json(results);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const updateDocumento = async (req, res) => {
    try {
        const { id } = req.params;
        const { documento, item, descripcion, cantidad, precio, fecha } = req.body;

        const [result] = await pool.query(
            "UPDATE documentos SET documento = IFNULL(?, documento), item = IFNULL(?, item), descripcion = IFNULL(?, descripcion), cantidad = IFNULL(?, cantidad), precio = IFNULL(?, precio), fecha = IFNULL(?, fecha) WHERE id = ?",
            [documento, item, descripcion, cantidad, precio, fecha, id]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Adquiriente not found" });

        const [rows] = await pool.query("SELECT * FROM documentos WHERE id = ?", [id]);

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};
