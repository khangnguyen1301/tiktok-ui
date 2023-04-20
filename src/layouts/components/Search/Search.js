import { useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import * as searchServices from '~/services/searchService';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/Icons';
import styles from './Search.module.scss';
import { useDebounce } from '~/hooks';
import { useDispatch } from 'react-redux';
import { resetSearching, setSearchQuery } from '~/redux/videoSlice';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const debouncedValue = useDebounce(searchValue, 450);

    const inputRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }
        //fetchApi();
        (async () => {
            setLoading(true);
            const result = await searchServices.search(debouncedValue);
            setSearchResult(result);
            setLoading(false);
        })();
        dispatch(setSearchQuery(searchValue));
    }, [debouncedValue]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    const handleResetSearchResult = () => {
        setShowResult(false);
        setSearchValue('');
    };

    const handleShowMoreResult = () => {
        dispatch(resetSearching());
        handleResetSearchResult();
        navigate('/search');
    };

    return (
        <div>
            <HeadlessTippy
                interactive
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Accounts</h4>
                            {searchResult.map((result) => (
                                <AccountItem key={result.id} data={result} handleInput={handleResetSearchResult} />
                            ))}

                            <div
                                className={cx('all-result')}
                                onClick={handleShowMoreResult}
                            >{`View all results for "${searchValue}"`}</div>
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder="Search accounts and videos"
                        spellCheck={false}
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)}
                    />
                    {!!searchValue && !loading && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                    {!searchValue ? (
                        <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                            <SearchIcon />
                        </button>
                    ) : (
                        <button className={cx('search-btn')} onClick={handleShowMoreResult}>
                            <SearchIcon />
                        </button>
                    )}
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
