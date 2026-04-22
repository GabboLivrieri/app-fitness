export type Difficulty = 
'PRINCIPIANTE' | 'INTERMEDIO' | 'AVANZATO';

export const DIFFICULTY_ICON: Record<Difficulty, string> = {
  PRINCIPIANTE: '🔥',
  INTERMEDIO: '🔥🔥',
  AVANZATO: '🔥🔥🔥'
};