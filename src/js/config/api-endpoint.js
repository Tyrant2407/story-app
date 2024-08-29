import Config from './config';

const ApiEndpoint = {
  REGISTER: `${Config.BASE_URL}/register`,
  LOGIN: `${Config.BASE_URL}/login`,
  ADD_NEW_STORY: 'https://story-api.dicoding.dev/v1/stories',
  ADD_NEW_STORY_WITHOUT_AUTH: 'https://story-api.dicoding.dev/v1/stories/guest',
  GET_ALL_STORIES: `${Config.BASE_URL}/stories`,
  GET_BY_ID_STORY: (id) => `${Config.BASE_URL}/stories/${id}`,
  STORIES: `${Config.BASE_URL}/storiess`,
};

export default ApiEndpoint;
