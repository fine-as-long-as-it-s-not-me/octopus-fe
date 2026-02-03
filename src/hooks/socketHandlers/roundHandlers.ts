import type {
  MessageHandlers,
  Phase,
  Player,
  RoundResultResponse,
  Stroke,
  Team,
  VoteResultResponse,
} from '@/types'

type RoundHandlersDeps = {
  initRound: () => void
  setTied: (tied: boolean) => void
  setGuessed: (guessed: boolean) => void
  setIsUnanimity: (isUnanimity: boolean) => void
  setPhase: (phase: Phase) => void
  setKeyword: (keyword: string) => void
  setStrokes: (strokes: Stroke[]) => void
  setTimeLeft: (timeLeft: number) => void
  setOctopuses: (octopuses: VoteResultResponse['octopuses']) => void
  setVoteResult: (voteResult: Record<string, number>) => void
  setCanvasColor: (bgColor: string) => void
  setPainterUUID: (uuid: string) => void
  setNextPainterUUID: (uuid: string) => void
  setRound: (round: number) => void
  setRanks: (ranks: RoundResultResponse['ranks']) => void
  setCustomKeywords: (
    customKeywords: { keyword: string; voteCount: number }[],
  ) => void
  setVotedPlayer: (player: Player) => void
  setWinningTeam: (team: Team | null) => void
}

export const createRoundHandlers = ({
  initRound,
  setTied,
  setGuessed,
  setIsUnanimity,
  setPhase,
  setKeyword,
  setStrokes,
  setTimeLeft,
  setOctopuses,
  setVoteResult,
  setCanvasColor,
  setPainterUUID,
  setNextPainterUUID,
  setRound,
  setRanks,
  setCustomKeywords,
  setVotedPlayer,
  setWinningTeam,
}: RoundHandlersDeps): Pick<
  MessageHandlers,
  | 'keyword'
  | 'canvas_updated'
  | 'round_updated'
  | 'painter'
  | 'tick'
  | 'vote_result'
  | 'round_result'
  | 'custom_words_updated'
> => ({
  keyword: ({ keyword }) => {
    setKeyword(keyword)
  },
  canvas_updated: ({ strokes, bgColor }) => {
    setStrokes(strokes)
    setCanvasColor(bgColor)
  },
  round_updated: ({ round }) => {
    setRound(round)
    initRound()
  },
  painter: ({ UUID, nextUUID }) => {
    setPainterUUID(UUID)
    setNextPainterUUID(nextUUID)
  },
  tick: ({ round, phase, timeLeft }) => {
    setPhase(phase)
    setRound(round)
    setTimeLeft(timeLeft)
  },
  vote_result: ({ voteResult, octopuses, votedPlayer }) => {
    const voteResultMap = Object.fromEntries(voteResult) as Record<
      string,
      number
    >
    setVoteResult(voteResultMap)
    setOctopuses(octopuses)
    setVotedPlayer(votedPlayer)
  },
  round_result: ({ ranks, tied, guessed, isUnanimity, winningTeam }) => {
    setRanks(ranks)
    setTied(tied)
    setGuessed(guessed)
    setIsUnanimity(isUnanimity)
    setWinningTeam(winningTeam)
  },
  custom_words_updated: ({ customKeywords }) => {
    setCustomKeywords(customKeywords)
  },
})
