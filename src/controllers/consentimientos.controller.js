import { pool } from "../db.js";
import https from 'https'; // Cambiado de http a https para manejar URLs https

export const getConsentimientos = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM consentimientos");
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const getConsentimiento = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("SELECT * FROM consentimientos WHERE id = ?", [id]);

        if (rows.length <= 0) {
            return res.status(404).json({ message: "Adquiriente not found" });
        }

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const deleteConsentimientos = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("DELETE FROM consentimientos WHERE id = ?", [id]);

        if (rows.affectedRows <= 0) {
            return res.status(404).json({ message: "Adquiriente not found" });
        }

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};


export const createConsentimiento = async (req, res) => {
    try {
        const { tipo_proc, texto, fecha } = req.body;
        const [result] = await pool.query(
            "INSERT INTO consentimientos (tipo_proc, texto, fecha) VALUES (?, ?, ?)",
            [tipo_proc, texto, fecha]
        );

        res.status(201).json({ id: result.insertId, tipo_proc, texto, fecha});
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const updateConsentimiento = async (req, res) => {
    try {
        const { id } = req.params;
        const { tipo_proc, texto, fecha } = req.body;

        const [result] = await pool.query(
            "UPDATE consentimientos SET tipo_proc = IFNULL(?, tipo_proc), texto = IFNULL(?, texto), fecha = IFNULL(?, fecha) WHERE id = ?",
            [tipo_proc, texto, fecha, id]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Adquiriente not found" });

        const [rows] = await pool.query("SELECT * FROM consentimientos WHERE id = ?", [id]);

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};
