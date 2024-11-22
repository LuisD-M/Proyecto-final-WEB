package models

import (
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
)

func SetupDB() *sql.DB {
	db, err := sql.Open("postgres", "user=postgres dbname=Aviones password=luis_MUNOZ1998 host=localhost sslmode=disable")
	if err != nil {
		panic(err)
	}

	err = db.Ping()
	if err != nil {
		panic(err)
	}

	fmt.Println("Conexión a la base de datos establecida")

	return db
}
