import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import EntryLayout from '@/layouts/EntryLayout'
import GameLayout from '@/layouts/GameLayout'
import RoomLayout from '@/layouts/RoomLayout'
import RootLayout from '@/layouts/RootLayout'
import DiscussionPage from '@/pages/DiscussionPage'
import DrawingPage from '@/pages/DrawingPage'
import HomePage from '@/pages/HomePage'
import KeywordPage from '@/pages/KeywordPage'
import LobbyPage from '@/pages/LobbyPage'
import ResultPage from '@/pages/ResultPage'
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
          {
            Component: () => <GameLayout />,
            children: [
              {
                element: <DrawingPage />,
                path: ROUTES.DRAWING(':roomId'),
              },
              {
                element: <KeywordPage />,
                path: ROUTES.KEYWORD(':roomId'),
              },
              {
                element: <DiscussionPage />,
                path: ROUTES.DISCUSSION(':roomId'),
              },
              {
                element: <ResultPage />,
                path: ROUTES.RESULT(':roomId'),
              },
            ],
          },
        ],
      },
    ],
  },
])

export default function Routes() {
  return <RouterProvider router={router} />
}
