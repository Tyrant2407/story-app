import axios from 'axios';
import Utils from '../utils/utils';
import Config from '../config/config';
import ApiEndpoint from '../config/api-endpoint';

const Story = {
    async getAllStories() {
        return await axios.get(ApiEndpoint.GET_ALL_STORIES)
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

    async store({ description, photo }) {
        const formData = new FormData();
        formData.append('description', description);
        formData.append('photo', photo);

        return await axios.post(ApiEndpoint.ADD_NEW_STORY, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${Utils.getUserToken(Config.USER_TOKEN_KEY)}`,
            },
        })
        .then((res) => res)
        .catch((err) => {
            console.error('Error storing story:', err);
            throw err;
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
        })
        .then((res) => res)
        .catch((err) => {
            console.error('Error storing story for guest:', err);
            throw err;
        });
    },
};

export default Story;
