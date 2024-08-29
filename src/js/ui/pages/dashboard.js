import '../../../sass/dashboard.scss';
import '../../../sass/main.scss';
import footer from '../components/AppBar/footer';
import NavLinkApp from '../components/AppBar/navbar-link';
import NavLinkAuth from '../components/AppBar/NavLinkAuth';
import StoryCard from '../components/component/card';
import BrandNameApp from '../components/component/brandname';
import LocalePicker from '../components/component/LocalePicker';
import ProfileCard from '../components/component/profile';
import ScrollToTopButton from '../components/component/up-button';
import Spinner from '../components/component/spinner';
import CheckUserAuth from './auth/check-user-auth';
import Story from '../../network/story';

const Dashboard = {
  async init() {
    CheckUserAuth.checkLoginState();
    this._showSpinner(true); // Tampilkan spinner
    await this._initialData();
    // Simulasi delay minimum 2 detik sebelum menyembunyikan spinner
    setTimeout(() => this._showSpinner(false), 2000);
  },

  _showSpinner(visible) {
    const spinner = document.querySelector('#spinner');
    if (spinner) {
      console.log(`Spinner visibility: ${visible ? 'Visible' : 'Hidden'}`);
      spinner.style.display = visible ? 'block' : 'none';
    } else {
      console.error('Spinner element not found.');
    }
  },

  async _initialData() {
    try {
      const response = await Story.getAll();
      console.log('API Response:', response);

      const { error, message, listStory } = response.data;

      if (error) {
        throw new Error(message);
      }

      if (Array.isArray(listStory)) {
        this._userListStory = listStory;
        this._populateListDataToCard(this._userListStory);
      } else {
        console.error('Invalid data format:', listStory);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      // Timer untuk delay sebelum menyembunyikan spinner
      setTimeout(() => this._showSpinner(false), 2000);
    }
  },

  _populateListDataToCard(listStory = []) {
    if (!Array.isArray(listStory)) {
      throw new Error('Parameter listStory should be an array.');
    }

    const cardContainer = document.querySelector('#recordsCard');
    if (!cardContainer) {
      console.error('Element with ID #recordsCard not found.');
      return;
    }

    cardContainer.classList.add('card-container');
    cardContainer.innerHTML = ''; // Clear container before adding new cards

    listStory.forEach((storyRecord) => {
      const cardElement = document.createElement('story-card');
      cardElement.storyRecord = storyRecord;
      cardContainer.appendChild(cardElement);
    });

    document.querySelector('#numberOfStory').innerText = listStory.length;
  },
};

export default Dashboard;
