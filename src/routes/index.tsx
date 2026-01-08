import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import EntryLayout from '@/layouts/EntryLayout'
import RootLayout from '@/layouts/RootLayout'
import HomePage from '@/pages/HomePage'
import LobbyPage from '@/pages/LobbyPage'
import { ROUTES } from './ROUTES'

const router = createBrowserRouter([
  {
    Component: () => <RootLayout />,
    children: [
      {
        Component: () => <EntryLayout />,
        children: [
          {
            element: <HomePage />,
            path: ROUTES.HOME,
          },
          {
            element: <LobbyPage />,
            path: ROUTES.LOBBY,
          },
        ],
      },
    ],
  },
])

export default function Routes() {
  return <RouterProvider router={router} />
}
