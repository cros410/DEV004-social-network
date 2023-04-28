// importamos la funcion que vamos a testear
import { Login } from '../src/pages/login';
import { loginWithEmailAndPassword } from '../src/firebase/auth';

jest.mock('../src/firebase/auth');

describe('En la pantalla de Login', () => {
  const root = document.createElement('div');
  root.id = 'root';

  beforeEach(() => {
    root.innerHTML = '';
  });

  it('debería verse el campo vacio para ingresar el correo y contraseña', () => {
    root.append(Login());
    document.body.append(root);

    const { value: email } = document.getElementById('email');
    const { value: password } = document.getElementById('password');

    expect(email).toBe('');
    expect(password).toBe('');
  });

  it('debería redirigirlo a la pantalla de registro cuando presione el botón de "Registrarse"', () => {
    const navigate = jest.fn();

    root.append(Login(navigate));
    document.body.append(root);

    const button = document.getElementById('register');
    button.dispatchEvent(new Event('click'));
    expect(navigate).toHaveBeenCalledWith('/registro');
  });

  it('debería redirigirlo a la pantalla de Home cuando ingrese credenciales correctas de acceso', async () => {
    const navigate = jest.fn();

    root.append(Login(navigate));
    document.body.append(root);

    const button = document.getElementById('login');
    loginWithEmailAndPassword.mockResolvedValue({ user: { id: '1', email: 'email@gmail.com' } });
    button.dispatchEvent(new Event('click'));
    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(navigate).toHaveBeenCalledWith('/home');
  });
});
