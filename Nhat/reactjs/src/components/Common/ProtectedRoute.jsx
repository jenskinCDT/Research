import UserService from '../../services/UserService';
import NotAllowed from '../NotAllowed/NotAllowed';

function ProtectedRoute({ children, roles = [], backUrl, ...rest }) {
  return !UserService.isLoggedIn() ? (
    UserService.doLogin()
  ) : roles.length && !UserService.hasRole(roles) ? (
    <NotAllowed />
  ) : (
    children
  );
}

export default ProtectedRoute;
