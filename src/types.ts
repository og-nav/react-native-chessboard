import { Chess, Move, PieceSymbol, Square } from './chess';

type Player = ReturnType<Chess['turn']>;
type Type = 'q' | 'r' | 'n' | 'b' | 'k' | 'p';
type PieceType = `${Player}${Type}`;

type PiecesType = Record<PieceType, ReturnType<typeof require>>;
type Vector<T = number> = {
	x: T;
	y: T;
};

type ChessMove = {
	from: Square;
	to: Square;
};

type MoveType = { from: Square; to: Square };

type ChessPieceRef = {
	moveTo: (square: Square) => Promise<Move | undefined>;
	enable: (activate: boolean) => void;
};

type BoardPromotionContextType = {
  showPromotionDialog: (_: {
    type: PromotionDialogType;
    onSelect?: (_: PieceSymbol) => void;
  }) => void;
  isPromoting: boolean;
	children?: React.ReactNode
};

type PromotionDialogType = ReturnType<Chess['turn']>;

type BoardPromotionContextState = {
	isDialogActive: boolean;
	type?: PromotionDialogType;
	onSelect?: (_: PieceSymbol) => void;
};

export type {
	Player,
	Type,
	PieceType,
	PiecesType,
	Vector,
	ChessMove,
	MoveType,
	ChessPieceRef,
	BoardPromotionContextType,
	BoardPromotionContextState,
};
