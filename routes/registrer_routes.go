package routes

import (
	"Proyecto_Final/models"
	"Proyecto_Final/repository"
	"Proyecto_Final/services"

	"encoding/json"
	"fmt"
	"html/template"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/gorilla/sessions"
)

func Register(r *mux.Router, store *sessions.CookieStore) {
	r.HandleFunc("/register.html", registerPage).Methods("GET")
	r.HandleFunc("/register.html", Registrando).Methods("POST")
}

func registerPage(w http.ResponseWriter, r *http.Request) {
	tmpl, err := template.ParseFiles("templates/register.html")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	tmpl.Execute(w, nil)
}
func Registrando(w http.ResponseWriter, r *http.Request) {

	var user models.User
	json.NewDecoder(r.Body).Decode(&user)
	hashedPassword, err := services.HashPassword(user.Password)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	user.Password = hashedPassword
	db := models.SetupDB()
	defer db.Close()

	err = repository.CreateUser(db, user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	fmt.Print("cargado con exito")
}
