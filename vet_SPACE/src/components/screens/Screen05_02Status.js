import 'react-native-gesture-handler';
import * as React from 'react';

import {Text, View, StyleSheet, ScrollView, Alert, TouchableOpacity} from 'react-native';
import { Table, Row} from 'react-native-table-component';

import {colors} from '../../utils/Styles';
import { FIRESTORE_DATA1 } from '../../utils/firebaseData';
import {horizontalScale, verticalScale, moderateScale} from '../../utils/scailing';

import firestore from '@react-native-firebase/firestore';

import DateSelectModal from '../modal/DateSelectModal2';
import ClassificationSelectModal from '../modal/ClassificationSelectModal';
import LocationSelectModal from '../modal/LocationSelectModal';

export default function StatusScreen() {
  const [dateSelectModal, setDateSelectModal] = React.useState(false);
  const [dateData, setDateData] = React.useState('선 택');
  const [dateStyle, setDateStyle] = React.useState(false);
  
  const [classificationSelectModal, setClassificationSelectModal] = React.useState(false);
  const [classificationData, setClassificationData] = React.useState('선 택');
  const [classificationStyle, setClassificationStyle] = React.useState(false);

  const [locationSelectModal, setLocationSelectModal] = React.useState(false);
  const [locationData, setLocationData] = React.useState('선 택');
  const [locationStyle, setLocationStyle] = React.useState(false);
  const [buildingData, setBuildingData] = React.useState('');
  const [roomData, setRoomData] = React.useState('');

  let [time, setTime] = React.useState([]);
  let [timeStyle, setTimeStyle] = React.useState([]);

  const time_first = [
    ['08:00 ~ 08:30', ' '],
    ['08:30 ~ 09:00', ' '],
    ['09:00 ~ 09:30', ' '],
    ['09:30 ~ 10:00', ' '],
    ['10:00 ~ 10:30', ' '],
    ['10:30 ~ 11:00', ' '],
    ['11:00 ~ 11:30', ' '],
    ['11:30 ~ 12:00', ' '],
    ['12:00 ~ 12:30', ' '],
    ['12:30 ~ 13:00', ' '],
    ['13:00 ~ 13:30', ' '],
    ['13:30 ~ 14:00', ' '],
    ['14:00 ~ 14:30', ' '],
    ['14:30 ~ 15:00', ' '],
    ['15:00 ~ 15:30', ' '],
    ['15:30 ~ 16:00', ' '],
    ['16:00 ~ 16:30', ' '],
    ['16:30 ~ 17:00', ' '],
    ['17:00 ~ 17:30', ' '],
    ['17:30 ~ 18:00', ' '],
    ['18:00 ~ 18:30', ' '],
    ['18:30 ~ 19:00', ' '],
    ['19:00 ~ 19:30', ' '],
    ['19:30 ~ 20:00', ' '],
    ['20:00 ~ 20:30', ' '],
    ['20:30 ~ 21:00', ' '],
    ['21:00 ~ 21:30', ' '],
    ['21:30 ~ 22:00', ' '],
  ];
  const timeStyle_first = [
    0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,
  ];

  const toggleDateSelectModal =  () => {
    setDateSelectModal(prev => (!prev));
  };
  const dateHandler = (data) => {
    if(classificationStyle){
      setClassificationStyle(false);
      setClassificationData('선 택');
    }
    if(locationStyle){
      setLocationStyle(false);
      setLocationData('선 택');
      resetTable();
    }
    setDateData(data);
    toggleDateSelectModal();
    dateStyleChange();
  };
  const dateStyleChange = () => {
    setDateStyle(true);
  };
  
  const toggleClassificationSelectModal = () => {
    if(!dateStyle){
      Alert.alert("날짜 오류","날짜를 먼저 선택해주세요");
    }else{
      setClassificationSelectModal(prev => (!prev));
    }
  };
  const classificationHandler = (data) => {
    if(locationStyle){
      setLocationStyle(false);
      setLocationData('선 택');
      resetTable();
    }
    setClassificationData(data);
    toggleClassificationSelectModal();
    classificationStyleChange();
    
  };
  const classificationStyleChange = () => {
    setClassificationStyle(true);
  };
  
  const toggleLocationSelectModal = () => {
    if(!dateStyle){
      Alert.alert("날짜 오류","날짜를 먼저 선택해주세요");
    }else if(!classificationStyle){
      Alert.alert("구분 오류","구분을 먼저 선택해주세요");
    }else{
      setLocationSelectModal(prev => (!prev));
    }
  };
  const locationHandler = (building, room) => {
    setLocationData(building + '/' + room);
    setBuildingData(building);
    setRoomData(room);
    toggleLocationSelectModal();
    locationStyleChange();
    changeTable(building,room);
  };
  const locationStyleChange = () => {
    setLocationStyle(true);
  };

  const changeTable = (building, room) => {
    let time_tmp = time_first;
    let timeStyle_tmp = timeStyle_first;
    firestore().collection(FIRESTORE_DATA1).doc(dateData).collection('Data')
    .where("room_id", "==", "/"+classificationData+"/"+building+"/"+room).where("use_check", "==", true).get()
    .then(querySnapshot => {
      if(querySnapshot.empty){
        Alert.alert('예약','예약이 없습니다.');
      }else{
        querySnapshot.forEach(doc => {
          const s_time = doc.get('start_time');
          const e_time = doc.get('end_time');
          const startnum = (Number(s_time.substr(0,2)) - 8 ) * 2 + (Number(s_time.substr(3)/30));
          const endnum = (Number(e_time.substr(0,2)) - 8 ) * 2 + (Number(e_time.substr(3)/30));
          const user_name = doc.get('user_name');
          const prof_name = doc.get('prof_name');
          const purpose = doc.get('purpose');
          const confirmed = doc.get('reserv_confirm');
          let confirm_text = '/대기중';
          let confirm_style = 2;
          if(confirmed){
            confirm_text = '/예약됨';
            confirm_style = 3;
          }
          for(let i=startnum;i<endnum;i++){
            time_tmp[i][1] = user_name+"/"+s_time+" ~ "+e_time+" / "+purpose+"/담당 교수: "+prof_name+confirm_text;
            timeStyle_tmp[i] = confirm_style;
          }
        })
      }
      setTime(time_tmp);
      setTimeStyle(timeStyle_tmp);
    }).catch(e => {
      Alert.alert('error 520', e.code);
    });
  };

  const resetTable = () => {
    setTime(time_first);
    setTimeStyle(timeStyle_first);
  };

  const state = {
    tableTitle: ['예약 내역'],
    widthArr: [horizontalScale(373)],
    divisionArr: ['시간', '내용'],
    widthArr2: [horizontalScale(118),horizontalScale(255)],
    widthArr3: [horizontalScale(118),horizontalScale(255)],
  };
  
  React.useEffect(() => {
    resetTable();
  }, []);

  return(
    <View style={statusStyle.container}>
      <View style={statusStyle.top}>
      </View>
      <View style={statusStyle.mid}>
        <View style={statusStyle.rowContainer}>
          <View style={statusStyle.TextContainer}>
            <Text style={statusStyle.Text}>날짜 :</Text>
          </View>
          <TouchableOpacity 
            style={statusStyle.SelectBox}
            onPress={() => toggleDateSelectModal()}
          >
            <Text style={
              dateStyle ?
              statusStyle.InboxSelectedText
              : statusStyle.InboxText
            }>{dateData}</Text>
          </TouchableOpacity>
        </View>
        <View style={statusStyle.rowContainer}>
          <View style={statusStyle.TextContainer}>
            <Text style={statusStyle.Text}>구분 :</Text>
          </View>
          <TouchableOpacity 
            style={statusStyle.SelectBox}
            onPress={()=>toggleClassificationSelectModal()}
          >
            <Text style={
              classificationStyle ?
              statusStyle.InboxSelectedText
              : statusStyle.InboxText
            }>{classificationData}</Text>
          </TouchableOpacity>
        </View>
        <View style={statusStyle.rowContainer}>
          <View style={statusStyle.TextContainer}>
            <Text style={statusStyle.Text}>장소 :</Text>
          </View>
          <TouchableOpacity 
            style={statusStyle.SelectBox}
            onPress={()=>toggleLocationSelectModal()}
          >
            <Text style={
              locationStyle ? 
              statusStyle.InboxSelectedText3
              : statusStyle.InboxText
            }>{locationData}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={statusStyle.bot}>
        <View style={statusStyle.TimeSheet}>
          <Table borderStyle={statusStyle.Border}>
            <Row data={state.tableTitle} widthArr={state.widthArr} style={statusStyle.SheetTitle} textStyle={statusStyle.SheetTitleText}/>
          </Table>
          <Table borderStyle={statusStyle.Border}>
            <Row data={state.divisionArr} widthArr={state.widthArr2} style={statusStyle.SheetDivision} textStyle={statusStyle.SheetTitleText}/>
          </Table>
          <ScrollView persistentScrollbar={true}>
            <Table borderStyle={statusStyle.Border}>
              {
                time.map((rowData, index) => (
                  <Row
                    key={index}
                    data={rowData}
                    widthArr={state.widthArr3}
                    style={timeStyle[index] !== 0 ? 
                      (timeStyle[index] === 3 ? [statusStyle.ScrollRowConfirmed] : [statusStyle.ScrollRowReserved])
                      : [statusStyle.ScrollRow]
                    }
                    textStyle={statusStyle.SheetText}
                  />
                ))
              }
            </Table>
          </ScrollView>
        </View>
      </View>
      {dateSelectModal ? 
        <DateSelectModal 
          modalHandler={()=>toggleDateSelectModal()}
          dataHandler={(data)=>dateHandler(data)}
        /> 
        : <></>
      }
      {classificationSelectModal ?
        <ClassificationSelectModal
          modalHandler={()=>toggleClassificationSelectModal()}
          dataHandler={(data)=>classificationHandler(data)}
        /> 
        : <></>
      }
      {locationSelectModal ?
        <LocationSelectModal
          modalHandler={()=>toggleLocationSelectModal()}
          dataHandler={(building, room)=>locationHandler(building, room)}
          classificationdata={classificationData}
        /> 
        : <></>
      }
    </View>
  );
}

const statusStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    height: verticalScale(20),
  },
  mid: {
    marginBottom: verticalScale(20),
  },
  rowContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: '2%',
    marginTop: '5%',
  },
  TextContainer: {
    width: '30%',
  },
  Text: {
    fontSize: moderateScale(36),
    fontWeight: 'bold',
  },
  SelectBox: {
    justifyContent: 'center',
    height: verticalScale(40),
    width: horizontalScale(250),
    backgroundColor: colors.kuWhite,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.kuDarkGray,
  },
  InboxText: {
    alignSelf: 'center',
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    color: colors.kuDarkGray,
  },
  InboxSelectedText: {
    alignSelf: 'center',
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    color: colors.kuBlack,
  },
  InboxSelectedText3: {
    alignSelf: 'center',
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    color: colors.kuBlack,
  },
  bot: {
    flex: 1,
    marginBottom: verticalScale(40),
  },
  TimeSheet: {
    flex: 5,
    marginHorizontal: horizontalScale(20),
    marginBottom: verticalScale(20),
  },
  Border: {
    borderWidth: 1,
    borderColor: colors.kuBlack,
  },
  SheetTitle: {
    justifyContent: 'center',
    height: verticalScale(50),
    backgroundColor: colors.kuWarmGray,
  },
  SheetTitleText: {
    alignSelf: 'center',
    fontSize: moderateScale(24),
    fontWeight: 'bold',
  },
  SheetDivision:  {
    backgroundColor: colors.kuLightGray,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ScrollRow: {
    height: verticalScale(60),
    backgroundColor: colors.kuLightGray,
  },
  ScrollRowReserved: {
    height: verticalScale(60),
    backgroundColor: colors.kuBlue,
  },
  ScrollRowConfirmed: {
    height: verticalScale(60),
    backgroundColor: colors.kuOrange,
  },
  SheetText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: moderateScale(14),
  },
});