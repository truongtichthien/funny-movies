import React, {useEffect, useState} from 'react';
import {apiGetVideos} from '../../api';
import cls from './Home.module.scss';
import {useSelector} from "react-redux";

const VideoItem = ({id, title, description, sharedBy}) => {
  const loggedIn = useSelector(({loggedIn}) => loggedIn);

  return (
    <div className={cls.videoWrapper}>
      <iframe width="280" height="160" src={`https://www.youtube.com/embed/${id}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen></iframe>
      <div className={cls.info}>
        <div className={cls.title}>{title}</div>
        <div className={cls.sharedBy}>{`Shared by ${sharedBy}`}</div>
        {loggedIn && <div className={cls.votes}>votes</div>}
        <div className={cls.desc}>Description:</div>
        <div className={cls.desc}>{description}</div>
      </div>
    </div>
  )
};

export default () => {
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    setLoading(true);
    apiGetVideos()
      .then(function (res) {
        const {data} = res;
        setVideos(data);
      })
      .catch(function (err) {
        console.error('Cannot get videos', err);
      })
      .finally(function () {
        setLoading(false);
      });
  }, []);

  return (
    <div className={cls.appHome}>
      {loading && <div className={cls.announcement}>Retrieving YouTube videos...</div>}
      <div className={cls.videosContainer}>
        {videos.map(({title, description, id, sharedBy: {username}}) => {
          return <VideoItem key={id} id={id} title={title} description={description} sharedBy={username}/>
        })}
      </div>
    </div>
  );
};
