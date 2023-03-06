import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import AccountItem from '~/components/SuggestAccounts/AccountItem';
import styles from './SuggestAccounts.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const cx = classNames.bind(styles);

function SuggestAccounts({ title, data, sideBarRef }) {
    const [seeMore, setSeeMore] = useState(false);

    const scrollTop = () => {
        sideBarRef.current.scrollTo({ top: 200, behavior: 'smooth' });
    };

    const handleSeeMore = () => {
        if (seeMore) {
            setSeeMore(false);
            scrollTop();
        } else {
            setSeeMore(true);
        }
    };
    let classes = cx('wrapper-content', {
        more: seeMore,
    });
    return (
        <div>
            <div className={cx('wrapper')}>
                <div className={classes}>
                    <p className={cx('title')}> {title} </p>
                    {data.map((res) => (
                        <Link to={`/@${res.nickname}`} key={res.id}>
                            <AccountItem data={res} />
                        </Link>
                    ))}
                </div>
                {seeMore ? (
                    <span className={cx('more-btn')} onClick={handleSeeMore}>
                        See less
                    </span>
                ) : (
                    <span className={cx('more-btn')} onClick={handleSeeMore}>
                        See all
                    </span>
                )}
            </div>
        </div>
    );
}

SuggestAccounts.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
};

export default SuggestAccounts;
