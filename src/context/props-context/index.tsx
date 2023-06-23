import type { Move } from '../../chess';
import React, { createContext, useMemo } from 'react';
import { Dimensions } from 'react-native';
import type { PieceType } from '../../types';

import type { ChessboardState } from '../../helpers/get-chessboard-state';

type ChessMoveInfo = {
	move: Move;
	state: ChessboardState & { inPromotion: boolean };
};

type ChessboardColorsType = {
	white: string;
	black: string;
	lastMoveHighlight?: string;
	checkmateHighlight?: string;
	promotionPieceButton?: string;
};

type ChessboardDurationsType = {
	move?: number;
};

type ChessboardProps = {
	gestureEnabled?: boolean;
	fen?: string;
	withLetters?: boolean;
	withNumbers?: boolean;
	boardSize?: number;
	renderPiece?: (piece: PieceType) => React.ReactElement | null;
	onMove?: (info: ChessMoveInfo) => void;
	colors?: ChessboardColorsType;
	durations?: ChessboardDurationsType;
	soundEnabled?: boolean;
	hapticsEnabled?: boolean;
	blindfold?: boolean;
	children?: React.ReactNode;
};

type ChessboardContextType = ChessboardProps &
	Required<
		Pick<
			ChessboardProps,
			'gestureEnabled' | 'withLetters' | 'withNumbers' | 'boardSize'
		>
	> & { pieceSize: number } & {
		colors: Required<ChessboardColorsType>;
		durations: Required<ChessboardDurationsType>;
	};

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const DEFAULT_BOARD_SIZE = Math.floor(SCREEN_WIDTH / 8) * 8;

const defaultChessboardProps: ChessboardContextType = {
	gestureEnabled: true,
	colors: {
		//chess.com desktop colors
		black: '#b58863',
		white: '#f0d9b5',
		lastMoveHighlight: 'rgba(255,255,0,0.5)',
		checkmateHighlight: '#e84855',
		promotionPieceButton: '#ff9b71',
	},
	durations: {
		move: 150,
	},
	withLetters: true,
	withNumbers: true,
	boardSize: DEFAULT_BOARD_SIZE,
	pieceSize: DEFAULT_BOARD_SIZE / 8,
	soundEnabled: true,
	hapticsEnabled: true,
	blindfold: false,
};

const ChessboardPropsContext = createContext<ChessboardContextType>(
	defaultChessboardProps
);

const ChessboardPropsContextProvider: React.FC<ChessboardProps> = React.memo(
	({ children, ...rest }) => {
		const value = useMemo(() => {
			const data = {
				...defaultChessboardProps,
				...rest,
				colors: { ...defaultChessboardProps.colors, ...rest.colors },
				durations: {
					...defaultChessboardProps.durations,
					...rest.durations,
				},
			};
			return { ...data, pieceSize: data.boardSize / 8 };
		}, [rest]);

		return (
			<ChessboardPropsContext.Provider value={value}>
				{children}
			</ChessboardPropsContext.Provider>
		);
	}
);

export { ChessboardPropsContextProvider, ChessboardPropsContext };
export type { ChessboardProps };
