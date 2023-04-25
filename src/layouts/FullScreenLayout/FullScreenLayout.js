import classNames from 'classnames/bind';

import Header from '~/layouts/components/Header';

import styles from './FullScreenLayout.module.scss';

import Sidebar from '../components/Sidebar';

import { VideoPlayerModal } from '~/components/Modal';
import { useContext, useLayoutEffect, useState } from 'react';
import { VideoEnviroment } from '~/context/VideoContext/VideoContext';

import GetApp from '~/components/GetApp';

const cx = classNames.bind(styles);

function FullScreenLayout({ children }) {
    const [route, setRoute] = useState('/pathname');
    const context = useContext(VideoEnviroment);

    const pathName = window.location.pathname;
    useLayoutEffect(() => {
        if (context.nickName && context.videoID) {
            setRoute(`/@${context.nickName}/video/${context.videoID}`);
        }
    }, [pathName]);

    return (
        <div>
            <Header className={cx('custom-header')} />
            <div className={cx('wrapper')}>
                <Sidebar className={cx('custom-sidebar')} />
                <div className={cx('content')}>{children}</div>
            </div>
            {pathName !== '/live' && pathName !== route && <GetApp />}
            {context.isVideoModalShow && <VideoPlayerModal onHideModal={context.hideVideoPlayer} />}
        </div>
    );
}

export default FullScreenLayout;
