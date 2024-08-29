import Auth from '../../../network/auth';
import InputWithValidation from '../../components/forms/InputWithValidation';
import Config from '../../../config/config';
import Utils from '../../../utils/utils';
import CheckUserAuth from './check-user-auth';
import '../../../../sass/login.scss';
import Spinner from '../../components/component/spinner';

const Login = {
  async init() {
    CheckUserAuth.checkLoginState();

    this._initialListener();
  },

  _initialListener() {
    const loginForm = document.querySelector('#loginForm');
    const togglePassword = document.querySelector('#togglePassword');
    const passwordInput = document.querySelector('#validationCustomPassword');
    const spinner = document.querySelector('.spinner-load');

    loginForm.addEventListener(
      'submit',
      async (event) => {
        event.preventDefault();
        event.stopPropagation();

        loginForm.classList.add('was-validated');

        // Tampilkan spinner
        spinner.style.display = 'block';

        await this._getLogged();

        // Sembunyikan spinner setelah proses selesai
        spinner.style.display = 'none';
      },
      false,
    );

    if (togglePassword && passwordInput) {
      togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);

        const eyeIcon = togglePassword.querySelector('i');
        if (type === 'password') {
          eyeIcon.classList.remove('fa-eye-slash');
          eyeIcon.classList.add('fa-eye');
        } else {
          eyeIcon.classList.remove('fa-eye');
          eyeIcon.classList.add('fa-eye-slash');
        }
      });
    }
  },

  async _getLogged() {
    const formData = this._getFormData();

    if (this._validateFormData({ ...formData })) {
      try {
        const response = await Auth.login({
          email: formData.email,
          password: formData.password,
        });
        Utils.setUserToken(Config.USER_TOKEN_KEY, response.data.loginResult.token);
        sessionStorage.setItem('userName', response.data.loginResult.name); // Store user's name in session storage
        window.alert('Signed user in detected');
        this._goToDashboardPage();
      } catch (error) {
        console.error(error?.response?.data?.message);
      }
    }
  },

  _getFormData() {
    const email = document.querySelector('#validationCustomRecordEmail');
    const password = document.querySelector('#validationCustomPassword');

    return {
      email: email.value,
      password: password.value,
    };
  },

  _validateFormData(formData) {
    const formDataFiltered = Object.values(formData).filter((item) => item === '');

    if (formData.password.length < 8) {
      window.alert('Password must be at least 8 characters long');
      return false;
    }

    return formDataFiltered.length === 0;
  },

  _goToDashboardPage() {
    window.location.href = '/';
  },
};

export default Login;
