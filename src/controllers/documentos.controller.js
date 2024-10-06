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
        const { itemsFormateados } = req.body;

        // Verificar si itemsFormateados es un arreglo
        if (!Array.isArray(itemsFormateados) || itemsFormateados.length === 0) {
            return res.status(400).json({ message: "El cuerpo de la solicitud debe contener un arreglo de itemsFormateados." });
        }

        // Crear un arreglo para almacenar los resultados de las inserciones
        const results = [];

        // Iterar sobre cada item en el arreglo
        for (const item of itemsFormateados) {
            const { documento, item: itemCodigo, descripcion, cantidad, precio, fecha } = item;

            // Realizar la inserción en la base de datos
            const [result] = await pool.query(
                "INSERT INTO documentos (documento, item, descripcion, cantidad, precio, fecha) VALUES (?, ?, ?, ?, ?, ?)",
                [documento, itemCodigo, descripcion, cantidad, precio, fecha]
            );

            // Almacenar el resultado de la inserción en el arreglo
            results.push({
                id: result.insertId,
                documento,
                item: itemCodigo,
                descripcion,
                cantidad,
                precio,
                fecha
            });
        }

        // Devolver los resultados de todas las inserciones
        res.status(201).json(results);

    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
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
