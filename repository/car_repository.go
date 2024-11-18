package repository

import (
	"database/sql"

	"Proyecto_Final/models"
)

func GetAllCars(db *sql.DB) ([]models.Car, error) {
	rows, err := db.Query("SELECT id, categoria, nombre, imagen, precio, color, materiales, medidas, descripcion FROM productos")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	cars := []models.Car{}
	for rows.Next() {
		var car models.Car
		if err := rows.Scan(&car.ID, &car.Categori, &car.Nombre, &car.Imagen, &car.Precio, &car.Color, &car.Materiales, &car.Medidas, &car.Descripcion); err != nil {
			return nil, err
		}
		cars = append(cars, car)
	}
	return cars, nil
}
