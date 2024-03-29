import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik"; // Import des composants Formik
import * as Yup from "yup"; // Import de Yup pour la validation du formulaire
import "./Formulaire.css"; // Import du fichier CSS pour le style
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'; 

const Formulaire = ({ isFormVisible, setIsFormVisible }) => { // Renommage de la fonction Formulaire et utilisation d'une fonction fléchée
  const [isMusicPlayed, setIsMusicPlayed] = useState(false); // État pour vérifier si la musique a été jouée

  // Fonction pour inverser la visibilité du formulaire
  const handleSortClose = () => {
    setIsFormVisible(!isFormVisible);
  };

  // Schéma de validation du formulaire avec Yup
  const validationSchema = Yup.object().shape({
    Nom: Yup.string().required("Veuillez saisir votre nom"), // Champ nom requis
    Prenom: Yup.string().required("Veuillez saisir votre prénom"), // Champ prénom requis
    email: Yup.string()
      .email("L'adresse mail est incorrecte") // Doit être une adresse email valide
      .required("Veuillez saisir votre adresse mail"), // Champ email requis
    password: Yup.string()
      .required("Veuillez saisir votre mot de passe") // Champ mot de passe requis
      .matches(/[A-Z]/, "Le mot de passe doit contenir au moins une lettre majuscule") // Doit contenir une lettre majuscule
      .notOneOf([Yup.ref("Nom"), Yup.ref("Prenom")], "Le mot de passe ne peut pas contenir votre nom ou votre prénom") // Ne doit pas contenir le nom ou le prénom
      .min(8, "Le mot de passe doit contenir au moins 8 caractères"), // Doit contenir au moins 8 caractères
  });

  // Fonction pour jouer l'audio lors de la soumission réussie du formulaire
  const playAudio = () => {
    const audio = new Audio("/src/assets/video/High Value Item Get (The Legend of Zelda Breath of the Wild OST).mp3");
    audio.play();
    audio.onended = () => {
      setIsMusicPlayed(true);
    };
  };

  return (
    <>
      {isFormVisible && ( // Si le formulaire est visible...
        <div className={`container ${isFormVisible ? "isFormVisible" : ""}`} > {/* Conteneur principal du formulaire */}
          <div className="form-container"> {/* Conteneur du formulaire */}
            <FontAwesomeIcon id="form-close" className="text-grey end form-close" icon={faTimes} onClick={handleSortClose}/>
            <h1>Formulaire</h1> {/* Titre du formulaire */}
            {/* Composant Formik pour gérer le formulaire */}
            <Formik
              initialValues={{ Nom: "", Prenom: "", email: "", password: "" }} // Valeurs initiales des champs
              onSubmit={(values, { setSubmitting, resetForm }) => { // Fonction appelée lors de la soumission du formulaire
                setTimeout(() => {
                  validationSchema
                    .validate(values) // Validation des valeurs du formulaire
                    .then(() => { // Si la validation réussit
                      alert("formulaire réussi"); // Affiche une alerte indiquant que le formulaire est réussi
                      if (!isMusicPlayed) { // Si la musique n'a pas encore été jouée
                        playAudio(); // Joue l'audio
                      }
                      setSubmitting(false); // Définit isSubmitting à false
                      resetForm(); // Réinitialise les valeurs du formulaire
                      setIsMusicPlayed(false); // Réinitialise l'état de lecture de la musique
                    })
                    .catch((errors) => { // Si la validation échoue
                      console.error("Validation errors:", errors); // Affiche les erreurs de validation dans la console
                      setSubmitting(false); // Définit isSubmitting à false
                    });
                }, 0); // Délai de 0 millisecondes avant la validation
              }}
              validationSchema={validationSchema} // Schéma de validation utilisé par Formik
            >
              {({ isSubmitting, errors, touched }) => ( // Rendu conditionnel des composants en fonction de l'état de soumission
                <Form className="formulaire"> {/* Composant Form pour le formulaire */}
                  <Field
                    className={`input ${errors.Nom && touched.Nom && "error-touched"}`} // Ajoute la classe "error-touched" si le champ a été touché et contient des erreurs
                    type="text"
                    name="Nom"
                    placeholder="Saisissez votre nom"
                  />
                  <ErrorMessage name="Nom" component="div" className="error-message" /> {/* Affiche les messages d'erreur pour le champ nom */}
                  <Field
                    className={`input ${errors.Prenom && touched.Prenom && "error-touched"}`} // Ajoute la classe "error-touched" si le champ a été touché et contient des erreurs
                    type="text"
                    name="Prenom"
                    placeholder="Saisissez votre prénom"
                  />
                  <ErrorMessage name="Prenom" component="div" className="error-message" /> {/* Affiche les messages d'erreur pour le champ prénom */}
                  <Field
                    className={`input ${errors.email && touched.email && "error-touched"}`} // Ajoute la classe "error-touched" si le champ a été touché et contient des erreurs
                    type="email"
                    name="email"
                    placeholder="Saisissez votre adresse mail"
                  />
                  <ErrorMessage name="email" component="div" className="error-message" /> {/* Affiche les messages d'erreur pour le champ email */}
                  <Field
                    className={`input ${errors.password && touched.password && "error-touched"}`} // Ajoute la classe "error-touched" si le champ a été touché et contient des erreurs
                    type="password"
                    name="password"
                    placeholder="Saisissez votre mot de passe"
                  />
                  <ErrorMessage name="password" component="div" className="error-message" /> {/* Affiche les messages d'erreur pour le champ mot de passe */}
                  <button type="submit" disabled={isSubmitting}> {/* Bouton de soumission du formulaire */}
                    Envoyer
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </>
  );
}

export default Formulaire; // Export du composant Formulaire