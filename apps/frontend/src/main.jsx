import CatalogPage from '@pages/catalog.jsx';
import DashboardPage from '@pages/dashboard.jsx';
import LandingPage from '@pages/landing_page.jsx';
import LoginPage from '@pages/login.jsx';
import OnboardingPage from '@pages/onboarding.jsx';
import SignUpPage from '@pages/sign_up.jsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import { AuthProvider, useAuth } from './auth_context.jsx';

import './index.css';

/* ── Auth-aware route wrappers ── */
function LoginRoute() {
  const { hasCompletedOnboarding, loggedIn, login } = useAuth();
  const navigate = useNavigate();

  if (loggedIn) return <Navigate to={hasCompletedOnboarding() ? '/dashboard' : '/onboarding'} replace />;

  return (
    <LoginPage
      onLogin={login}
      onBack={() => navigate(-1)}
      onSuccess={() => navigate(hasCompletedOnboarding() ? '/dashboard' : '/onboarding', { replace: true })}
      onGoSignUp={() => navigate('/sign-up')}
    />
  );
}

function SignUpRoute() {
  const { loggedIn, signUp } = useAuth();
  const navigate = useNavigate();

  if (loggedIn) return <Navigate to='/' replace />;

  return (
    <SignUpPage
      onSignUp={signUp}
      onBack={() => navigate(-1)}
      // After sign-up, always go to onboarding (not home)
      onSuccess={() => navigate('/onboarding', { replace: true })}
      onGoLogin={() => navigate('/login')}
    />
  );
}

function OnboardingRoute() {
  const { hasCompletedOnboarding, loggedIn, markOnboardingDone } = useAuth();
  const navigate = useNavigate();

  // Must be logged in; if already onboarded, skip straight to dashboard
  if (!loggedIn) return <Navigate to='/login' replace />;
  if (hasCompletedOnboarding()) return <Navigate to='/dashboard' replace />;

  return (
    <OnboardingPage
      onFinish={() => {
        markOnboardingDone();
        navigate('/dashboard', { replace: true });
      }}
    />
  );
}

function DashboardRoute() {
  const { hasCompletedOnboarding, loggedIn } = useAuth();

  // Must be logged in
  if (!loggedIn) return <Navigate to='/login' replace />;
  // If they somehow skipped onboarding, send them there first
  if (!hasCompletedOnboarding()) return <Navigate to='/onboarding' replace />;

  return <DashboardPage />;
}

function CatalogRoute() {
  const { loggedIn } = useAuth();

  if (!loggedIn) return <Navigate to='/login' replace />;

  return <CatalogPage />;
}

function LandingRoute() {
  const { loggedIn } = useAuth();
  const navigate = useNavigate();

  return (
    <LandingPage
      onLogin={() => navigate('/login')}
      onSignUp={() => navigate('/sign-up')}
      onCatalog={() => (loggedIn ? navigate('/catalog') : navigate('/sign-up'))}
    />
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingRoute />} />
          <Route path='/login' element={<LoginRoute />} />
          <Route path='/sign-up' element={<SignUpRoute />} />
          <Route path='/onboarding' element={<OnboardingRoute />} />
          <Route path='/dashboard' element={<DashboardRoute />} />
          <Route path='/catalog' element={<CatalogRoute />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
