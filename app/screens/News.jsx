import React from 'react';
import { View } from 'react-native';
import { Layout } from 'react-native-rapi-ui';
import { WebView } from 'react-native-webview';

export default function ({ navigation }) {
	return (
		<Layout>
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<WebView
					style={{
						width: 640,
						height: 480,
					}}
					source={{
						uri: `https://www.iqair.com/vi/vietnam/hanoi`,
					}}
				/>
			</View>
		</Layout>
	);
}
