package models

type Car struct {
	ID          int    `json:"id"`
	Categori    string `json:"categori"`
	Nombre      string `json:"name"`
	Imagen      string `json:"img"`
	Precio      int    `json:"price"`
	Color       string `json:"color"`
	Materiales  string `json:"materiales"`
	Medidas     string `json:"medidas"`
	Descripcion string `json:"descripcion"`
}