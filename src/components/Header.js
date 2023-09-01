import { useLocation, useNavigate } from 'react-router-dom'
import Button from './Button'

const Header = () => {

    const location = useLocation()
    const navigate = useNavigate();

    return (
        <header>
            <h1>Task Tracker</h1>
            {location.pathname === '/' && (
                <Button
                    color={'green'}
                    text={'add'}
                    onClick={() => navigate('/add')}
                />
            )}

            {location.pathname === '/add' && (
                <Button
                    color={'red'}
                    text={'close'}
                    onClick={() => navigate('/')}
                />
            )}
        </header>
    )
}

export default Header
