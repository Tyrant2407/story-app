import "../../../../sass/add.scss";
import "../../../../sass/main.scss";
import NavLinkApp from "../../components/AppBar/navbar-link";
import inputimage from "../../components/forms/input-image";
import BrandNameApp from "../../components/component/brandname"; 
import Alertmsg from "../../components/component/alert"; 

const Add = {
    async init() {
        this._initialListener();
    },

    _initialListener() {
        const evidenceInput = document.querySelector('#validationCustomEvidence');
        evidenceInput.addEventListener('change', () => {
            this._updatePhotoPreview();
        });

        const addFormRecord = document.querySelector('#addRecordForm');
        addFormRecord.addEventListener(
            'submit',
            async (event) => {
                event.preventDefault();
                event.stopPropagation();

                addFormRecord.classList.add('was-validated');
                await this._sendPost(); // Tunggu sampai proses selesai
            },
            false,
        );
    },

    async _sendPost() {
        const formData = this._getFormData();
        if (this._validateFormData({ ...formData })) {
            const photoUrl = await this._getBase64(formData.photoUrl); // Tunggu konversi ke base64
            const existingData = JSON.parse(localStorage.getItem('userListStory')) || [];
            const data = {
                ...formData,
                photoUrl,
            };
            existingData.push(data);
            localStorage.setItem('userListStory', JSON.stringify(existingData));
            this._goToDashboardPage();
        }
    },

    _getFormData() {
        const nameInput = document.querySelector('#validationCustomName');
        const evidenceInput = document.querySelector('#validationCustomEvidence');
        const descriptionInput = document.querySelector('#validationCustomDesc');
        var date = new Date().toISOString();

        return {
            id: `story-${Math.random().toString(36).substring(2, 18)}`,
            name: nameInput.value,
            createdAt: date,
            description: descriptionInput.value,
            photoUrl: evidenceInput.files[0], // file disimpan untuk diolah
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
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    },

    _goToDashboardPage() {
        window.location.href = '/';
    },
};

export default Add;
