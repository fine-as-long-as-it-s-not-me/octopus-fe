import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import EntryLayout from '@/layouts/EntryLayout'
import GameLayout from '@/layouts/GameLayout'
import GameRoomLayout from '@/layouts/GameRoomLayout'
import RoomLayout from '@/layouts/RoomLayout'
import RootLayout from '@/layouts/RootLayout'
import CustomKeywordPage from '@/pages/CustomKeywordPage'
import GuestRoomPage from '@/pages/GuestRoomPage'
import HomePage from '@/pages/HomePage'
import KeywordRegisterPage from '@/pages/KeywordRegisterPage'
import LobbyPage from '@/pages/LobbyPage'
import DiscussionPage from '@/pages/phase/DiscussionPage'
import DrawingPage from '@/pages/phase/DrawingPage'
import GameResultPage from '@/pages/phase/GameResultPage'
import GuessingPage from '@/pages/phase/GuessingPage'
import KeywordPage from '@/pages/phase/KeywordPage'
import RoundResultPage from '@/pages/phase/RoundResultPage'
import VoteResultPage from '@/pages/phase/VoteResultPage'
import VotingPage from '@/pages/phase/VotingPage'
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
          {
            element: <GuestRoomPage />,
            path: ROUTES.GUEST_ROOM,
          },
        ],
      },
      {
        Component: () => <GameRoomLayout />,
        children: [
          {
            Component: () => <RoomLayout />,
            children: [
              {
                element: <RoomPage />,
                path: ROUTES.ROOM,
              },
              {
                element: <CustomKeywordPage />,
                path: ROUTES.CUSTOM_WORD,
              },
            ],
          },
          {
            Component: () => <GameLayout />,
            children: [
              {
                element: <DrawingPage />,
                path: ROUTES.DRAWING,
              },
              {
                element: <KeywordPage />,
                path: ROUTES.KEYWORD,
              },
              {
                element: <DiscussionPage />,
                path: ROUTES.DISCUSSION,
              },
              {
                element: <GuessingPage />,
                path: ROUTES.GUESSING,
              },
              {
                element: <VotingPage />,
                path: ROUTES.VOTING,
              },
              {
                element: <VoteResultPage />,
                path: ROUTES.VOTE_RESULT,
              },
              {
                element: <RoundResultPage />,
                path: ROUTES.ROUND_RESULT,
              },
              {
                element: <GameResultPage />,
                path: ROUTES.GAME_RESULT,
              },
            ],
          },
          {
            element: <KeywordRegisterPage />,
            path: ROUTES.KEYWORD_REGISTER,
          },
        ],
      },
    ],
  },
])

export default function Routes() {
  return <RouterProvider router={router} />
}
