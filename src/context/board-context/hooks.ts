import { useContext } from 'react';
import { BoardContext, BoardSetterContext } from '../board-context';

const useBoard = () => {
	return useContext(BoardContext);
};

const useSetBoard = () => {
	return useContext(BoardSetterContext);
};

export { useBoard, useSetBoard };
