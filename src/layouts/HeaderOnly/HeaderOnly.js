import Header from '~/layouts/components/Header';
import { useContext } from 'react';

import FormModal, { VideoPlayerModal } from '~/components/Modal';
import { ModalContext } from '~/components/ModalProvider';
import classNames from 'classnames/bind';

import styles from './HeaderOnly.module.scss';
import GetApp from '~/components/GetApp';

const cx = classNames.bind(styles);

function HeaderOnly({ children }) {
    const context = useContext(ModalContext);
    return (
        <div>
            <Header className={cx('custom')} />
            <div className={cx('wrapper')}>
                <div className={cx('content')}>{children}</div>
            </div>
            <GetApp />
            {context?.active && <FormModal onHide={context.handleHideModal} />}
            {context?.showVideoPlayer && <VideoPlayerModal />}
        </div>
    );
}

export default HeaderOnly;
