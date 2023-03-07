import PropTypes from 'prop-types';
import { useState, forwardRef, useEffect } from 'react';
import classNames from 'classnames';
import images from '~/assets/images';
import styles from './Image.module.scss';

const Image = forwardRef(
    ({ src, alt, className, fallback: customFallback = images.noImage, hideFallback, ...props }, ref) => {
        console.log('re render Image');
        const [fallback, setFallback] = useState('');
        const [fallBackHide, setFallBackHide] = useState(false);
        useEffect(() => {
            hideFallback && setFallback('');
        }, [hideFallback]);

        const handleError = () => {
            setFallback(customFallback);
            setFallBackHide(!fallBackHide);
        };
        console.log('fallback', fallback);
        return (
            <img
                className={classNames(styles.wrapper, className)}
                ref={ref}
                src={fallback || src}
                alt={alt}
                {...props}
                onError={handleError}
            />
        );
    },
);

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
    fallback: PropTypes.string,
};

export default Image;
