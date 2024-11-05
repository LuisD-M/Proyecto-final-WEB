package repository

import (
	"Proyecto_Final/models"
	"database/sql"
)

func CreateReservation(db *sql.DB, reservation models.Reservation, userId int) error {
	query := `INSERT INTO carrito (id_user, id_producto, extras, total_price,imagen) VALUES ($1, $2, $3, $4,$5)`
	_, err := db.Exec(query, userId, reservation.AviID, reservation.Extras, reservation.TotalPrice, reservation.IMG)
	return err
}

func GetReservationsByUserID(db *sql.DB, userID int) ([]models.Reservation, error) {
	rows, err := db.Query("SELECT id, id_user, id_producto, extras, total_price,imagen FROM carrito WHERE id_user = $1", userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	reservations := []models.Reservation{}
	for rows.Next() {
		var reservation models.Reservation
		if err := rows.Scan(&reservation.ID, &reservation.UserID, &reservation.AviID, &reservation.Extras, &reservation.TotalPrice, &reservation.IMG); err != nil {
			return nil, err
		}
		reservations = append(reservations, reservation)
	}
	return reservations, nil
}
