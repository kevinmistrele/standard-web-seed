import { Navigate } from 'react-router-dom';
import { ROUTES } from '../route-paths';
import { authService } from '@application/services/auth-service';

interface GuestGuardProps {
  children: React.ReactNode;
}

export function GuestGuard({ children }: GuestGuardProps) {
  const isAuthenticated = authService.isAuthenticated();
  if (isAuthenticated) {
    return <Navigate to={ROUTES.home} replace />;
  }

  return <>{children}</>;
}
