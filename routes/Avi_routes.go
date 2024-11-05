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

func RegisterRoutes(r *mux.Router, store *sessions.CookieStore) {
	r.HandleFunc("/cars", getAllAvi).Methods("GET")
}

func getAllAvi(w http.ResponseWriter, r *http.Request) {
	db := models.SetupDB()
	defer db.Close()
	fmt.Print("buscando")
	cars, err := repository.GetAllAvi(db)
	if err != nil {
		fmt.Println(err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(cars)
}
