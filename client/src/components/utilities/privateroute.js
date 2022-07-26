import {useSelector} from 'react-redux';
import {Navigate} from 'react-router';

const PRIVATEROUTE = (props) => {
    const isLogged = useSelector(state=>state.isLoggedIn);
  return isLogged ? props.children: <Navigate to="/"/>
}

export default PRIVATEROUTE;