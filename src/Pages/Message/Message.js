import classNames from 'classnames/bind';

import styles from './Message.module.scss';
import { ArrowLeftIcon } from '~/components/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Message() {
    const navigate = useNavigate();

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('back-btn')} onClick={() => navigate('/')}>
                    <div className={cx('back-icon')}>
                        <ArrowLeftIcon />
                    </div>
                </div>
                <div className={cx('sidebar')}>
                    <div className={cx('sidebar-content')}>
                        <span>Messages</span>
                        <span className={cx('icon')}>
                            <FontAwesomeIcon icon={faGear} />
                        </span>
                    </div>
                    <span>No messages yet</span>
                </div>
                <div className={cx('content')}></div>
            </div>
        </div>
    );
}

export default Message;
