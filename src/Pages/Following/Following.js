import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import VideoPreview from '~/components/VideoPreview';
import styles from './Following.module.scss';
import * as userService from '~/services/userService';

const DEFAULT_PERPAGE = 15;

const cx = classNames.bind(styles);
function Following() {
    const [followList, setFollowList] = useState([]);

    useEffect(() => {
        async function fetchApi() {
            const data = await userService.getSuggested({ page: 3, perPage: DEFAULT_PERPAGE });
            setFollowList(data);
        }
        fetchApi();
    }, []);

    return (
        <div className={cx('wrapper')}>
            {followList.map((res) => (
                <VideoPreview data={res} key={res?.id} />
            ))}
        </div>
    );
}

export default Following;
