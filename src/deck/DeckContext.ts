import { createContext, useContext, type ComponentType } from 'react'
import type { TransitionType } from './transitions'

export type SlideDef = {
  id: string
  title: string
  // how this page arrives when moving forward (reversed when moving back)
  transition: TransitionType
  Component: ComponentType
}

type DeckCtx = { slides: SlideDef[]; index: number; goTo: (index: number) => void }

export const DeckContext = createContext<DeckCtx | null>(null)

export function useDeck() {
  const ctx = useContext(DeckContext)
  if (!ctx) throw new Error('useDeck must be used inside Deck')
  return ctx
}
