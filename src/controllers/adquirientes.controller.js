import { pool } from "../db.js";
import https from 'https'; // Cambiado de http a https para manejar URLs https

export const getAdquirientes = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM pacientes");
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const getAdquiriente = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("SELECT * FROM pacientes WHERE id = ?", [id]);

        if (rows.length <= 0) {
            return res.status(404).json({ message: "Adquiriente not found" });
        }

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const deleteAdquirientes = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("DELETE FROM pacientes WHERE id = ?", [id]);

        if (rows.affectedRows <= 0) {
            return res.status(404).json({ message: "Adquiriente not found" });
        }

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};


export const createAdquiriente = async (req, res) => {
    try {
        const { documento, tipo, nombre, correo, direccion, fecha } = req.body;
        const [result] = await pool.query(
            "INSERT INTO pacientes (documento, tipo, nombre, correo, direccion, fecha) VALUES (?, ?, ?, ?, ?, ?)",
            [documento, tipo, nombre, correo, direccion, fecha]
        );

        res.status(201).json({ id: result.insertId, documento, tipo, nombre, correo, direccion, fecha });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const updateAdquiriente = async (req, res) => {
    try {
        const { id } = req.params;
        const { documento, tipo, nombre, correo, direccion, fecha } = req.body;

        const [result] = await pool.query(
            "UPDATE pacientes SET documento = IFNULL(?, documento), tipo = IFNULL(?, tipo), nombre = IFNULL(?, nombre), correo = IFNULL(?, correo), direccion = IFNULL(?, direccion), fecha = IFNULL(?, fecha) WHERE id = ?",
            [documento, tipo, nombre, correo, direccion, fecha, id]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Adquiriente not found" });

        const [rows] = await pool.query("SELECT * FROM pacientes WHERE id = ?", [id]);

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};
