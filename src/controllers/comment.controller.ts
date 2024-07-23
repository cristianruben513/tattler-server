import type { Request, Response } from "express";

import Comment from "../models/comment.model";
import Restaurant from "../models/restaurant.model";

export const getComments = async (req: Request, res: Response) => {
  try {
    const { restaurantId } = req.params;

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurante no encontrado' });
    }

    // Obtener comentarios asociados al restaurante
    const comments = await Comment
      .find({ restaurant: restaurantId })
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const createComment = async (req: Request, res: Response) => {
  try {
    const { restaurantId } = req.params;
    const { comment } = req.body;

    // Verificar si el restaurante existe
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurante no encontrado' });
    }

    // Crear nuevo comentario
    const newComment = new Comment({
      comment,
      restaurant: restaurantId
    });

    // Guardar el comentario
    const savedComment = await newComment.save();

    // Actualizar la referencia en el restaurante
    await Restaurant.findByIdAndUpdate(restaurantId, {
      $push: { comments: savedComment._id }
    });

    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
