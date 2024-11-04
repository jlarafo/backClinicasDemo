import { pool } from "../db.js";
import https from "https"; // Cambiado de http a https para manejar URLs https

export const getEvoluciones = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM evoluciones");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getEvolucion = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM evoluciones WHERE id = ?", [
      id,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Historia not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteEvoluciones = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("DELETE FROM evoluciones WHERE id = ?", [
      id,
    ]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Historias not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const createEvolucion = async (req, res) => { try {
  const { documento, nombre, motivo, sesion, procedimiento, firma, odontograma, fecha } = req.body;
  const [result] = await pool.query(
      "INSERT INTO evoluciones (documento, nombre, motivo, sesion, procedimiento, firma, odontograma, fecha) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [documento, nombre, motivo, sesion, procedimiento, firma, odontograma, fecha]
  );

  res.status(201).json({ id: result.insertId, documento, nombre, motivo, sesion, procedimiento, firma, odontograma, fecha });
} catch (error) {
  res.status(500).json({ message: "Something went wrong" });
}
};

export const updateEvolucion = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      documento,
      nombre,
      motivo,
      sesion,
      procedimiento,
      firma,
      odontograma,
      fecha,
    } = req.body;

    const [result] = await pool.query(
      "UPDATE evoluciones SET documento = IFNULL(?, documento), nombre = IFNULL(?, nombre), motivo = IFNULL(?, motivo), sesion = IFNULL(?, sesion), procedimiento = IFNULL(?, procedimiento), firma = IFNULL(?, firma), odontograma = IFNULL(?, odontograma), fecha = IFNULL(?, fecha) WHERE id = ?",
      [
        documento,
        nombre,
        motivo,
        sesion,
        procedimiento,
        firma,
        odontograma,
        fecha,
        id,
      ]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Historia not found" });

    const [rows] = await pool.query("SELECT * FROM evoluciones WHERE id = ?", [
      id,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
