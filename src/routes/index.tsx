import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import EntryLayout from '@/layouts/EntryLayout'
import GameLayout from '@/layouts/GameLayout'
import RoomLayout from '@/layouts/RoomLayout'
import RootLayout from '@/layouts/RootLayout'
import CustomWordPage from '@/pages/CustomWordPage'
import DiscussionPage from '@/pages/game/DiscussionPage'
import DrawingPage from '@/pages/game/DrawingPage'
import KeywordPage from '@/pages/game/KeywordPage'
import ResultPage from '@/pages/game/ResultPage'
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
          {
            element: <CustomWordPage />,
            path: ROUTES.CUSTOM_WORD(':roomId'),
          },
        ],
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
])

export default function Routes() {
  return <RouterProvider router={router} />
}
