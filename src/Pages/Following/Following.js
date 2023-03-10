import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import VideoPreview from '~/components/VideoPreview';
import styles from './Following.module.scss';
import * as userService from '~/services/userService';

const DEFAULT_PERPAGE = 15;

const cx = classNames.bind(styles);
function Following() {
    const [followList, setFollowList] = useState([]);
    const [positionPlay, setPositionPlay] = useState(0);
    useEffect(() => {
        async function fetchApi() {
            const data = await userService.getSuggested({ page: 9, perPage: DEFAULT_PERPAGE });
            setFollowList(data);
        }
        fetchApi();
    }, []);
    const handleMouseMove = (value) => {
        setPositionPlay(value);
    };
    return (
        <div className={cx('wrapper')}>
            {followList.map((res, index) => (
                <VideoPreview
                    data={res}
                    key={res?.id}
                    index={index}
                    handleMouseMove={handleMouseMove}
                    play={index === positionPlay}
                />
            ))}
        </div>
    );
}

export default Following;
