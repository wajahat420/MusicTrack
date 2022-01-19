import React from 'react'
import { View, Text } from 'react-native'
import { WebView } from 'react-native-webview';


export default class Shop extends React.Component {

   render(){
      return (
         <View style={{flex:1}}>
            <WebView
               source={{
                  uri: 'https://www.amazon.de/stores/CLEANSPORTS/page/E1FE3A58-B6F0-4FFC-A265-CA98060C28E3?ref_=ast_bln'
               }}
               />
         {/* <WebView
            javaScriptEnabled={true}
            scalesPageToFit
           
            ref={(ref) => (this.browserRef = ref)}
            style={{backgroundColor: 'transparent'}}
            // renderLoading={LoadingIndicatorView}
            startInLoadingState={true}
            // onNavigationStateChange={this.onNavigationStateChange}
            thirdPartyCookiesEnabled={true}
         
            geolocationEnabled={true}
            cacheEnabled={true}
            domStorageEnabled={true}
            source={{ uri: 'https://www.amazon.de/stores/CLEANSPORTS/page/E1FE3A58-B6F0-4FFC-A265-CA98060C28E3?ref_=ast_bln' }}
      /> */}
         </View>
      )

   }
}
