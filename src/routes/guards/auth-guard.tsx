import { Navigate } from 'react-router-dom';
import { ROUTES } from '../route-paths';
import { authService } from '@application/services/auth-service';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const isAuthenticated = authService.isAuthenticated();
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.login} replace />;
  }

  return <>{children}</>;
}
