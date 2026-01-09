import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import EntryLayout from '@/layouts/EntryLayout'
import RoomLayout from '@/layouts/RoomLayout'
import RootLayout from '@/layouts/RootLayout'
import HomePage from '@/pages/HomePage'
import LobbyPage from '@/pages/LobbyPage'
import RoomPage from '@/pages/RoomPage'
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
      {
        Component: () => <RoomLayout />,
        children: [
          {
            element: <RoomPage />,
            path: ROUTES.ROOM(':roomId'),
          },
        ],
      },
    ],
  },
])

export default function Routes() {
  return <RouterProvider router={router} />
}
