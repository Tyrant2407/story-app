import axios from 'axios';
import Utils from '../utils/utils';
import Config from '../config/config';
import ApiEndpoint from '../config/api-endpoint';

const Story = {
  async getAllStories() {
    return await axios
      .get(ApiEndpoint.GET_ALL_STORIES)
      .then((res) => res)
      .catch((err) => err);
  },

  async getAll() {
    return await axios.get(ApiEndpoint.GET_ALL_STORIES, {
      headers: {
        Authorization: `Bearer ${Utils.getUserToken(Config.USER_TOKEN_KEY)}`,
      },
    });
  },

  async getById(id) {
    return await axios.get(ApiEndpoint.GET_BY_ID_STORY(id), {
      headers: {
        Authorization: `Bearer ${Utils.getUserToken(Config.USER_TOKEN_KEY)}`,
      },
    });
  },

  async update({ id, name, date, description, photo }) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('date', date);
    formData.append('description', description);
    if (photo) formData.append('photo', photo); // Hanya tambahkan jika photo ada

    try {
      // Perbaiki URL endpoint di sini
      return await axios.put(ApiEndpoint.GET_BY_ID_STORY(id), formData, {
        headers: {
          Authorization: `Bearer ${Utils.getUserToken(Config.USER_TOKEN_KEY)}`,
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.error('Update failed:', error);
      throw error; // Lempar error untuk penanganan lebih lanjut
    }
  },

  async store({ description, photo, lat, lon }) {
    const formData = new FormData();
    formData.append('description', description);
    formData.append('photo', photo);

    if (lat !== undefined) formData.append('lat', lat);
    if (lon !== undefined) formData.append('lon', lon);

    return await axios.post(ApiEndpoint.ADD_NEW_STORY, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${Utils.getUserToken(Config.USER_TOKEN_KEY)}`,
      },
    });
  },

  async addNewStoryforGuest({ description, photo }) {
    const formData = new FormData();
    formData.append('description', description);
    formData.append('photo', photo);

    return await axios.post(ApiEndpoint.ADD_NEW_STORY_WITHOUT_AUTH, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default Story;
