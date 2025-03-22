import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView, ScrollView, TouchableOpacity, Image, TextInput, FlatList, ViewStyle } from 'react-native';

const ITEM_HEIGHT = 50;

type CustomPickerProps = {
	data: string[];
	value?: string;
	onChange: (selected: string) => void;
	style?: ViewStyle;
};

export default function CustomPicker({ data, value, onChange }: CustomPickerProps) {
	const [selectedIndex, setSelectedIndex] = useState(
		value ? data.indexOf(value) : 0
	);
	const flatListRef = useRef<FlatList>(null);

	// Scroll to the selected index on mount (if value is passed in)
	useEffect(() => {
		if (flatListRef.current && selectedIndex >= 0) {
			flatListRef.current.scrollToOffset({
				offset: selectedIndex * ITEM_HEIGHT,
				animated: false,
			});
		}
	}, []);

	const onMomentumScrollEnd = (e: any) => {
		const offsetY = e.nativeEvent.contentOffset.y;
		const index = Math.round(offsetY / ITEM_HEIGHT);
		setSelectedIndex(index);
		onChange(data[index]);
	};

	return (
		<View style={styles.container}>
			<FlatList
				ref={flatListRef}
				data={data}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item, index }) => (
					<Text style={[styles.item, index === selectedIndex && styles.selectedItem]}>
						{item}
					</Text>
				)}
				getItemLayout={(_, index) => ({
					length: ITEM_HEIGHT,
					offset: ITEM_HEIGHT * index,
					index,
				})}
				showsVerticalScrollIndicator={false}
				snapToInterval={ITEM_HEIGHT}
				decelerationRate="fast"
				onMomentumScrollEnd={onMomentumScrollEnd}
			/>
			<View style={styles.selectorOverlay} />
		</View>
	);
}


const styles = StyleSheet.create({
    input: {
		// backgroundColor: 'gray',
		borderRadius: 10,
		fontSize: 16,
		padding: 15,
		borderWidth: 1.5,
		color: 'white',
		borderColor: '#403E43',
		backgroundColor: '#403E43',
    },
    container: {
		height: ITEM_HEIGHT * 3,
		overflow: 'hidden',
		alignItems: 'center',
	},
	item: {
		height: ITEM_HEIGHT,
		textAlign: 'center',
		textAlignVertical: 'center',
		fontSize: 20,
		color: '#aaa',
	},
	selectedItem: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 24,
	},
	selectorOverlay: {
		position: 'absolute',
		top: ITEM_HEIGHT,
		left: 0,
		right: 0,
		height: ITEM_HEIGHT,
		borderTopColor: '#888',
		borderBottomColor: '#888',
		borderTopWidth: 1,
		borderBottomWidth: 1,
	},
})