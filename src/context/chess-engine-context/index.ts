import type { Chess } from '../../chess';
import { createContext } from 'react';

const ChessEngineContext = createContext<Chess>({} as any);

export { ChessEngineContext };
