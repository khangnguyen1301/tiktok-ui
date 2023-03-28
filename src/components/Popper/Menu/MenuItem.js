import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function MenuItem({ data, onClick, customMenuItem = false, custom = false, shareActive = false, uploadLayout }) {
    const classes = cx('menu-item', {
        uploadLayout,
        separate: data.separate,
        customMenuItem,
    });

    return (
        <div className={cx({ custom: custom })}>
            <div className={cx('item-container')}>
                <Button
                    className={cx(classes)}
                    leftIcon={data.icon}
                    rightIcon={data.rightIcon}
                    to={data.to}
                    shareButton={shareActive}
                    onClick={onClick}
                >
                    {data.title}
                </Button>
            </div>
        </div>
    );
}

MenuItem.propType = {
    data: PropTypes.object.isRequired,
    onclick: PropTypes.func,
};

export default MenuItem;
