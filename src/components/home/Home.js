import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getVideos} from '../../store/action';
import cls from './Home.module.scss';

const VideoItem = ({id}) => {
  const loggedIn = useSelector(({authentication: {loggedIn}}) => loggedIn);
  const {title, description, sharedBy: {username}} = useSelector(({videos: {list}}) => list[id]);

  return (
    <div className={cls.videoWrapper}>
      <iframe width="280" height="160" src={`https://www.youtube.com/embed/${id}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen></iframe>
      <div className={cls.info}>
        <div className={cls.title}>{title}</div>
        <div className={cls.sharedBy}>{`Shared by ${username}`}</div>
        {loggedIn && <div className={cls.votes}>votes</div>}
        <div className={cls.desc}>Description:</div>
        <div className={cls.desc}>{description}</div>
      </div>
    </div>
  )
};

export default () => {
  const dispatcher = useDispatch();
  const loading = useSelector(({videos: {loading}}) => loading);
  const videos = useSelector(({videos: {list}}) => list);

  useEffect(() => {
    dispatcher(getVideos());
  }, []);

  return (
    <div className={cls.appHome}>
      {loading && <div className={cls.announcement}>Retrieving YouTube videos...</div>}
      <div className={cls.videosContainer}>
        {Object.keys(videos).map((id) => {
          return <VideoItem key={id} id={id}/>
        })}
      </div>
    </div>
  );
};
