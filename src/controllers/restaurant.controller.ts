import type { Request, Response } from "express";

import Comment from "../models/comment.model";
import Restaurant from "../models/restaurant.model";
import Score from "../models/score.model";

export const getRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await Restaurant.find();

    const formattedRestaurants = restaurants.map(restaurant => {
      return {
        id: restaurant._id,
        photo: restaurant.photo,
        name: restaurant.name,
        category: restaurant.category,
        address: restaurant.address,
      }
    })

    res.status(200).json(formattedRestaurants);
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const createRestaurant = async (req: Request, res: Response) => {
  try {
    const { photo, name, category, address } = req.body;

    const newRestaurant = new Restaurant({
      photo: photo,
      name: name,
      category: category,
      address: address
    });
    const savedRestaurant = await newRestaurant.save();

    res.status(201).json(savedRestaurant);
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const getRestaurant = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurante no encontrado' });
    }

    const comments = await Comment
      .find({ restaurant: id })
      .sort({ createdAt: -1 });

    // Obtener puntuaciones asociadas al restaurante
    const scores = await Score
      .find({ restaurant: id })
      .sort({ createdAt: -1 });

    // Calcular la puntuación promedio
    const averageScore = scores.reduce((acc, score) => (
      acc + score.score
    ), 0) / scores.length;


    const formattedRestaurant = {
      id: restaurant._id,
      photo: restaurant.photo,
      name: restaurant.name,
      category: restaurant.category,
      address: restaurant.address,
      averageScore: averageScore || 0,
      totalScores: scores.length,
      comments: comments.map(comment => {
        return {
          id: comment._id,
          comment: comment.comment,
        }
      })
    }

    res.status(200).json(formattedRestaurant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

export const updateRestaurant = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { photo, name, category, address } = req.body;

    const restaurant = await Restaurant.findByIdAndUpdate(id, {
      photo,
      name,
      category,
      address
    });

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurante no encontrado' });
    }

    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

export const deleteRestaurant = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const restaurant = await Restaurant.findByIdAndDelete(id);

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurante no encontrado' });
    }

    res.status(200).json({ message: 'Restaurante eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}