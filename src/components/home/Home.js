import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getVideos, voteVideo} from '../../store/action';
import cls from './Home.module.scss';
import {joinCls} from "../../utilities";

const VoteBar = ({id}) => {
  const dispatcher = useDispatch();
  const userId = useSelector(({authentication: {currentUser: {_id}}}) => _id);
  const {_id: videoId, votedBy} = useSelector(({videos: {list}}) => list[id]);
  const [voted, setVoted] = useState(0);

  const handleVoteUp = () => {
    dispatcher(voteVideo({videoId, value: voted === 1 ? 0 : 1}));
  };

  const handleVoteDown = () => {
    dispatcher(voteVideo({videoId, value: voted === -1 ? 0 : -1}));
  };

  useEffect(() => {
    const hasVoted = votedBy.find((v) => v.user === userId);
    if (hasVoted) {
      const {vote} = hasVoted;
      setVoted(vote);
    }
  }, [votedBy]);

  return (
    <div className={cls.voteBar}>
      {(voted === 0 || voted === 1) && (
        <button type="button" className={cls.btn} onClick={handleVoteUp}>
          <i className={joinCls([cls.icon, cls.thumbsUp, voted === 1 && cls.filled])}/>
        </button>)}
      {(voted === 0 || voted === -1) && (
        <button type="button" className={cls.btn} onClick={handleVoteDown}>
          <i className={joinCls([cls.icon, voted === -1 && cls.filled])}/>
        </button>
      )}
    </div>
  );
};

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
        {loggedIn && <VoteBar id={id}/>}
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
        {Object.keys(videos).map((id) => <VideoItem key={id} id={id}/>)}
      </div>
    </div>
  );
};
