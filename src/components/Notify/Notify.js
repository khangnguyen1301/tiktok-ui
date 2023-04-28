import PropTypes from 'prop-types';
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

Notify.propTypes = {
    message: PropTypes.string,
};

export default Notify;
