import { Formik, Form, Field, ErrorMessage } from "formik"; // Importation des composants nécessaires de Formik
import * as Yup from "yup"; // Importation de Yup pour la validation du schéma
import  './Formulaire.css'


function Formulaire() { // Définition du composant Formulaire
  const validationSchema = Yup.object().shape({ // Définition du schéma de validation avec Yup
    Nom: Yup.string().required("Veuillez saisir votre nom"), // Validation du champ "Nom" : obligatoire
    Prenom: Yup.string().required("Veuillez saisir votre prénom"), // Validation du champ "Prenom" : obligatoire
    email: Yup.string().email("L'adresse mail est incorrecte").required("Veuillez saisir votre adresse mail"), // Validation du champ "email" : obligatoire et doit être un email valide
    password: Yup.string() // Validation du champ "password"
      .required("Veuillez saisir votre mot de passe") // obligatoire
      .matches(/[A-Z]/, "Le mot de passe doit contenir au moins une lettre majuscule") // doit contenir au moins une lettre majuscule
      .notOneOf([Yup.ref('Nom'), Yup.ref('Prenom')], "Le mot de passe ne peut pas contenir votre nom ou votre prénom") // ne doit pas contenir le nom ou le prénom
      .test("minLength", "Le mot de passe doit contenir au moins 8 caractères", (value) => value && value.length >= 8) // doit contenir au moins 8 caractères
  });

  return (
    <div className="container"> 
      <div className="form-container"> 
        <h1>Formulaire</h1> 
        <Formik // Utilisation du composant Formik pour gérer le formulaire
          initialValues={{ Nom: "", Prenom: "", email: "", password: "" }} // Valeurs initiales du formulaire
          onSubmit={(values, { setSubmitting }) => { // Fonction appelée lors de la soumission du formulaire
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2)); // Affichage des valeurs soumises dans une alerte
              setSubmitting(false); // Fin de la soumission
            }, 100);
          }}
          validationSchema={validationSchema} // Utilisation du schéma de validation défini précédemment
        >
          {({ isSubmitting, errors, touched }) => ( // Fonction de rendu avec les paramètres fournis par Formik
            <Form> 
              <Field className={`input ${errors.Nom && touched.Nom && "error-touched"}`} type="text" name="Nom" placeholder="Saisissez votre nom" /> 
              <ErrorMessage name="Nom" component="div" className="error-message" /> 
              <Field className={`input ${errors.Prenom && touched.Prenom && "error-touched"}`} type="text" name="Prenom" placeholder="Saisissez votre prénom" /> 
              <ErrorMessage name="Prenom" component="div" className="error-message" /> 
              <Field className={`input ${errors.email && touched.email && "error-touched"}`} type="email" name="email" placeholder="Saisissez votre adresse mail" /> 
              <ErrorMessage name="email" component="div" className="error-message" /> 
              <Field className={`input ${errors.password && touched.password && "error-touched"}`} type="password" name="password" placeholder="Saisissez votre mot de passe" /> 
              <ErrorMessage name="password" component="div" className="error-message" />
              <button type="submit" disabled={isSubmitting}> 
                Envoyer
              </button>
            </Form> // Fin du formulaire
          )}
        </Formik> 
      </div> 
    </div> // Fin du conteneur principal
  );
}

export default Formulaire; // Exportation du composant Formulaire
