import React, { useState } from 'react';
import { View, Button, Text, Alert, ScrollView } from 'react-native';
import { Layout } from 'react-native-rapi-ui';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

export default function ({ navigation }) {
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [period, setPeriod] = useState('DAY');
	const [aqiData, setAqiData] = useState([]);
	const [showStartPicker, setShowStartPicker] = useState(false);
	const [showEndPicker, setShowEndPicker] = useState(false);

	const fetchAqiData = async () => {
		const start = startDate.toISOString();
		const end = endDate.toISOString();
		const url = `https://airquality-bor1.onrender.com/api/v1/aqi/summary?location=Khoa%27s%20home&period=${period}&start=${start}&end=${end}`;
		console.log(url);
		try {
			const response = await axios.get(url);
			if (response.data.code === 200) {
				console.log(response.data.data.length);
				setAqiData(response.data.data);
			} else {
				Alert.alert('Error', response.data.message);
			}
		} catch (error) {
			Alert.alert('Error', 'Failed to fetch AQI data');
		}
	};

	const processChartData = () => {
		const labels = aqiData.map(item =>
			item.startTime.split('T')[period == 'HOUR' ? 1 : 0]);

		const data = aqiData.map(item => item.aqi);

		return {
			labels: labels,
			datasets: [
				{
					data: data,
					strokeWidth: 2,
				},
			],
		};
	};

	return (
		<Layout>
			<View style={{ padding: 20 }}>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
					<View style={{ flex: 1, marginRight: 10 }}>
						<Text>Start Time:</Text>
						<Button title={startDate.toLocaleString()} onPress={() => setShowStartPicker(true)} />
						{showStartPicker && (
							<DateTimePicker
								value={startDate}
								mode="datetime"
								display="default"
								onChange={(event, date) => {
									setShowStartPicker(false);
									if (date) setStartDate(date);
								}}
							/>
						)}
					</View>

					<View style={{ flex: 1, marginLeft: 10 }}>
						<Text>End Time:</Text>
						<Button title={endDate.toLocaleString()} onPress={() => setShowEndPicker(true)} />
						{showEndPicker && (
							<DateTimePicker
								value={endDate}
								mode="datetime"
								display="default"
								onChange={(event, date) => {
									setShowEndPicker(false);
									if (date) setEndDate(date);
								}}
							/>
						)}
					</View>
				</View>

				<View style={{ marginTop: 20 }}>
					<Text>Period:</Text>
					<Button title={`Period: ${period}`} onPress={() => setPeriod(period === 'HOUR' ? 'DAY' : 'HOUR')} />
				</View>

				<View style={{ marginTop: 20 }}>
					<Button title="Get AQI" onPress={fetchAqiData} />
				</View>

				{aqiData.length > 0 && (
					<ScrollView
						marginTop={100}
						horizontal={true}
						contentOffset={{ x: 10000, y: 0 }}
						showsHorizontalScrollIndicator={false}>
						<LineChart
							data={processChartData()}
							width={1000}
							height={250}
							xLabelsOffset={10}
							chartConfig={{
								backgroundColor: '#e26a00',
								backgroundGradientFrom: '#fb8c00',
								backgroundGradientTo: '#ffa726',
								decimalPlaces: 0,
								color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
								labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
								style: {
									borderRadius: 16,
								},
								propsForDots: {
									r: '6',
									strokeWidth: '2',
									stroke: '#ffa726',
								},
							}}
							withHorizontalLines={false}
							withVerticalLines={false}
							withHorizontalLabels={false}
							withInnerLines={false}
							withOuterLines={false}
							style={{
								paddingRight: 20,
								marginVertical: 8,
								borderRadius: 16,
							}}
							bezier
						/>
					</ScrollView>
				)}
			</View>
		</Layout >
	);
}
