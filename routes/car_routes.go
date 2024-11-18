package routes

import (
	"encoding/json"
	"fmt"
	"net/http"

	"Proyecto_Final/models"
	"Proyecto_Final/repository"

	"github.com/gorilla/mux"
	"github.com/gorilla/sessions"
)

func RegisterCarRoutes(r *mux.Router, store *sessions.CookieStore) {
	r.HandleFunc("/cars", getAllCars).Methods("GET")
}

func getAllCars(w http.ResponseWriter, r *http.Request) {
	db := models.SetupDB()
	defer db.Close()
	fmt.Print("buscando")
	cars, err := repository.GetAllCars(db)
	if err != nil {
		fmt.Println(err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(cars)
}