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
	"golang.org/x/crypto/bcrypt"
)

func Login(r *mux.Router, store *sessions.CookieStore) {
	r.HandleFunc("/login.html", loginPage).Methods("GET")
	// Envolver la función log para pasar el store
	r.HandleFunc("/login.html", func(w http.ResponseWriter, r *http.Request) {
		log(w, r, store)
	}).Methods("POST")
}

func loginPage(w http.ResponseWriter, r *http.Request) {
	tmpl, err := template.ParseFiles("templates/login.html")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	tmpl.Execute(w, nil)
}
func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	fmt.Print(err)
	return err == nil
}
func log(w http.ResponseWriter, r *http.Request, store *sessions.CookieStore) {
	var user models.User
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		fmt.Print("invalid")
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	db := models.SetupDB()
	defer db.Close()

	storedUser, err := repository.GetUserByUsername(db, user.Username)
	if err != nil {
		fmt.Print(("1"))
		http.Error(w, "Invalid username or password", http.StatusUnauthorized)
		return
	}

	if !CheckPasswordHash(user.Password, storedUser.Password) {
		fmt.Print(("invalid user or pasword"))
		fmt.Println(user.Password)
		fmt.Println(storedUser.Password)
		http.Error(w, "Invalid username or password", http.StatusUnauthorized)
		return
	}

	session, err := store.Get(r, "session-name")
	if err != nil {
		fmt.Print("2")
		http.Error(w, "Could not get session", http.StatusInternalServerError)
		return
	}

	// Establecer valores en la sesión
	session.Values["userID"] = storedUser.ID
	session.Values["username"] = storedUser.Username

	// Guardar la sesión y manejar posibles errores
	if err := session.Save(r, w); err != nil {          
		http.Error(w, "Could not save session", http.StatusInternalServerError)
		return
	}

	// Generar y enviar el token después de guardar la sesión
	token, err := services.GenerateJWT(storedUser)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(map[string]string{"token": token})

	// Impresión de valores para depuración
	fmt.Println(session.Values["userID"])

}
