import { createButton, createInput } from '../lib/utils';
import { createUser } from '../firebase/auth';

export const Register = (navigate) => {
  const body = document.createElement('div');

  const setUpHeader = (node) => {
    const header = document.createElement('header');
    header.classList.add('register_header');
    header.innerHTML = `
      <img src="../assets/register.jpg" />
    `;
    node.append(header);
  };

  const setUpMainSection = (node) => {
    const section = document.createElement('section');
    section.classList.add('register_section');

    const loginMessage = document.createElement('label');
    loginMessage.innerText = 'Ya tienes cuenta?';
    loginMessage.classList.add('center');

    const [emailNode, emailInput] = createInput('Correo', 'email');
    const [passwordNode, passwordInput] = createInput('Contraseña', 'password', 'password');

    const registerAction = async () => {
      try {
        await createUser(emailInput.value, passwordInput.value);
      } catch (error) {
        console.log('ERROR');
        console.log(error);
      }
      navigate('/registro');
    };

    const loginAction = () => {
      navigate('/');
    };

    const buttonsSection = document.createElement('div');
    buttonsSection.classList.add('register_section_buttons');
    const registerButton = createButton('Registrarse', 'register', registerAction);
    const loginButton = createButton('Ingresa', 'login', loginAction);
    buttonsSection.append(registerButton, loginMessage, loginButton);

    section.append(emailNode, passwordNode, buttonsSection);

    node.append(section);
  };

  setUpHeader(body);
  setUpMainSection(body);

  return body;
};
