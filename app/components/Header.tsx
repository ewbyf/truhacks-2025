import React from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


const Header = ({ title }: { title: string }) => {
	const router = useRouter();

	return (
		<View
			style={{
				position: 'absolute',
				top: 0,
				width: '100%',
				height: 120,
				alignItems: 'flex-end',
				flexDirection: 'row',
				backgroundColor: '#1E1E1E',
				padding: 20,
				zIndex: 99,
				justifyContent: 'space-between',
			}}
		>
			<View style={{ flex: 1 }}>
				<TouchableOpacity onPress={() => router.back()}>
					<Icon name="arrow-back" size={30} color="white" />
				</TouchableOpacity>
			</View>
			<Text style={{ flex: 2, textAlign: 'center', fontWeight: 'bold', color: 'white', fontSize: 22 }}>{title}</Text>
			<View style={{ flex: 1 }}></View>
		</View>
	);
};

export default Header;
