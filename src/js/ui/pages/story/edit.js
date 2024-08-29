import NavLinkApp from '../../components/AppBar/navbar-link';
import BrandNameApp from '../../components/component/brandname';
import CheckUserAuth from '../auth/check-user-auth';
import Story from '../../../network/story';

const Edit = {
  async init() {
    CheckUserAuth.checkLoginState();
    await this._initialData();
    this._initialListener();
  },

  async _initialData() {
    const storyId = this._getStoryId();

    if (!storyId) {
      alert('Data with the requested ID was not found');
      return;
    }

    try {
      const response = await Story.getById(storyId);
      const storyRecord = response.data.story;
      if (storyRecord) {
        this._populateStoryToForm(storyRecord);
      } else {
        alert('Story with the requested ID was not found');
      }
    } catch (error) {
      console.error('An error occurred while fetching data:', error);
    }
  },

  _initialListener() {
    const evidenceInput = document.querySelector('#validationCustomEvidence');
    evidenceInput.addEventListener('change', () => {
      this._updatePhotoPreview();
    });

    const editRecordForm = document.querySelector('#editRecordForm');
    editRecordForm.addEventListener(
      'submit',
      (event) => {
        event.preventDefault();
        event.stopPropagation();

        editRecordForm.classList.add('was-validated');
        this._sendPost();
      },
      false,
    );
  },

  // Example of error handling for the update request
  async _sendPost() {
    const formData = this._getFormData();
    console.log('Form Data:', formData);

    if (this._validateFormData({ ...formData })) {
      try {
        const response = await Story.update({
          id: this._getStoryId(),
          ...formData,
        });
        console.log('Update Response:', response); // Log response

        if (response.status === 200) {
          window.alert(`Transaction with id ${this._getStoryId()} has been edited`);
          this._goToDashboardPage();
        } else {
          console.error('Update failed:', response);
          alert('Failed to update the story. Please try again.');
        }
      } catch (error) {
        console.error('An error occurred while updating data:', error);
        alert('An error occurred while updating the story. Please try again.');
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
      date,
      description: descriptionInput.value,
      photo: evidenceInput.files[0],
    };
  },

  _updatePhotoPreview() {
    const evidenceImg = document.querySelector('#validationCustomEvidenceImg');
    const evidenceImgChange = document.querySelector('#validationCustomEvidenceImgChange');
    const evidenceImgInput = document.querySelector('#validationCustomEvidence');

    const photo = evidenceImgInput.files[0];
    if (!photo) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      evidenceImg.classList.add('d-none');
      evidenceImgChange.classList.remove('d-none');
      evidenceImgChange.style.backgroundImage = `url('${event.target.result}')`;
    };

    reader.readAsDataURL(photo);
  },

  _populateStoryToForm(storyRecord) {
    const nameInput = document.querySelector('#validationCustomName');
    const dateInput = document.querySelector('#validationCustomDate');
    const descriptionInput = document.querySelector('#validationCustomDesc');
    const evidenceImg = document.querySelector('#validationCustomEvidenceImg');

    nameInput.value = storyRecord.name || '';
    dateInput.value = new Date(storyRecord.createdAt).toISOString().slice(0, 16);
    descriptionInput.value = storyRecord.description || '';
    evidenceImg.setAttribute('src', storyRecord.photoUrl || '');
    evidenceImg.setAttribute('alt', storyRecord.name || 'Image not available');
  },

  _validateFormData(formData) {
    const formDataFiltered = Object.values(formData).filter((item) => item === '');
    return formDataFiltered.length === 0;
  },

  _getStoryId() {
    const searchParamEdit = new URLSearchParams(window.location.search);
    return searchParamEdit.has('id') ? searchParamEdit.get('id') : null;
  },

  _goToDashboardPage() {
    window.location.href = '/';
  },
};

export default Edit;
