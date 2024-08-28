import "../../../sass/dashboard.scss";
import "../../../sass/main.scss";
import footer from "../components/AppBar/footer";
import NavLinkApp from "../components/AppBar/navbar-link";
import StoryCard from "../components/component/card"; 
import BrandNameApp from "../components/component/brandname"; 
import LocalePicker from "../components/component/LocalePicker"; 
import ProfileCard from "../components/component/profile"; 
import ScrollToTopButton from "../components/component/up-button"; 
import CheckUserAuth from './auth/check-user-auth';
import Story from "../../network/story";

const Dashboard = {
  async init() {
    CheckUserAuth.checkLoginState();
    await this._initialData();
  },

  // async _initialData() {
  //   try {
  //     const fetchRecords = await fetch('/data/DATA.json');
  //     const responseRecords = await fetchRecords.json();
  //     this._userListStory = responseRecords.listStory; 

  //     if (this._userListStory && Array.isArray(this._userListStory)) {
  //       this.renderStoryCards(this._userListStory);
  //       this._populateListDataToCard(this._userListStory);
  //     } else {
  //       console.error('Invalid data format:', this._userListStory);
  //     }
      
  //   } catch (error) {
  //     console.error('Failed to fetch and initialize data:', error);
  //   }
  // },

  async _initialData() {
    try {
      const response = await Story.getAll();
      console.log('API Response:', response); // Log untuk memeriksa data respons
      
      // Akses data dari response.data
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
  
    listStory.forEach(storyRecord => {
      const cardElement = document.createElement('story-card');
      cardElement.storyRecord = storyRecord; 
      cardContainer.appendChild(cardElement);
    });
  
    document.querySelector('#numberOfStory').innerText = listStory.length;
  },  
};

export default Dashboard;
