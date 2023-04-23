import { useContext } from 'react';
import Header from '~/layouts/components/Header';
import classNames from 'classnames/bind';

import styles from './HeaderOnly.module.scss';
import GetApp from '~/components/GetApp';
import { VideoEnviroment } from '~/context/VideoContext/VideoContext';
import { VideoPlayerModal } from '~/components/Modal';

const cx = classNames.bind(styles);

function HeaderOnly({ children }) {
    const context = useContext(VideoEnviroment);
    return (
        <div>
            <Header className={cx('custom')} />
            <div className={cx('wrapper')}>
                <div className={cx('content')}>{children}</div>
            </div>
            <GetApp />
            {context.isVideoModalShow && <VideoPlayerModal onHideModal={context.hideVideoPlayer} />}
        </div>
    );
}

export default HeaderOnly;
