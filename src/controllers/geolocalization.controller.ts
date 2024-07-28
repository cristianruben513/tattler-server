import type { Request, Response } from "express";
import mongoose from 'mongoose';

import Restaurant from "../models/restaurant.model";

export const getDistance = async (req: Request, res: Response) => {
  try {
    const { id, longitude, latitude } = req.query;

    if (!longitude || !latitude) {
      return res.status(400).json({ message: 'Parámetros incorrectos' });
    }

    // Convertir coordenadas a número
    const longitudeNum = parseFloat(longitude as string);
    const latitudeNum = parseFloat(latitude as string);

    if (id) {
      // Buscar restaurante específico por id
      const restaurant = await Restaurant.findById(id);
      if (!restaurant) {
        return res.status(404).json({ message: 'Restaurante no encontrado' });
      }

      // Calcular distancia usando $geoNear
      const distance = await Restaurant.aggregate([
        {
          $geoNear: {
            near: { type: "Point", coordinates: [longitudeNum, latitudeNum] },
            distanceField: "dist.calculated",
            key: "address.coord",
            spherical: true
          }
        },
        {
          $match: { _id: new mongoose.Types.ObjectId(id as string) }
        }
      ]);

      if (!distance.length) {
        return res.status(404).json({ message: 'No se pudo calcular la distancia' });
      }

      res.status(200).json({
        id: restaurant._id,
        photo: restaurant.photo,
        name: restaurant.name,
        category: restaurant.category,
        distance: distance[0].dist.calculated / 1000
      });
    } else {

      const restaurants = await Restaurant.aggregate([
        {
          $geoNear: {
            near: { type: "Point", coordinates: [longitudeNum, latitudeNum] },
            distanceField: "dist.calculated",
            key: "address.coord",
            spherical: true
          }
        }
      ]);

      if (!restaurants.length) {
        return res.status(404).json({ message: 'No se encontraron restaurantes' });
      }

      const results = restaurants.map(r => ({
        id: r._id,
        photo: r.photo,
        name: r.name,
        category: r.category,
        distance: r.dist.calculated / 1000
      }));

      res.status(200).json(results);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};