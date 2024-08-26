import "../../../sass/dashboard.scss";
import "../../../sass/main.scss";
import footer from "../components/AppBar/footer";
import NavLinkApp from "../components/AppBar/navbar-link";
import StoryCard from "../components/component/card"; 
import BrandNameApp from "../components/component/brandname"; 
import LocalePicker from "../components/component/LocalePicker"; 
import ProfileCard from "../components/component/profile"; 
import ScrollToTopButton from "../components/component/up-button"; 

const Dashboard = {
  async init() {
    await this._initialData();
  },

  async _initialData() {
    try {
      const fetchRecords = await fetch('/data/DATA.json');
      const responseRecords = await fetchRecords.json();
      this._userListStory = responseRecords.listStory || []; 
      this._populateListDataToCard(this._userListStory);
    } catch (error) {
      console.error('Failed to fetch and initialize data:', error);
    }
  },

  _populateListDataToCard(listStory = []) {
    if (!Array.isArray(listStory)) {
      throw new Error('Parameter listStory should be an array.');
    }

    const cardContainer = document.querySelector('#recordsCard');
    cardContainer.classList.add('card-container');
    cardContainer.innerHTML = ''; // Clear container before adding new cards

    listStory.forEach(storyRecord => {
      const cardElement = document.createElement('story-card');
      cardElement.storyRecord = storyRecord; 
      cardContainer.appendChild(cardElement);
    });

    document.querySelector('#numberOfStory').innerText = listStory.length;
  },
};

export default Dashboard;
