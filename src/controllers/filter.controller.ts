import type { Request, Response } from "express";

import Restaurant from "../models/restaurant.model";

export const searchRestaurant = async (req: Request, res: Response) => {
  try {
    const { name, category } = req.query;

    if (!name && !category) {
      return res.status(400).json({ message: 'Parámetros incorrectos' });
    }

    let filters = {};

    if (name) {
      filters = { ...filters, name: { $regex: name, $options: 'i' } };
    }

    if (category) {
      filters = { ...filters, category: { $regex: category, $options: 'i' } };
    }

    const restaurants = await Restaurant.find(filters);

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
    console.error(error);
  }
};

