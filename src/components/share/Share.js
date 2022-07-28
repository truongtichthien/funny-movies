import React, {useEffect, useState} from 'react';
import {joinCls, validateYouTubeUrl} from '../../utilities';
import cls from './Share.module.scss';

export default () => {
  const [url, setUrl] = useState('');
  const [validUrl, setValidUrl] = useState(false);

  const handleUrlChange = (e) => {
    const val = e.target.value;
    setUrl(val);
  }

  const handleShare = () => {
  };

  useEffect(() => {
    setValidUrl(validateYouTubeUrl(url));
  }, [url]);

  return (
    <div className={cls.appShare}>
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
                className={joinCls([cls.btn, cls.primaryBtn, !validUrl && cls.disabled])}
                onClick={handleShare}>Share
        </button>
      </fieldset>
    </div>
  );
};
