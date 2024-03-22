import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const BackButton = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const previousUrlRef = useRef<string>('');

    useEffect(() => {
        return () => {
            previousUrlRef.current = location.pathname;
        };
    }, [location.pathname]);

    const handleClick = () => {
        console.log('Back button clicked');
        if (previousUrlRef.current) {
            navigate(previousUrlRef.current);
        } else {
            navigate('/');
        }
    };

    return (
        <button onClick={handleClick}>Go Back</button>
    );
};
