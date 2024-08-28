import NavLinkApp from "../../components/AppBar/navbar-link";
import BrandNameApp from "../../components/component/brandname"; 
import CheckUserAuth from '../auth/check-user-auth';

const Edit = {
    async init() {
        CheckUserAuth.checkLoginState();
 
        await this._initialUI();
        await this._initialData();
        this._initialListener();
    },

    async _initialData() {
        const storyId = this._getStoryId();
    
        if (!storyId) {
            alert('Data dengan ID yang dicari tidak ditemukan');
            return;
        }
    
        try {
            const fetchRecords = await fetch('/data/DATA.json');
            if (!fetchRecords.ok) {
                throw new Error('Network response was not ok.');
            }
            const responseRecords = await fetchRecords.json();
            const userStoryHistory = responseRecords.listStory; // Sesuaikan dengan struktur JSON yang benar
    
            const dataRecord = userStoryHistory.find((item) => item.id === storyId);
    
            if (dataRecord) {
                this._populateStoryToForm(dataRecord);
            } else {
                alert('Story dengan ID yang dicari tidak ditemukan');
            }
        } catch (error) {
            console.error('Terjadi kesalahan saat mengambil data:', error);
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

    _sendPost() {
        const formData = this._getFormData();


        if (this._validateFormData({
                ...formData
            })) {
            console.log('formData');
            console.log(formData);


            // this._goToDashboardPage();
        }
    },

    _getFormData() {
        const nameInput = document.querySelector('#validationCustomName');
        const evidenceInput = document.querySelector('#validationCustomEvidence');
        const descriptionInput = document.querySelector('#validationCustomDesc');
        const dateInput = document.querySelector('#validationCustomDate');

        return {
            name: nameInput.value,
            createdAt: new Date(dateInput.value),
            description: descriptionInput.value,
            photoUrl: evidenceInput.files[0], // file disimpan untuk diolah
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

    _populateStoryToForm(storyRecord = null) {
        if (!(typeof storyRecord === 'object')) {
            throw new Error(`Parameter storyRecord harus berupa objek. Nilainya adalah ${storyRecord}`);
        }

        const nameInput = document.querySelector('#validationCustomName');
        const dateInput = document.querySelector('#validationCustomDate');
        const descriptionInput = document.querySelector('#validationCustomDesc');
        const evidenceImg = document.querySelector('#validationCustomEvidenceImg');

        nameInput.value = storyRecord.name;
        dateInput.value = new Date(storyRecord.createdAt).toISOString().slice(0, 16);
        descriptionInput.value = storyRecord.description;
        evidenceImg.setAttribute('src', storyRecord.photoUrl);
        evidenceImg.setAttribute('alt', storyRecord.name);
    },

    _validateFormData(formData) {
        delete formData.photoUrl;
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
