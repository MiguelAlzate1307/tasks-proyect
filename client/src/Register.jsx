import "./css/Register.css";
import { Nav } from "./Navigation.jsx";

export default function Register() {
  return (
    <>
      <Nav />
      <div className="container">
        <h1>Registro</h1>
        <form action={"/"}>
          <label htmlFor="user">Ingrese su nombre de usuario:</label>
          <input
            type="text"
            id="user"
            name="user"
            placeholder="Nombre de usuario"
            required
          />
          <label htmlFor="email">Ingrese su correo electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Correo electrónico"
            required
          />
          <label htmlFor="password">Ingrese su contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Contraseña"
            minLength={6}
            required
          />
          <button type="submit">Registrarse</button>
          <label htmlFor="login">
            Ya tienes una cuenta?{" "}
            <a href="/login" name="login">
              Inicia sesión
            </a>
          </label>
        </form>
      </div>
    </>
  );
}
