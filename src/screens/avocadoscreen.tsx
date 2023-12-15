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

const AvocadoScreen = ({navigation}) => {

const forwarderABI = [
          {
              "inputs": [
                  {
                      "internalType": "address",
                      "name": "owner_",
                      "type": "address"
                  },
                  {
                      "internalType": "uint32",
                      "name": "index_",
                      "type": "uint32"
                  }
              ],
              "name": "computeAvocado",
              "outputs": [
                  {
                      "internalType": "address",
                      "name": "",
                      "type": "address"
                  }
              ],
              "stateMutability": "view",
              "type": "function"
          }
      ]

      const avoProvider = new ethers.providers.JsonRpcProvider("https://rpc.avocado.instadapp.io")
      const forwarderContractAddress = '0x46978CD477A496028A18c02F07ab7F35EDBa5A54'
      const contract = new ethers.Contract(forwarderContractAddress, forwarderABI, avoProvider)
      const[avocadoBalance, setAvocadoBalance] = useState(0)
      useEffect(() => {
        avoProvider.getBalance(forwarderContractAddress).then((balance) => {
         const balanceAvocado = ethers.utils.formatEther(balance)
         setAvocadoBalance(balanceAvocado)
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
        <View style={{marginTop:100}} ><Text style={{fontSize:20, fontWeight:'bold'}} >Avocado</Text></View>
        <View style={{flexDirection:'row', marginTop:10}}><Text>78876786686</Text><Text style={{marginLeft:5}}>Icon</Text></View>
        <View style={{flexDirection:'row', marginTop:15}}><Text>USDC(polygon):</Text><Text style={{marginLeft:5}}>{avocadoBalance}</Text></View>



      </View>
      <View style={{flex: 1,flexDirection:'row', justifyContent:'center'}}>
        <TouchableOpacity onPress={() => navigation.navigate('Eoa')} style={{ marginTop:50, height:50, width:'49%',justifyContent:'center',alignItems:'center', borderWidth:1, borderRadius:5 }}>
          <Text style={{alignSelf:'center'}}> EOA Address </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginTop:50, height:50, width:'49%',justifyContent:'center',alignItems:'center', borderWidth:1, borderRadius:5, borderColor:'green',backgroundColor:'#F5F5DC' }}>
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

export default AvocadoScreen;