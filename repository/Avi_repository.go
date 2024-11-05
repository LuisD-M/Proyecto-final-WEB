package repository

import (
	"database/sql"

	"Proyecto_Final/models"
)

func GetAllAvi(db *sql.DB) ([]models.Avi, error) {
	rows, err := db.Query("SELECT id, categoria, nombre, imagen, precio, color, materiales, medidas, descripcion FROM productos")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	cars := []models.Avi{}
	for rows.Next() {
		var car models.Avi
		if err := rows.Scan(&car.ID, &car.Categori, &car.Nombre, &car.Imagen, &car.Precio, &car.Color, &car.Materiales, &car.Medidas, &car.Descripcion); err != nil {
			return nil, err
		}
		cars = append(cars, car)
	}
	return cars, nil
}
