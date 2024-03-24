import { useNavigate, useLocation } from 'react-router-dom';

export const BackButton = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const from = queryParams.get('from');

    const handleClick = () => {
        if (from) {
            navigate(from);
        } else {
            navigate('/');
        }
    };

    return (
        <button onClick={handleClick}>GO BACK</button>
    );
};

