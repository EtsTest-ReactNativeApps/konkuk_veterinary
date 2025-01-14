import 'react-native-gesture-handler';
import * as React from 'react';

import {View, Text, StyleSheet} from 'react-native';
import { TouchableOpacity} from 'react-native-gesture-handler';

import { colors } from '../../utils/Styles';
import {horizontalScale, verticalScale, moderateScale} from '../../utils/scailing';

export default function ReservCheckScreen({navigation}){
  return (
    <View style={reservCheckStyle.container}>
      <View style={reservCheckStyle.container2}>
        <View style={reservCheckStyle.Top}>
        </View>
        <View style={reservCheckStyle.Mid}>
          <TouchableOpacity 
            style={reservCheckStyle.TouchBox}
            onPress={() => navigation.navigate('List')}
            >
            <Text style={reservCheckStyle.SelectTitleText}>나의 예약확인</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={reservCheckStyle.TouchBox}
            onPress={() => navigation.navigate('Status')}
            >
            <Text style={reservCheckStyle.SelectTitleText2}>강의실별 예약 현황</Text>
          </TouchableOpacity>
        </View>
        <View style={reservCheckStyle.Bot}>
        </View>
      </View>
    </View>
  );
}
  
const reservCheckStyle = StyleSheet.create({
  // 폰트 사이즈 정리해야함
  container: {
    flex: 1,
  }, 
  container2: {
    flex: 1,
    margin: '5%',
    borderColor: colors.kuDarkGray,
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: 5,
  },
  Top: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Mid: {
    justifyContent: 'center',
    flex: 4,
  },
  TouchBox: {
    alignSelf: 'center',
    fontWeight: 'bold',
    backgroundColor: colors.kuLightGray,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    opacity: 0.8,
    marginVertical: '5%',
    width: '100%',
    height: verticalScale(120),
    padding: '4%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.kuDarkGreen,
  },
  SelectTitleText: {
    fontSize: moderateScale(42),
    fontWeight: 'bold',
  },
  SelectTitleText2: {
    fontSize: moderateScale(36),
    fontWeight: 'bold',
  },
  Bot: {
    flex: 2,
  },
});