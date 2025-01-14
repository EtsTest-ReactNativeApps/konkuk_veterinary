import 'react-native-gesture-handler';
import * as React from 'react';

import {View, Text, StyleSheet,SafeAreaView, TouchableOpacity, Image, Alert} from 'react-native';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

import auth from '@react-native-firebase/auth';

import MainNavigator from './MainNavigator';
import Notice_Link from '../screens/Screen07_03Notice';
import Question_Link from '../screens/Screen07_04Questions';
import Help_Link from '../screens/Screen07_05Help';

import packageJson from '../../../package.json';
import { colors } from '../../utils/Styles';
import {IMG_KULOGO, IC_BACK, IC_FAQ, IC_HELP, IC_LOUDSPEAKER, IC_NOTEBOOK, IC_PROFILE} from '../../utils/icons';
import {horizontalScale, verticalScale, moderateScale} from '../../utils/scailing';

const Drawer = createDrawerNavigator();

function MenuDrawer(props) {
  const footerText = {
    address1: "서울특별시 광진구 능동로 120",
    address2: "건국대학교 수의학관 201호 행정실",
    tel1: "Tel : 02-450-3039",
    tel2: "Fax : 02-450-3037",
    version: "Version. ",
    copyright1: "COPYRIGHT ⓒALL RIGHT RESERVED.",
    copyright2: "COLLEGE OF VETERINARY, KONKUK UNIVERSITY",
  };
  const [name,setName] = React.useState('');

  const onPressLogOut = () => {
    auth().signOut().then(() => {
      props.navigation.navigate('Login');
    }).catch( e => {
      if(e.code === 'auth/no-current-user'){
        Alert.alert('로그아웃 오류','이미 로그아웃 되었습니다');
      }else{
        Alert.alert('error Log Out',e.code);
      }
    });
  };
  
  React.useEffect(() => {
    if(!auth().currentUser){
      props.navigation.navigate('Login');
    }else{
      setName(auth().currentUser.displayName);
    }
  },[]);

  return (
    <SafeAreaView style={menudrawerStyle.safearea}>
      <View style={menudrawerStyle.top}>
        <TouchableOpacity 
          style={menudrawerStyle.touchBox}
          onPress={() => props.navigation.toggleDrawer()}
        >
          <Image source={IC_BACK}/>
        </TouchableOpacity>
      </View>
      <View style={menudrawerStyle.mid}>
        <View style={menudrawerStyle.idBox}>
          <Image 
            style={menudrawerStyle.image}
            source={IMG_KULOGO}
          />
          <Text style={menudrawerStyle.idText}>{name} 님</Text>
          <View style={menudrawerStyle.box2}></View>
          <TouchableOpacity 
            style={menudrawerStyle.logOut}
            onPress={() => onPressLogOut()}
          >
            <Text style={menudrawerStyle.logOutText}>로그아웃</Text>
          </TouchableOpacity>
        </View>
        <View style={menudrawerStyle.line}></View>
      </View>
      <DrawerContentScrollView {...props}
      >
        <DrawerItem
          style={menudrawerStyle.item}
          label="내 정보"
          labelStyle={menudrawerStyle.label}
          icon={({ focused, color, size }) => (
            <Image
              source={IC_PROFILE}
              style={{height: size, width: size}}
              resizeMode="contain"
            />
          )}
          onPress={() => props.navigation.navigate('MainNavigator', {
            screen: "MyInfo",
          })}
        />
        <DrawerItem
          style={menudrawerStyle.item}
          label="나의 예약 확인"
          labelStyle={menudrawerStyle.label}
          icon={({ focused, color, size }) => (
            <Image
              source={IC_NOTEBOOK}
              style={{height: size, width: size}}
              resizeMode="contain"
            />
          )}
          onPress={() => props.navigation.navigate("MainNavigator", {
            screen: "ReservCheckNavigator",
            params: {
              screen: "List",
            }
          })}
        />
        <DrawerItem
          style={menudrawerStyle.item}
          label="공지사항"
          labelStyle={menudrawerStyle.label}
          icon={({ focused, color, size }) => (
            <Image
              source={IC_LOUDSPEAKER}
              style={{height: size, width: size}}
              resizeMode="contain"
            />
          )}
          onPress={() => props.navigation.navigate("Notice")}
        />
        <DrawerItem
          style={menudrawerStyle.item}
          label="자주 묻는 질문"
          labelStyle={menudrawerStyle.label}
          icon={({ focused, color, size }) => (
            <Image
              source={IC_FAQ}
              style={{height: size, width: size}}
              resizeMode="contain"
            />
          )}
          onPress={() => props.navigation.navigate("Question")}
        />
        <DrawerItem
          style={menudrawerStyle.item}
          label="도움말"
          labelStyle={menudrawerStyle.label}
          icon={({ focused, color, size }) => (
            <Image
              source={IC_HELP}
              style={{height: size, width: size}}
              resizeMode="contain"
            />
          )}
          onPress={() => props.navigation.navigate("Help")}
        />
      </DrawerContentScrollView>
      <View style={menudrawerStyle.bot}>
        <Text></Text>
        <Text style={menudrawerStyle.text1}>{footerText.address1}</Text>
        <Text style={menudrawerStyle.text1}>{footerText.address2}</Text>
        <Text style={menudrawerStyle.text1}>{footerText.tel1}</Text>
        <Text style={menudrawerStyle.text1}>{footerText.tel2}</Text>
        <Text style={menudrawerStyle.text}>{footerText.version+packageJson.version}</Text>
        <Text style={menudrawerStyle.text}>{footerText.copyright1}</Text>
        <Text style={menudrawerStyle.text}>{footerText.copyright2}</Text>
        <Text></Text>
      </View>
    </SafeAreaView>
  );
}

const menudrawerStyle = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: colors.gray,
  },
  top: {
    height: verticalScale(50),
    backgroundColor: colors.kuDarkGreen,
    justifyContent: 'center',
  },
  touchBox: {
    padding: 5,
    marginRight: '10%',
  },
  mid: {
    height: verticalScale(110),
    backgroundColor: colors.lightGray,
  },
  idBox: {
    marginTop: verticalScale(30),
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    marginLeft: horizontalScale(15),
    width: moderateScale(50),
    height: moderateScale(50),
    resizeMode: 'stretch',
  },
  idText:{
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    marginLeft: horizontalScale(10),
  },
  box2: {
    flex: 1,
  },
  logOut: {
    marginRight: horizontalScale(15),
  },
  logOutText: {
    color: colors.kuDarkGreen,
    fontSize: moderateScale(16),
    fontWeight: '400',
  },
  line: {
    height: 2,
    backgroundColor: colors.kuBlack,
    marginHorizontal: horizontalScale(12),
    marginTop: horizontalScale(10),
  },
  item: {
    backgroundColor: colors.lightGray,
  },
  label: {
    color: colors.kuBlack,
    fontSize: moderateScale(24),
    fontWeight: '500',
  },
  bot: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: colors.kuCoolGray,
  },
  text: {
    fontSize: moderateScale(10),
  },
  text1: {
    fontSize: moderateScale(14),
  },
  
});


export default function DrawerNavigator({navigation}) {
  React.useLayoutEffect( ()=> {
    navigation.setOptions({headerShown: false});
  }, [navigation]);
  return (
    <Drawer.Navigator
      drawerPosition="right"
      drawerType="front"
      drawerContent={(props) => <MenuDrawer {...props}/>}
    >
      <Drawer.Screen
        name="MainNavigator"
        component={MainNavigator}
      />
      <Drawer.Screen
        name="Notice"
        component={Notice_Link}
      />
      <Drawer.Screen
        name="Question"
        component={Question_Link}
      />
      <Drawer.Screen
        name="Help"
        component={Help_Link}
      />
    </Drawer.Navigator>
  );
}