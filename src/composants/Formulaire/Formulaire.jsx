import React, { useState } from "react"; // Import des fonctions useState de React pour gérer l'état local
import { Formik, Form, Field, ErrorMessage } from "formik"; // Import des composants Formik pour construire le formulaire
import * as Yup from "yup"; // Import de Yup pour la validation des schémas
import "./Formulaire.css"; // Import du fichier CSS pour les styles du formulaire

function Formulaire() {
  // Utilisation du hook useState pour gérer l'état local de isMusicPlayed
  const [isMusicPlayed, setIsMusicPlayed] = useState(false);

  // Définition du schéma de validation avec Yup
  const validationSchema = Yup.object().shape({
    Nom: Yup.string().required("Veuillez saisir votre nom"), // Champ "Nom" requis
    Prenom: Yup.string().required("Veuillez saisir votre prénom"), // Champ "Prenom" requis
    email: Yup.string()
      .email("L'adresse mail est incorrecte")
      .required("Veuillez saisir votre adresse mail"), // Champ "email" requis et doit être une adresse mail valide
    password: Yup.string()
      .required("Veuillez saisir votre mot de passe") // Champ "password" requis
      .matches(/[A-Z]/, "Le mot de passe doit contenir au moins une lettre majuscule") // Doit contenir au moins une lettre majuscule
      .notOneOf([Yup.ref("Nom"), Yup.ref("Prenom")], "Le mot de passe ne peut pas contenir votre nom ou votre prénom") // Ne doit pas contenir le nom ou le prénom
      .test("minLength", "Le mot de passe doit contenir au moins 8 caractères", (value) => value && value.length >= 8), // Doit contenir au moins 8 caractères
  });

  // Fonction pour jouer la musique
  const playAudio = () => {
    const audio = new Audio("src/assets/video/High Value Item Get (The Legend of Zelda Breath of the Wild OST).mp3");
    audio.play(); // Lecture de la musique
    audio.onended = () => {
      setIsMusicPlayed(true); // Une fois la musique terminée, setIsMusicPlayed est mis à true
    };
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1>Formulaire</h1>
        {/* Utilisation de Formik pour gérer le formulaire */}
        <Formik
          initialValues={{ Nom: "", Prenom: "", email: "", password: "" }} // Initialisation des valeurs du formulaire
          onSubmit={(values, { setSubmitting, resetForm }) => { // Fonction exécutée lors de la soumission du formulaire
            setTimeout(() => { // Utilisation de setTimeout pour simuler un délai
              validationSchema.validate(values).then(() => { // Validation des valeurs avec Yup
               alert("formulaire reussi")// affichage du d'alerte apres la soumission du formulaire
                if (!isMusicPlayed) { // Si la musique n'a pas déjà été jouée
                  playAudio(); // Joue la musique
                }
                setSubmitting(false); // Définit isSubmitting à false après la soumission
                resetForm(); // Réinitialise le formulaire
                setIsMusicPlayed(false); // Réinitialise isMusicPlayed à false
              }).catch((errors) => { // S'il y a des erreurs de validation
                console.error("Validation errors:", errors); // Affiche les erreurs de validation dans la console
                setSubmitting(false); // Définit isSubmitting à false après la soumission
              });
            }, 50); // Délai de 50 millisecondes
          }}
          validationSchema={validationSchema} // Utilisation du schéma de validation défini avec Yup
        >
          {({ isSubmitting, errors, touched }) => ( // Fonction de rendu avec les valeurs de Formik
            <Form> {/* Utilisation du composant Form de Formik pour le formulaire */}
              {/* Champ de saisie pour le nom */}
              <Field
                className={`input ${errors.Nom && touched.Nom && "error-touched"}`}
                type="text"
                name="Nom"
                placeholder="Saisissez votre nom"
              />
              <ErrorMessage name="Nom" component="div" className="error-message" /> {/* Affichage des erreurs de validation pour le nom */}
              {/* Champ de saisie pour le prénom */}
              <Field
                className={`input ${errors.Prenom && touched.Prenom && "error-touched"}`}
                type="text"
                name="Prenom"
                placeholder="Saisissez votre prénom"
              />
              <ErrorMessage name="Prenom" component="div" className="error-message" /> {/* Affichage des erreurs de validation pour le prénom */}
              {/* Champ de saisie pour l'email */}
              <Field
                className={`input ${errors.email && touched.email && "error-touched"}`}
                type="email"
                name="email"
                type="email"
                name="email"
                placeholder="Saisissez votre adresse mail"
              />
              <ErrorMessage name="email" component="div" className="error-message" /> {/* Affichage des erreurs de validation pour l'email */}
              {/* Champ de saisie pour le mot de passe */}
              <Field
                className={`input ${errors.password && touched.password && "error-touched"}`}
                type="password"
                name="password"
                placeholder="Saisissez votre mot de passe"
              />
              <ErrorMessage name="password" component="div" className="error-message" /> {/* Affichage des erreurs de validation pour le mot de passe */}
              <button type="submit" disabled={isSubmitting}>
                Envoyer
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Formulaire;

