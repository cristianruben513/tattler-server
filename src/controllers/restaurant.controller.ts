import type { Request, Response } from "express";

import Restaurant from "../models/restaurant.model";

export const getRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const createRestaurant = async (req: Request, res: Response) => {
  try {
    const { photo, name, category, address } = req.body;

    const newRestaurant = new Restaurant({
      photo,
      name,
      category,
      address
    });
    const savedRestaurant = await newRestaurant.save();

    res.status(201).json(savedRestaurant);
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const getRestaurant = (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const restaurant = Restaurant.findById(id);

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurante no encontrado' });
    }

    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

export const updateRestaurant = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { photo, name, category, address } = req.body;

    const restaurant = Restaurant.findByIdAndUpdate(id, {
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

export const deleteRestaurant = (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const restaurant = Restaurant.findByIdAndDelete(id);

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurante no encontrado' });
    }

    res.status(200).json({ message: 'Restaurante eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}