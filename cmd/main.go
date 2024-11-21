package main

import (
	"Proyecto_Final/routes"
	"log"
	"net/http"

	"Proyecto_Final/models"

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

	fs := http.FileServer(http.Dir("./static"))                        
	r.PathPrefix("/static/").Handler(http.StripPrefix("/static/", fs)) 

	fsImages := http.FileServer(http.Dir("./imagenes"))
	r.PathPrefix("/imagenes/").Handler(http.StripPrefix("/imagenes/", fsImages))

	routes.Main(r, store)
	routes.Login(r, store)
	routes.Register(r, store)
	routes.RegisterReservationRoutes(r, store)
	routes.RegisterCarRoutes(r, store)
	routes.RegisterLogoutRoute(r, store)

	http.Handle("/", r)
	log.Fatal(http.ListenAndServe(":8080", r))


}