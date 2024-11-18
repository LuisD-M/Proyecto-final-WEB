package repository

import (
	"database/sql"

	"Avi/models"
)

func CreateUser(db *sql.DB, user models.User) error {
	query := `INSERT INTO users (correo, password) VALUES ($1, $2)`
	_, err := db.Exec(query, user.Username, user.Password)
	return err
}

func GetUserByUsername(db *sql.DB, username string) (models.User, error) {
	var user models.User
	query := `SELECT id, correo, password FROM users WHERE correo = $1`
	row := db.QueryRow(query, username)
	err := row.Scan(&user.ID, &user.Username, &user.Password)
	return user, err
}
