import React, { useState, useEffect } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Alert
} from 'react-native';
import { ethers} from 'ethers';

const EoaScreen = ({navigation}) => {

	const provider = new ethers.providers.JsonRpcProvider("https://polygon.llamarpc.com")
	const avoProvider = new ethers.providers.JsonRpcProvider("https://rpc.avocado.instadapp.io")
	const eoaAddress = '0x910E413DBF3F6276Fe8213fF656726bDc142E08E'
	async function onTransferToAvocado(){
		await avoProvider.send('api_getSafes', [{address: eoaAddress}])
		Alert.alert('Transfer Assets to Avicado', 'Do you want to transfer ?', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ])
	}
	const[ethBalance, setEthBalance] = useState(0)
	useEffect(() => {
		    provider.getBalance(eoaAddress).then((balance) => {
	       const balanceInEth = ethers.utils.formatEther(balance)
	       setEthBalance(balanceInEth)
	      })
	})

	return (
    <View
      style={[
        styles.container,
        {
          // Try setting `flexDirection` to `"row"`.
          flexDirection: 'column',
        },
      ]}>
      <View style={{flex: 5,alignItems: 'center' }}>
        <View style={{marginTop:100}} ><Text style={{fontSize:20, fontWeight:'bold'}} >EOA</Text></View>
        <View style={{flexDirection:'row', marginTop:10}}><Text>78876786686</Text><Text style={{marginLeft:5}}>Icon</Text></View>
        <View style={{flexDirection:'row', marginTop:15}}><Text>USDC(polygon):</Text><Text style={{marginLeft:5}}>{ethBalance}</Text></View>

        <TouchableOpacity onPress={onTransferToAvocado} style={{ marginTop:50, height:50,justifyContent:'center',alignItems:'center', borderWidth:1, borderRadius:5, borderColor:'green' }}>
          <Text style={{alignSelf:'center'}}> Transfer all to Avocado </Text>
        </TouchableOpacity>


      </View>
      <View style={{flex: 1,flexDirection:'row', justifyContent:'center'}}>
        <TouchableOpacity style={{ marginTop:50, height:50, width:'49%',justifyContent:'center',alignItems:'center', borderWidth:1, borderRadius:5, backgroundColor:'#F5F5DC' }}>
          <Text style={{alignSelf:'center'}}> EOA Address </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Avocado')} style={{ marginTop:50, height:50, width:'49%',justifyContent:'center',alignItems:'center', borderWidth:1, borderRadius:5, borderColor:'green' }}>
          <Text style={{alignSelf:'center'}}> Avocado Address </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  container: {
    flex: 1,
    padding: 5,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default EoaScreen;