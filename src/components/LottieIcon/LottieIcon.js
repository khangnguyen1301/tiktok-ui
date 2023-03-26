import Lottie from 'lottie-react';

function LottieIcon({ className, icon, options }) {
    const lottieOptions = {
        loop: true,
        autoplay: true,
        animationData: icon,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
        ...options,
    };

    return <Lottie className={className} {...lottieOptions} />;
}

export default LottieIcon;
