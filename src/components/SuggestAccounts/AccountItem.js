import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountPreview from './AccountPreview';
import styles from './SuggestAccounts.module.scss';
import Tippy from '@tippyjs/react/headless';
import Image from '~/components/Image';
const cx = classNames.bind(styles);

function AccountItem({ data }) {
    const renderAccount = (props) => {
        return (
            <div tabIndex="-1" {...props}>
                <PopperWrapper>
                    <AccountPreview data={data} />
                </PopperWrapper>
            </div>
        );
    };

    return (
        <div className={cx('wrapper-item')}>
            <Tippy
                interactive
                appendTo={document.body}
                delay={[800, 600]}
                offset={[-25, 0]}
                render={renderAccount}
                placement={'bottom'}
            >
                <div className={cx('container')}>
                    <Image src={data.avatar} alt={data.nickname} className={cx('logo')} />
                    <div className={cx('content-container')}>
                        <div className={cx('content')}>
                            <h4 className={cx('label')}>{data.nickname}</h4>
                            <span className={cx('icon')}>{data.tick && <FontAwesomeIcon icon={faCheckCircle} />}</span>
                        </div>
                        <p className={cx('nickname')}> {`${data.first_name} ${data.last_name}`} </p>
                    </div>
                </div>
            </Tippy>
        </div>
    );
}

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountItem;
