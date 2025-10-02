import React from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import Layout from '../components/Layout';
import BoardPage from '../pages/BoardPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import ProtectedRoute from '../components/ProtectedRoute';
import { AuthProvider } from '../contexts/AuthContext';

function RootLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/signup',
        element: <SignupPage />,
      },
      {
        path: '/',
        element: <Layout />,
        children: [
          {
            index: true,
            element: <Navigate to="/board" replace />,
          },
          {
            path: 'board',
            element: (
              <ProtectedRoute>
                <BoardPage />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
]);