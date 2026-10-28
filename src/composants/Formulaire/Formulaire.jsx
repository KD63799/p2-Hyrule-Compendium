import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik"; // Import des composants Formik
import * as Yup from "yup"; // Import de Yup pour la validation du formulaire
import "./Formulaire.css"; // Import du fichier CSS pour le style
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import itemGetSound from "../../assets/videos/High_Value_Item_Get_The_Legend_of_Zelda_Breath_of_the_Wild_OST.mp3";

// Le mot de passe ne doit pas contenir le nom ou le prénom saisis
const notContaining = (field) =>
  function (value) {
    const other = this.parent[field]?.trim().toLowerCase();
    return !other || !value?.toLowerCase().includes(other);
  };

// Schéma de validation du formulaire avec Yup
const validationSchema = Yup.object().shape({
  Nom: Yup.string().trim().required("Veuillez saisir votre nom"), // Champ nom requis
  Prenom: Yup.string().trim().required("Veuillez saisir votre prénom"), // Champ prénom requis
  email: Yup.string()
    .email("L'adresse mail est incorrecte") // Doit être une adresse email valide
    .required("Veuillez saisir votre adresse mail"), // Champ email requis
  password: Yup.string()
    .required("Veuillez saisir votre mot de passe") // Champ mot de passe requis
    .min(8, "Le mot de passe doit contenir au moins 8 caractères") // Doit contenir au moins 8 caractères
    .matches(/[A-Z]/, "Le mot de passe doit contenir au moins une lettre majuscule") // Doit contenir une lettre majuscule
    .test("no-nom", "Le mot de passe ne peut pas contenir votre nom", notContaining("Nom"))
    .test("no-prenom", "Le mot de passe ne peut pas contenir votre prénom", notContaining("Prenom")),
});

const fields = [
  { name: "Nom", type: "text", label: "Nom", placeholder: "Saisissez votre nom", autoComplete: "family-name" },
  { name: "Prenom", type: "text", label: "Prénom", placeholder: "Saisissez votre prénom", autoComplete: "given-name" },
  { name: "email", type: "email", label: "Adresse mail", placeholder: "Saisissez votre adresse mail", autoComplete: "email" },
  { name: "password", type: "password", label: "Mot de passe", placeholder: "Saisissez votre mot de passe", autoComplete: "new-password" },
];

const Formulaire = ({ onClose }) => {
  const [isSent, setIsSent] = useState(false);

  // Joue le jingle « objet obtenu » lors de la soumission réussie du formulaire
  const playAudio = () => {
    const audio = new Audio(itemGetSound);
    audio.volume = 0.6;
    audio.play().catch(() => {});
  };

  return (
    <div className="container" onClick={onClose}>
      <div
        className="form-container"
        role="dialog"
        aria-labelledby="form-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="icon-btn form-close-btn" aria-label="Fermer le formulaire" onClick={onClose}>
          <FontAwesomeIcon id="form-close" className="text-grey form-close" icon={faTimes} />
        </button>
        <h1 id="form-title">Formulaire</h1>

        {isSent ? (
          <div className="form-success" role="status">
            <p>Formulaire réussi !</p>
            <p className="color-stats">Votre lettre a bien été envoyée au village Kokiri.</p>
            <button type="button" className="btn-gold" onClick={() => setIsSent(false)}>
              Nouveau message
            </button>
          </div>
        ) : (
          <Formik
            initialValues={{ Nom: "", Prenom: "", email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              playAudio();
              resetForm();
              setSubmitting(false);
              setIsSent(true);
            }}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className="formulaire" noValidate>
                {fields.map((field) => (
                  <div className="form-field" key={field.name}>
                    <label htmlFor={`form-${field.name}`}>{field.label}</label>
                    <Field
                      id={`form-${field.name}`}
                      className={`input ${errors[field.name] && touched[field.name] ? "error-touched" : ""}`}
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      autoComplete={field.autoComplete}
                    />
                    <ErrorMessage name={field.name} component="div" className="error-message" />
                  </div>
                ))}
                <button type="submit" className="btn-gold" disabled={isSubmitting}>
                  Envoyer
                </button>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default Formulaire; // Export du composant Formulaire
