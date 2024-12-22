import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Layout, useTheme, Button } from 'react-native-rapi-ui';
import { WebView } from 'react-native-webview';

export default function ({ navigation }) {
	const { isDarkmode } = useTheme();

	const [chart1Url, setChart1Url] = useState(`https://charts.mongodb.com/charts-airsense-cbihhvf/embed/charts?id=063bc463-9c6c-4ad1-9e51-d3ed7b1216c8&maxDataAge=3600&theme=${isDarkmode ? 'dark' : 'light'}&autoRefresh=true`);
	const [chart2Url, setChart2Url] = useState(`https://charts.mongodb.com/charts-airsense-cbihhvf/embed/charts?id=149139b5-9c14-458d-ad54-7a33b26788b5&maxDataAge=3600&theme=${isDarkmode ? 'dark' : 'light'}&autoRefresh=true`);
	const [isType1, setIsType1] = useState(true);

	const changeChartUrls = () => {
		if (isType1) {
			setChart1Url(`https://charts.mongodb.com/charts-airsense-cbihhvf/embed/charts?id=53bb46a9-e0bf-4c4d-8eaa-10939a51e8c6&maxDataAge=3600&theme=${isDarkmode ? 'dark' : 'light'}&autoRefresh=true`);
			setChart2Url(`https://charts.mongodb.com/charts-airsense-cbihhvf/embed/charts?id=44a9f1e9-1281-4e24-9f72-c09f63d47e29&maxDataAge=3600&theme=${isDarkmode ? 'dark' : 'light'}&autoRefresh=true`);
		} else {
			setChart1Url(`https://charts.mongodb.com/charts-airsense-cbihhvf/embed/charts?id=063bc463-9c6c-4ad1-9e51-d3ed7b1216c8&maxDataAge=3600&theme=${isDarkmode ? 'dark' : 'light'}&autoRefresh=true`);
			setChart2Url(`https://charts.mongodb.com/charts-airsense-cbihhvf/embed/charts?id=149139b5-9c14-458d-ad54-7a33b26788b5&maxDataAge=3600&theme=${isDarkmode ? 'dark' : 'light'}&autoRefresh=true`);
		}
		setIsType1(!isType1);
	};

	return (
		<Layout>
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<ScrollView horizontal>
					<WebView
						style={{
							width: 1000,
							height: 480,
							backgroundColor: isDarkmode ? '#1C2D38' : '#FFFFFF',
							borderRadius: 2,
							marginVertical: 10,
							boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
						}}
						source={{ uri: chart1Url }}
					/>
				</ScrollView>
				<ScrollView horizontal>
					<WebView
						style={{
							width: 1000,
							height: 480,
							backgroundColor: isDarkmode ? '#1C2D38' : '#FFFFFF',
							borderRadius: 2,
							marginVertical: 10,
							boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
						}}
						source={{ uri: chart2Url }}
					/>
				</ScrollView>

				<Button text={isType1 ? 'View Recent Hours' : 'View Days'} onPress={changeChartUrls} style={{
					marginTop: 10,
					marginBottom: 10,
				}} />

			</View>
		</Layout>
	);
}
