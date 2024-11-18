package main

import (
	"Avi/routes"
	"log"
	"net/http"

	"Avi/models"

	"github.com/gorilla/mux"
	"github.com/gorilla/sessions"
	"github.com/joho/godotenv"
)

var store = sessions.NewCookieStore([]byte("tu-clave-secreta-aqui"))

func init() {
	store.Options = &sessions.Options{
		Path:     "/",
		MaxAge:   3600,
		HttpOnly: true,
		SameSite: http.SameSiteLaxMode,
		Secure:   false,
	}
}
func main() {

	godotenv.Load()
	db := models.SetupDB()
	defer db.Close()
	r := mux.NewRouter()

	fs := http.FileServer(http.Dir("./static"))                        // Ajusta la ruta a "./static"
	r.PathPrefix("/static/").Handler(http.StripPrefix("/static/", fs)) // Usar r.PathPrefix para manejar archivos estáticos

	routes.Main(r, store)
	routes.Login(r, store)
	routes.Register(r, store)
	routes.RegisterReservationRoutes(r, store)
	routes.RegisterCarRoutes(r, store)
	routes.RegisterLogoutRoute(r, store)
	// routes.RegisterCarRoutes(r)
	// routes.RegisterReservationRoutes(r)
	// routes.RegisterUserRoutes(r)
	http.Handle("/", r)
	log.Fatal(http.ListenAndServe(":8080", r))
}