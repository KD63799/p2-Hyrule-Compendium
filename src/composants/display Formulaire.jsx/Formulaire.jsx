import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Formulaire.css";

function Formulaire() {
  const validationSchema = Yup.object().shape({
    Nom: Yup.string().required("Veuillez saisir votre nom"),
    Prenom: Yup.string().required("Veuillez saisir votre prénom"),
    email: Yup.string()
      .email("L'adresse mail est incorrecte")
      .required("Veuillez saisir votre adresse mail"),
    password: Yup.string()
      .required("Veuillez saisir votre mot de passe")
      .matches(/[A-Z]/, "Le mot de passe doit contenir au moins une lettre majuscule")
      .notOneOf([Yup.ref("Nom"), Yup.ref("Prenom")], "Le mot de passe ne peut pas contenir votre nom ou votre prénom")
      .test("minLength", "Le mot de passe doit contenir au moins 8 caractères", (value) => value && value.length >= 8),
  });

  const playAudio = () => {
    const audio = new Audio("src/assets/video/High Value Item Get (The Legend of Zelda Breath of the Wild OST).mp3");
    audio.play();
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1>Formulaire</h1>
        <Formik
          initialValues={{ Nom: "", Prenom: "", email: "", password: "" }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              if (!isMusicPlayed && Object.keys(errors).length === 0) { // Vérifier si la musique n'a pas déjà été jouée et s'il n'y a pas d'erreurs de validation
                playAudio();
              }
              setSubmitting(false);
            }, 50);
          }}
          validationSchema={validationSchema}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <Field
                className={`input ${errors.Nom && touched.Nom && "error-touched"}`}
                type="text"
                name="Nom"
                placeholder="Saisissez votre nom"
              />
              <ErrorMessage name="Nom" component="div" className="error-message" />
              <Field
                className={`input ${errors.Prenom && touched.Prenom && "error-touched"}`}
                type="text"
                name="Prenom"
                placeholder="Saisissez votre prénom"
              />
              <ErrorMessage name="Prenom" component="div" className="error-message" />
              <Field
                className={`input ${errors.email && touched.email && "error-touched"}`}
                type="email"
                name="email"
                placeholder="Saisissez votre adresse mail"
              />
              <ErrorMessage name="email" component="div" className="error-message" />
              <Field
                className={`input ${errors.password && touched.password && "error-touched"}`}
                type="password"
                name="password"
                placeholder="Saisissez votre mot de passe"
              />
              <ErrorMessage name="password" component="div" className="error-message" />
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
