import React from 'react';
import { View } from 'react-native';
import { Layout, useTheme } from 'react-native-rapi-ui';
import { WebView } from 'react-native-webview';

export default function ({ navigation }) {
	const { isDarkmode } = useTheme();

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
						backgroundColor: isDarkmode ? '#1C2D38' : '#FFFFFF',
						borderRadius: 2,
						marginVertical: 10,
						boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
					}}
					source={{
						uri: `https://charts.mongodb.com/charts-project-0-vcvxgqk/embed/charts?id=fa19d699-6352-4441-8c05-17b1e9686302&maxDataAge=3600&theme=${isDarkmode ? 'dark' : 'light'}&autoRefresh=true`,
					}}
				/>
				<WebView
					style={{
						width: 640,
						height: 480,
						backgroundColor: isDarkmode ? '#1C2D38' : '#FFFFFF',
						borderRadius: 2,
						marginVertical: 10,
						boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
					}}
					source={{
						uri: `https://charts.mongodb.com/charts-project-0-vcvxgqk/embed/charts?id=3ab1418c-1954-45f9-a7f6-72a9c5379c6b&maxDataAge=3600&theme=${isDarkmode ? 'dark' : 'light'}&autoRefresh=true`,
					}}
				/>
			</View>
		</Layout>
	);
}
