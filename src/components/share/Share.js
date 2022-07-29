import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {joinCls, validateYouTubeUrl} from '../../utilities';
import {apiGetYoutubeInfo, apiStoreVideoInfo} from '../../api';
import cls from './Share.module.scss';

export default () => {
  const [url, setUrl] = useState('');
  const [validUrl, setValidUrl] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [shareFailed, setShareFailed] = useState('');
  const [shareSuccess, setShareSuccess] = useState(false);
  const loggedIn = useSelector(({authentication: {loggedIn}}) => loggedIn);
  const currentUser = useSelector(({authentication: {currentUser}}) => currentUser);

  const handleUrlChange = (e) => {
    const val = e.target.value;
    setUrl(val);
  }

  const handleShare = () => {
    setSharing(true);
    setShareFailed('');

    return apiGetYoutubeInfo({id: validUrl})
      .then(function (response) {
        const {data: {items} = {}} = response;
        if (items && items.length) {
          const {snippet: {title, description}} = items[0];
          const {username} = currentUser;

          return apiStoreVideoInfo({
            id: validUrl,
            title,
            description: description.slice(0, 300),
            createdBy: username
          })
            .then(function () {
              setUrl('');
              setValidUrl(false);
              setShareSuccess(true);
              window.setTimeout(() => {
                setShareSuccess(false);
              }, 2000)
            })
            .catch(function (err) {
              const {response: {data}} = err;
              setShareFailed(data.msg);
              console.error('Cannot share the video!', data);
            });
        } else {
          setShareFailed('Video sharing failed! Please check video URL!');
          console.error('Retrieve video information failed!');
        }
      })
      .catch(function (err) {
        setShareFailed('Video sharing failed! Please check video URL!');
        console.error('Retrieve video information failed!', err);
      })
      .finally(function () {
        setSharing(false);
      });
  };

  useEffect(() => {
    setValidUrl(validateYouTubeUrl(url));
  }, [url]);

  return (
    <div className={cls.appShare}>
      {loggedIn ? (
        <fieldset className={cls.boundary}>
          <legend className={cls.legend}>Share a YouTube video</legend>
          <div className={cls.urlForm}>
            <label htmlFor="youtube-url"
                   className={joinCls([cls.label, !!url && !validUrl && cls.error])}>YouTube URL:</label>
            <input type="text"
                   id="youtube-url"
                   className={cls.input}
                   value={url}
                   onChange={handleUrlChange}/>
          </div>
          <div className={joinCls([cls.msg, cls.error])}>{!!url && !validUrl && 'YouTube URL is invalid!'}</div>
          <button type="button"
                  className={joinCls([cls.btn, cls.primaryBtn, (!validUrl || sharing) && cls.disabled])}
                  onClick={handleShare}>{sharing ? 'Sharing...' : 'Share'}
          </button>
          {shareFailed && <div className={cls.errorMsg}>{shareFailed}</div>}
          {shareSuccess && <div className={cls.successMsg}>Success!</div>}
        </fieldset>
      ) : <div className={cls.announcement}>You need to log-in to share a video!</div>}
    </div>
  );
};
