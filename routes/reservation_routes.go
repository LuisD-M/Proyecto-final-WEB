package routes

import (
	"Proyecto_Final/models"
	"Proyecto_Final/repository"
	
	"encoding/json"
	"fmt"
	"html/template"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/gorilla/sessions"
)

func RegisterReservationRoutes(r *mux.Router, store *sessions.CookieStore) {
	r.HandleFunc("/reservations.html", reservationPage).Methods("GET")
	
	r.HandleFunc("/reservations.html", func(w http.ResponseWriter, r *http.Request) {
		createReservation(w, r, store)
	}).Methods("POST")
	// Ruta para obtener reservas de un usuario específico
	r.HandleFunc("/reservations/me", func(w http.ResponseWriter, r *http.Request) { getUserReservations(w, r, store) }).Methods("GET")
}
func reservationPage(w http.ResponseWriter, r *http.Request) {
	tmpl, err := template.ParseFiles("templates/reservation.html")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	tmpl.Execute(w, nil)
}
func createReservation(w http.ResponseWriter, r *http.Request, store *sessions.CookieStore) {
	session, err := store.Get(r, "session-name")
	if err != nil {
		http.Error(w, "Could not get session", http.StatusInternalServerError)
		return
	}
	userID, ok := session.Values["userID"].(int)
	if !ok {
		http.Error(w, "User not logged in", http.StatusUnauthorized)
		return
	}
	var reservation models.Reservation
	json.NewDecoder(r.Body).Decode(&reservation)

	db := models.SetupDB()
	defer db.Close()
	fmt.Print(userID)
	fmt.Print(reservation.AviID)
	err = repository.CreateReservation(db, reservation, userID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		fmt.Print(err.Error())
		return
	}

	w.WriteHeader(http.StatusCreated)
}

func getUserReservations(w http.ResponseWriter, r *http.Request, store *sessions.CookieStore) {
	// Obtener la sesión
	session, err := store.Get(r, "session-name")
	if err != nil {
		fmt.Println("Error getting session:", err) // Impresión de error
		http.Error(w, "Could not get session", http.StatusInternalServerError)
		return
	}

	// Obtener el ID de usuario de la sesión
	userID, ok := session.Values["userID"].(int)
	if !ok {
		http.Error(w, "User not logged in", http.StatusUnauthorized)
		return
	}

	// Conectar a la base de datos
	db := models.SetupDB()
	defer db.Close()

	// Obtener reservas por ID de usuario
	reservations, err := repository.GetReservationsByUserID(db, userID)
	if err != nil {
		fmt.Println("Error retrieving reservations:", err) 
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	fmt.Print(reservations)
	
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(reservations)
}
