import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import BoardPage from '../pages/BoardPage';

export const router = createBrowserRouter([
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
        element: <BoardPage />,
      },
      // Future routes can be added here:
      // {
      //   path: 'settings',
      //   element: <SettingsPage />,
      // },
      // {
      //   path: 'analytics',
      //   element: <AnalyticsPage />,
      // },
    ],
  },
]);