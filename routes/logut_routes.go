package routes

import (
	"net/http"

	"github.com/gorilla/mux"
	"github.com/gorilla/sessions"
)

func RegisterLogoutRoute(r *mux.Router, store *sessions.CookieStore) {
	r.HandleFunc("/logout", func(w http.ResponseWriter, r *http.Request) {
		Logout(w, r, store)
	}).Methods("POST")
}

func Logout(w http.ResponseWriter, r *http.Request, store *sessions.CookieStore) {
	session, err := store.Get(r, "session-name")
	if err != nil {
		http.Error(w, "Could not get session", http.StatusInternalServerError)
		return
	}

	// Borra los valores de la sesión
	session.Values["userID"] = nil
	session.Values["username"] = nil

	// Guarda la sesión para que los cambios tengan efecto
	session.Save(r, w)

	// Redirige a la página de inicio o a la página de login
	http.Redirect(w, r, "/", http.StatusSeeOther)
}