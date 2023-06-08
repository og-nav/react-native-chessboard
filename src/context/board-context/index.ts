import React, { createContext } from 'react';
import type { Chess, Color, PieceSymbol, Square } from '../../chess';

const BoardContext = createContext<ReturnType<Chess['board']>>({} as any);

const BoardSetterContext = createContext<
	React.Dispatch<
		React.SetStateAction<
			({ square: Square; type: PieceSymbol; color: Color } | null)[][]
		>
	>
>({} as any);

export { BoardContext, BoardSetterContext };
