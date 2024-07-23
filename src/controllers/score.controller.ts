import type { Request, Response } from "express";

import Restaurant from "../models/restaurant.model";
import Score from "../models/score.model";

export const getScore = async (req: Request, res: Response) => {
  try {
    const { restaurantId } = req.params;

    // Verificar si el restaurante existe
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurante no encontrado' });
    }

    // Obtener puntuaciones asociadas al restaurante
    const scores = await Score
      .find({ restaurant: restaurantId })
      .sort({ createdAt: -1 });

    // Calcular la puntuación promedio
    const averageScore = scores.reduce((acc, score) => (
      acc + score.score
    ), 0) / scores.length;

    res.status(200).json({
      scores,
      averageScore: averageScore || 0,
      totalScores: scores.length
    });

  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const createScore = async (req: Request, res: Response) => {
  try {
    const { restaurantId } = req.params;
    const { score } = req.body;  // Aquí usamos 'comment' según el modelo proporcionado

    // Verificar si el restaurante existe
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurante no encontrado' });
    }

    // Crear nueva puntuación
    const newScore = new Score({
      score,
      restaurant: restaurantId
    });

    // Guardar la puntuación
    const savedScore = await newScore.save();

    // Actualizar la referencia en el restaurante
    await Restaurant.findByIdAndUpdate(restaurantId, {
      $push: { scores: savedScore._id }
    });

    res.status(201).json(savedScore);
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};