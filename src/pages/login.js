import {
  createButton, createInput, createGoogleButton, setStorage,
} from '../lib/utils';
import { loginWithGoogle, loginWithEmailAndPassword } from '../firebase/auth';

export const Login = (navigate) => {
  const body = document.createElement('div');

  const setUpHeader = (node) => {
    const header = document.createElement('header');
    header.classList.add('login_header');
    header.innerHTML = `
      <img src="../assets/trippy-tips.png" />
    `;

    node.append(header);
  };

  const setUpMainSection = (node) => {
    const section = document.createElement('section');
    section.classList.add('login_section');

    const [emailNode, emailInput] = createInput('Correo', 'email');
    const [passwordNode, passwordInput] = createInput('Contraseña', 'password', 'password');

    const registerAction = () => {
      navigate('/registro');
    };

    const loginAction = async () => {
      try {
        const { user } = await loginWithEmailAndPassword(emailInput.value, passwordInput.value);
        setStorage('auth', {
          email: user.email,
          id: user.uid,
        });
        navigate('/home');
      } catch (error) {
        console.log('ERROR');
        console.log(error);
      }
    };

    const buttonsSection = document.createElement('div');
    buttonsSection.classList.add('login_section_buttons');
    const loginButton = createButton('Login', 'login', loginAction);
    const registerButton = createButton('Registrarse', 'register', registerAction);

    const loginGoogle = createGoogleButton();

    buttonsSection.append(loginButton, loginGoogle, registerButton);
    loginGoogle.addEventListener('click', async () => {
      const user = await loginWithGoogle();
      setStorage('auth', user);
      navigate('/home');
    });

    section.append(emailNode, passwordNode, buttonsSection);

    node.append(section);
  };

  setUpHeader(body);
  setUpMainSection(body);

  return body;
};
