import React from 'react';
import { View } from 'react-native';
import { Layout } from 'react-native-rapi-ui';
import { WebView } from 'react-native-webview';

export default function ({ navigation }) {
	const injectedJavaScript = `
    (function() {
      const forecastElement = document.querySelector('#forecast');
      const text = forecastElement.querySelector('.aqi-forecast__get-app-text');
      text.remove();

      document.body.innerHTML = '';
      document.body.style.cssText = window.getComputedStyle(document.body).cssText;

      document.body.appendChild(forecastElement);
    })();
  `;

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
					injectedJavaScript={injectedJavaScript}
				/>
			</View>
		</Layout>
	);
}
