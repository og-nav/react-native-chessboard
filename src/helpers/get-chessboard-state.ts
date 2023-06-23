import { Chess, Color, Move } from '../chess';

type ChessboardStateFunctions = Pick<
	Chess,
	| 'isCheck'
	| 'isCheckmate'
	| 'isDraw'
	| 'isStalemate'
	| 'isThreefoldRepetition'
	| 'isInsufficientMaterial'
	| 'isGameOver'
	| 'fen'
	| 'history'
	| 'getCastlingRights'
	| 'moves'
>;

type RecordReturnTypes<T> = {
	readonly [P in keyof T]: T[P] extends () => any ? ReturnType<T[P]> : T[P];
};

export type ChessboardState = RecordReturnTypes<ChessboardStateFunctions>;

export const getChessboardState = (chess: Chess): ChessboardState => {
	return {
		isCheck: chess.isCheck(),
		isCheckmate: chess.isCheckmate(),
		isDraw: chess.isDraw(),
		isStalemate: chess.isStalemate(),
		isThreefoldRepetition: chess.isThreefoldRepetition(),
		isInsufficientMaterial: chess.isInsufficientMaterial(),
		isGameOver: chess.isGameOver(),
		fen: chess.fen(),
		history: chess.history({ verbose: true }),
		getCastlingRights: (color: Color) => {
			return chess.getCastlingRights(color);
		},
		moves: chess.moves() as unknown as Move[],
	};
};
