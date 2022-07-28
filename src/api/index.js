import axios from 'axios';

export const apiLogin = ({username, password}) => axios.post('/api/users/login', {username, password});

export const apiGetYoutubeInfo = ({id}) => axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=AIzaSyBqzfdL8xKDpjpDTjheXplZwrG0xUzUsW8`);

export const apiStoreVideoInfo = ({id, title, description, createdBy}) => axios.post('/api/videos', {
  id,
  title,
  description,
  createdBy
});

export const apiGetVideos = () => axios.get('/api/videos');

export const apiVoteVideo = ({videoId, userId, value}) => axios.post('/api/vote', {videoId, userId, value});
