import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useChessboardProps } from '../context/props-context/hooks';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
	},
});

type BackgroundProps = {
	letters: boolean;
	numbers: boolean;
};

interface BaseProps extends BackgroundProps {
	white: boolean;
}

interface RowProps extends BaseProps {
	row: number;
}

interface SquareProps extends RowProps {
	col: number;
}

const Square = React.memo(
	({ white, row, col, letters, numbers }: SquareProps) => {
		const { colors } = useChessboardProps();
		const backgroundColor = white ? colors.black : colors.white;
		const color = white ? colors.white : colors.black;
		const textStyle = { fontWeight: '500' as const, fontSize: 10, color, opacity: col === 0 ? 1 : 0 };
		return (
			<View
				style={{
					flex: 1,
					backgroundColor,
					padding: 4,
					justifyContent: 'space-between',
				}}
			>
				{numbers && (
					<>
					<Text style={textStyle}>
						{8 - row}
					</Text>
					<Text
					style={{
						color,
						fontWeight: '500',
						alignSelf: 'flex-end',
						opacity: row === 7 ? 1 : 0,
					}}
				>
					{String.fromCharCode('a'.charCodeAt(0) + col)}
				</Text>
				</>
				)}
			</View>
		);
	}
);

const Row = React.memo(({ white, row, ...rest }: RowProps) => {
	const offset = white ? 0 : 1;
	return (
		<View style={styles.container}>
			{new Array(8).fill(0).map((_, i) => (
				<Square
					{...rest}
					row={row}
					col={i}
					key={i}
					white={(i + offset) % 2 === 1}
				/>
			))}
		</View>
	);
});

const Background: React.FC = React.memo(() => {
	const { withLetters, withNumbers } = useChessboardProps();
	return (
		<View style={{ flex: 1 }}>
			{new Array(8).fill(0).map((_, i) => (
				<Row
					key={i}
					white={i % 2 === 0}
					row={i}
					letters={withLetters}
					numbers={withNumbers}
				/>
			))}
		</View>
	);
});

export default Background;
