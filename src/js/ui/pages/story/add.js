import '../../../../sass/add.scss';
import '../../../../sass/main.scss';
import NavLinkApp from '../../components/AppBar/navbar-link';
import inputimage from '../../components/forms/input-image';
import BrandNameApp from '../../components/component/brandname';
import Alertmsg from '../../components/component/alert';
import Spinner from '../../components/component/spinner';
import CheckUserAuth from '../auth/check-user-auth';
import Story from '../../../network/story';

const Add = {
  async init() {
    CheckUserAuth.checkLoginState();
    this._initialListener();
  },

  _initialListener() {
    const addFormRecord = document.querySelector('#addRecordForm');
    addFormRecord.addEventListener(
      'submit',
      (event) => {
        event.preventDefault();
        event.stopPropagation();

        addFormRecord.classList.add('was-validated');
        this._sendPost();
      },
      false,
    );
  },

  async _sendPost() {
    const formData = this._getFormData();

    console.log('Form Data:', formData); // Tambahkan log untuk debugging

    if (this._validateFormData({ ...formData })) {
      try {
        const response = await Story.store(formData);
        console.log('Store Response:', response); // Tambahkan log untuk debugging
        window.alert('New story added successfully');
        this._goToDashboardPage();
      } catch (error) {
        console.error('Error storing story:', error.message);
      }
    }
  },

  _getFormData() {
    const nameInput = document.querySelector('#validationCustomName');
    const evidenceInput = document.querySelector('#validationCustomEvidence');
    const descriptionInput = document.querySelector('#validationCustomDesc');
    const date = new Date().toISOString();

    return {
      name: nameInput.value,
      createdAt: date,
      description: descriptionInput.value,
      photo: evidenceInput.files[0],
    };
  },

  _updatePhotoPreview() {
    const evidenceImgChange = document.querySelector('#validationCustomEvidenceImgChange');
    const evidenceImgInput = document.querySelector('#validationCustomEvidence');
    const photo = evidenceImgInput.files[0];
    if (!photo) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      evidenceImgChange.parentElement.classList.remove('d-none');
      evidenceImgChange.style.backgroundImage = `url('${event.target.result}')`;
    };

    reader.readAsDataURL(photo);
  },

  _validateFormData(formData) {
    return Object.values(formData).every((item) => item !== '');
  },

  async _getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  },

  _goToDashboardPage() {
    window.location.href = '/';
  },
};

export default Add;
