import classNames from 'classnames';

import styles from './Notify.module.scss';

const cx = classNames.bind(styles);

function Notify({ message = 'Login success' }) {
    return (
        <div className={cx('wrapper')}>
            <span>{message}</span>
        </div>
    );
}

export default Notify;
