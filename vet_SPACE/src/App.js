import 'react-native-gesture-handler';
import * as React from 'react';

import {View, Text, Button, TextInput, ImageBackground, Platform, StyleSheet, Image} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import {Table, Row, Rows} from 'react-native-table-component';
import { colors } from './utils/Styles';

import {IMG_BACKGROUND, IMG_KULOGO, IC_MENU, IC_HOME, IC_SETTING} from './utils/icons';

//import background1 from '../assets/images/';
//'https://www.notion.so/Test-fd9f7012616644019d0d2e4f007f6c70' -> 노션 예시 링크
/*
<Button
          title="Create post"
          onPress={() => navigation.navigate('CreatePost')}
        />
        <Text style={{margin: 10}}></Text>
*/
function StartScreen({navigation, route}) {
  /** 
    1. splash로 변경해서 넣어주기
    2. 건국대학교 로고 배경 없는 것으로 넣어주기 
   */
  return (
    <View style={startStyle.container}>
      <ImageBackground
        source={IMG_BACKGROUND}
        style={{width: '100%', height: '100%'}}>
        <View style={startStyle.startTop}>
          <Image style={startStyle.startLogoImage} source={IMG_KULOGO}/>
        </View>
        <View style={startStyle.startMid}>
          <Text style={startStyle.startTitleText}>건국대학교</Text>
          <Text style={startStyle.startTitleText}>수의과대학</Text>
          <Text style={startStyle.startTitleText}>강의실대여</Text>
        </View>
        <View style={startStyle.startBot}>

        </View>
      </ImageBackground>
    </View>
  );
}

function LoginScreen({navigation, route}) {
  /**
   추가 수정해야할 사항
   /// 아이디, 비밀번호 입력 시에 화면이 잘 안보이는 현상이 있음 -> 수정이 필요
    1. 아이디 비밀번호 입력 시에 위로 눌러지면서 화면이 잘 보이지 않는 현상 
    2. 자동 로그인 옵션 확인
    3. 회원가입 연결 
    4. 네비게이션 옵션 연결 
   */
  const [isSelected, setSelection] = React.useState(false);
  if (Platform.OS === 'web') {
    return (
      <View></View>
    );
  }
  else{
    return (
      <View style={loginStyle.container}>
        <ImageBackground
          source={IMG_BACKGROUND}
          style={{width: '100%', height: '100%'}}>
          <View style={loginStyle.loginTop}>
            <Text style={loginStyle.loginTitleText} >건국대학교</Text>
            <Text style={loginStyle.loginTitleText} >수의과대학</Text>
            <Text style={loginStyle.loginTitleText} >강의실대여</Text>
          </View>
          <View style={loginStyle.loginMid}>
            <TextInput style={loginStyle.loginInputTextBox}>
              <Text>     아이디(ID)</Text>
            </TextInput>
            <TextInput style={loginStyle.loginInputTextBox}>
              <Text>     비밀번호(Password)</Text>
            </TextInput>
            <TouchableOpacity style={loginStyle.loginButton}>
              <Text>로그인(Login)</Text>
            </TouchableOpacity>
            
            <View style={loginStyle.loginAutoLogin}>
              <CheckBox
                disabled={false}
                value={isSelected}
                onValueChange={setSelection}
                boxType='square'
                style={loginStyle.loginCheckBox}
              />
              <Text style={loginStyle.loginAutoLoginText}>자동 로그인(Auto Login) / </Text>
              <TouchableOpacity>
                <Text style={loginStyle.loginNewAccButton}>회원가입(Sign Up)</Text>
              </TouchableOpacity>
            </View>
            
          </View>
          <View style={loginStyle.loginBot}>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
function MainScreen({navigation, route}){
  /**
    추가 변경해야할 사항
    1. 각 옵션 선택 시 넘어가는 네비게이션 연결 
    2. 메뉴 연결 
   */
  return (
    <View>
      <ImageBackground
        source={IMG_BACKGROUND}
        style={{width: '100%', height: '100%'}}>
        <View style={mainStyle.mainTop}>
          <Text style={mainStyle.mainTitleText}>수의과대학</Text>
          <Text style={mainStyle.mainTitleText}>강의실대여</Text>
        </View>
        <View style={mainStyle.mainMid}>
          <TouchableOpacity style={mainStyle.mainTouchBox}>
            <Text style={mainStyle.mainSelectTitleText}>강의실예약</Text>
          </TouchableOpacity>
          <TouchableOpacity style={mainStyle.mainTouchBox}>
            <Text style={mainStyle.mainSelectTitleText}>예약확인</Text>
          </TouchableOpacity>
          <TouchableOpacity style={mainStyle.mainTouchBox}>
            <Text style={mainStyle.mainSelectTitleText}>강의실정보</Text>
          </TouchableOpacity>
        </View>
        <View style={mainStyle.mainBot}>
          
        </View>
      </ImageBackground>
    </View>
  );
}

function DateLocaScreen(){
  /**
    추가 및 변경해야 하는 내용
    1. 날짜, 구분, 장소 각각 선택창 UI
    2. 다음 버튼 활성화 옵션
    3. 다믕 버튼 활성화 스타일 
    4. 메뉴 연결
    5. 홈 버튼 연결
   */
  return (
    <View style={DateLocaStyle.container}>
      <View style={DateLocaStyle.dateLocaTop}>
      </View>
      <View style={DateLocaStyle.dateLocaMid}>
        <View style={DateLocaStyle.dateLocaContainer}>
          <View style={DateLocaStyle.dateLocaTextContainer}>
            <Text style={DateLocaStyle.dateLocaText}>날짜 :</Text>
          </View>
          <TouchableOpacity style={DateLocaStyle.dateLocaSelectBox}>
            <Text style={DateLocaStyle.dateLocaInboxText}>선 택</Text>
          </TouchableOpacity>
        </View>
        <View style={DateLocaStyle.dateLocaContainer}>
          <View style={DateLocaStyle.dateLocaTextContainer}>
            <Text style={DateLocaStyle.dateLocaText}>구분 :</Text>
          </View>
          <TouchableOpacity style={DateLocaStyle.dateLocaSelectBox}>
            <Text style={DateLocaStyle.dateLocaInboxText}>선 택</Text>
          </TouchableOpacity>
        </View>
        <View style={DateLocaStyle.dateLocaContainer}>
          <View style={DateLocaStyle.dateLocaTextContainer}>
            <Text style={DateLocaStyle.dateLocaText}>장소 :</Text>
          </View>
          <TouchableOpacity style={DateLocaStyle.dateLocaSelectBox}>
            <Text style={DateLocaStyle.dateLocaInboxText}>선 택</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={DateLocaStyle.dateLocaBot}>
        <TouchableOpacity style={DateLocaStyle.dateLocaNextButton}>
          <Text style={DateLocaStyle.dateLocaNextText}>다     음</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function TimeSelectScreen(){
  /**
    추가로 넣어주어야 하는 부분
    1. 시간 선택 시 스타일 변경
    2. 시간 선택 시 선택된 시간으로 선택 박스 변경
    3. 선택 박스 선택 시 넘어가는 UI
    4. 시간 시작 종료 모두 선택 시 다음 버튼 활성화
    5. 다음 버튼 활성화 시 스타일 변화 
    6. 테이블 모양 가다듬기
    7. 테이블에서 선택된 시간 스타일 변화
    8. 테이블에서 이미 선택된 시간 스타일 변화
    9. 테이블 데이터베이스 연동 
    10. 메뉴 연결
    11. 홈 버튼 연결
   */
  const state = {
    tableTitle: ['2021년 03월 01일 // 207호 예약 내역'],
    widthArr: [372],
    divisionArr: ['시간', '내용'],
    widthArr2: [100,272],
  };
  const timeTableData = [];
  for(let i = 0;i<14; i+=1){
    const rowData = [];
    const tmp = i+8;
    const tmp2 = i+9;
    if(tmp<10){
      tmp = '0'+tmp;
    }
    if(tmp2<10){
      tmp2 = '0'+tmp2;
    }
    rowData.push(tmp+'00~'+tmp2+'00');
    rowData.push(i);
    timeTableData.push(rowData);
  }
  return (
    <View style={timeSelectStyle.container}>
      <View style={timeSelectStyle.timeSelectTop}>
      </View>
      <View style={timeSelectStyle.timeSelectMid}>
        <View style={timeSelectStyle.timeSelectTime}>
          <View style={timeSelectStyle.timeSelectContainer}>
            <View style={timeSelectStyle.timeSelectTextContainer}>
              <Text style={timeSelectStyle.timeSelectText}>시간 :</Text>
            </View>
            <TouchableOpacity style={timeSelectStyle.timeSelectSelectBox}>
              <Text style={timeSelectStyle.timeSelectInboxText}>선 택</Text>
            </TouchableOpacity>
            <Text style={timeSelectStyle.timeSelectText2}>  부터</Text>
          </View>
          <View style={timeSelectStyle.timeSelectContainer}>
            <View style={timeSelectStyle.timeSelectTextContainer}>
              <Text style={timeSelectStyle.timeSelectText}>    </Text>
            </View>
            <TouchableOpacity style={timeSelectStyle.timeSelectSelectBox}>
              <Text style={timeSelectStyle.timeSelectInboxText}>선 택</Text>
            </TouchableOpacity>
            <Text style={timeSelectStyle.timeSelectText2}>  까지</Text>
          </View>
        </View>
        <View style={timeSelectStyle.timeSelectTimeSheet}>
          <Table borderStyle={timeSelectStyle.timeSelectBorder}>
            <Row data={state.tableTitle} widthArr={state.widthArr} style={timeSelectStyle.timeSelectSheetTitle} textStyle={timeSelectStyle.timeSelectSheetTitleText}/>
          </Table>
          <Table borderStyle={timeSelectStyle.timeSelectBorder}>
            <Row data={state.divisionArr} widthArr={state.widthArr2} style={timeSelectStyle.timeSelectSheetDivision} textStyle={timeSelectStyle.timeSelectSheetTitleText}/>
          </Table>
          <ScrollView style={timeSelectStyle.timeSelectWrapper}>
            <Table borderStyle={timeSelectStyle.timeSelectBorder}>
              {
                timeTableData.map((rowData, index) => (
                  <Row
                    key={index}
                    data={rowData}
                    widthArr={state.widthArr2}
                    style={[timeSelectStyle.timeSelectScrollRow]}
                    textStyle={timeSelectStyle.timeSelectSheetText}
                  />
                ))
              }
            </Table>
          </ScrollView>
        </View>
      </View>
      <View style={timeSelectStyle.timeSelectBot}>
        <TouchableOpacity style={timeSelectStyle.timeSelectNextButton}>
          <Text style={timeSelectStyle.timeSelectNextText}>다     음</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
} 
function DetailScreen(){
  const __name = '홍길동'
  const __phone = '010-1234-5678'
  const __time = '1200 ~ 1400'
  const __purpose = '선 택'
  const __prof = '선 택'

  const state = {
    tableIndex: [
      ['신청자'],
      ['연락처'],
      ['시 간'],
      ['목 적'],
      ['담당교수'],
    ],
    widthArr: [
      140
    ],
    widthArr2: [
      260
    ],
  }
  return (
    <View style={detailStyle.container}>
      <View style={detailStyle.detailTop}>
        <Text style={detailStyle.detailTitleText}>
          세부사항입력
        </Text>
      </View>
      <View style={detailStyle.detailMid}>
        <View style={detailStyle.detailTableContainer}>
          <Table>
            <Rows data={state.tableIndex} widthArr={state.widthArr} style={detailStyle.detailTable} textStyle={detailStyle.detailTableText}/>
          </Table>
          <View style={detailStyle.detailVerticleLine}></View>
          <View style={detailStyle.detailTable}>
            <Text style={detailStyle.detailTableText2}>{__name}</Text>
            <Text style={detailStyle.detailTableText2}>{__phone}</Text>
            <Text style={detailStyle.detailTableText2}>{__time}</Text>
            <TouchableOpacity>
              <Text style={detailStyle.detailTableText3}>{__purpose}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={detailStyle.detailTableText3}>{__prof}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={detailStyle.detailBot}>
        <TouchableOpacity style={detailStyle.detailNextButton}>
          <Text style={detailStyle.detailNextText}>제출하기</Text>
        </TouchableOpacity>
      </View>
    </View>

  );
}
function CompleteScreen(){
  return(
    <View style={completeStyle.container}>
      <View style={completeStyle.completeTop}>
        <Text style={completeStyle.completeTitleText}>예약신청 작성 완료</Text>
      </View>
      <View style={completeStyle.completeMid}>
        <View style={completeStyle.completeContainer1}>
          <Text style={completeStyle.completeText}>
            아래 내용을 확인해주세요
          </Text>
          <View style={completeStyle.completeLine}></View>
          <Text style={completeStyle.completeText2}>
              이용시간 30분 전까지
          </Text>
          <Text style={completeStyle.completeText2}>
            취소할 수 있습니다
          </Text>
        </View>
        <View style={completeStyle.completeContainer2}>

        </View>
      </View>
      <View style={completeStyle.completeBot}>

      </View>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Complete">
        <Stack.Screen
          name="Start"
          component={StartScreen}
          options={{
            headerTitleAlign: 'center',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: 'Overview',
            headerTitleAlign: 'center',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{
            headerStyle: {
              backgroundColor: colors.kuDarkGreen,
            },
            headerRight: () => (
              <TouchableOpacity style={headerStyle.headerMenuTouchBox}>
                <Image source={IC_MENU}/>
              </TouchableOpacity>
            ),
            title: '',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="DateLoca"
          component={DateLocaScreen}
          options={{
            headerStyle: {
              backgroundColor: colors.kuDarkGreen,
            },
            headerRight: () => (
              <View style={headerStyle.headerContainer}>
                <TouchableOpacity style={headerStyle.headerHomeTouchBox}>
                  <Image source={IC_HOME}/>
                </TouchableOpacity>
                <TouchableOpacity style={headerStyle.headerMenuTouchBox}>
                  <Image source={IC_MENU}/>
                </TouchableOpacity>
              </View>
            ),
            title: '강의실 예약',
            headerTintColor: colors.kuLightGray,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 24,
            },
          }}
        />
        <Stack.Screen
          name="TimeSelect"
          component={TimeSelectScreen}
          options={{
            headerStyle: {
              backgroundColor: colors.kuDarkGreen,
            },
            headerRight: () => (
              <View style={headerStyle.headerContainer}>
                <TouchableOpacity style={headerStyle.headerHomeTouchBox}>
                  <Image source={IC_HOME}/>
                </TouchableOpacity>
                <TouchableOpacity style={headerStyle.headerMenuTouchBox}>
                  <Image source={IC_MENU}/>
                </TouchableOpacity>
              </View>
            ),
            title: '강의실 예약',
            headerTintColor: colors.kuLightGray,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 24,
            },
          }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{
            headerStyle: {
              backgroundColor: colors.kuDarkGreen,
            },
            headerRight: () => (
              <View style={headerStyle.headerContainer}>
                <TouchableOpacity style={headerStyle.headerHomeTouchBox}>
                  <Image source={IC_HOME}/>
                </TouchableOpacity>
                <TouchableOpacity style={headerStyle.headerMenuTouchBox}>
                  <Image source={IC_MENU}/>
                </TouchableOpacity>
              </View>
            ),
            title: '강의실 예약',
            headerTintColor: colors.kuLightGray,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 24,
            },
          }}
        />
        <Stack.Screen
          name="Complete"
          component={CompleteScreen}
          options={{
            headerStyle: {
              backgroundColor: colors.kuDarkGreen,
            },
            headerRight: () => (
              <View style={headerStyle.headerContainer}>
                <TouchableOpacity style={headerStyle.headerHomeTouchBox}>
                  <Image source={IC_HOME}/>
                </TouchableOpacity>
                <TouchableOpacity style={headerStyle.headerMenuTouchBox}>
                  <Image source={IC_MENU}/>
                </TouchableOpacity>
              </View>
            ),
            title: '강의실 예약',
            headerTintColor: colors.kuLightGray,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 24,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const loginStyle = StyleSheet.create({
  // 폰트 사이즈 정리해야함
  container: {
    flex: 1,
  },
  loginTop: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  loginMid: {
    //alignItems: 'center',
    justifyContent: 'center',
    flex: 5,
  },
  loginBot: {
    flex: 2,
  },
  loginTitleText: {
    fontWeight: 'bold',
    fontSize: 42,
  },
  loginInputTextBox: {
    alignSelf: 'center',
    backgroundColor: colors.kuLightGray,
    width: '70%',
    height: '15%',
    opacity: 0.8,
    margin: '2%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.kuDarkGray,
  },
  loginButton: {
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: colors.kuGreen,
    opacity: 0.8,
    width: '70%',
    padding: '3%',
    margin: '2%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.kuGreen,
  },
  loginAutoLogin: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginCheckBox: {
    transform: [{scaleX: 0.8}, {scaleY: 0.8}]
  },
  loginAutoLoginText: {
    fontWeight: 'bold',
    flexDirection: 'row',
  },
  loginNewAccButton: {
    textDecorationLine: 'underline',
  }
});

const startStyle = StyleSheet.create({
  // 폰트 사이즈 정리해야함
  container: {
    flex: 1,
  },
  startTop: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startMid: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 4,
  },
  startBot: {
    flex: 3,
  },
  startLogoImage: {
    aspectRatio: 0.2,
    resizeMode: 'contain',
  },
  startTitleText: {
    fontWeight: 'bold',
    fontSize: 42,
  }
});

const mainStyle = StyleSheet.create({
  // 폰트 사이즈 정리해야함
  container: {
    flex: 1,
  }, 
  mainTop: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainMid: {
    justifyContent: 'center',
    flex: 4,
  },
  mainBot: {
    flex: 2,
  },
  mainTitleText: {
    fontWeight: 'bold',
    fontSize: 42,
  },
  mainTouchBox: {
    alignSelf: 'center',
    fontWeight: 'bold',
    backgroundColor: colors.kuLightGray,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    opacity: 0.8,
    margin: '2%',
    width: '70%',
    padding: '4%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.kuDarkGreen,
  },
  mainSelectTitleText: {
    fontSize: 42,
  },
});

const headerStyle = StyleSheet.create({
  headerMenuTouchBox:{
    // padding 크기 정리해야함 
    // 아이콘 바꾸면 바꿀 예정임 
    padding: 5,
    //scaleX: 0.5,
  },
  headerHomeTouchBox: {
    padding: 5,
    marginRight: '10%',
  },
  headerContainer: {
    flexDirection: 'row',
  },
});

const DateLocaStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  dateLocaTop:{
    flex: 1,
  },
  dateLocaMid: {
    flex: 7,
  },
  dateLocaBot: {
    flex: 2,
    justifyContent: 'center',
  },
  dateLocaContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: '2%',
    marginTop: '5%',
  },
  dateLocaTextContainer: {
    width: '30%',
  },
  dateLocaText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  dateLocaSelectBox: {
    justifyContent: 'center',
    height: 40,
    width: 250,
    backgroundColor: colors.kuWhite,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.kuDarkGray,
  },
  dateLocaInboxText: {
    alignSelf: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.kuDarkGray,
  },
  dateLocaNextButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: colors.kuDarkGreen,
    width: '70%',
    height: '60%',
    opacity: 0.5,
    borderWidth: 1,
    borderRadius: 5,
  }, 
  dateLocaNextText: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.kuWhite,
  },
});

const timeSelectStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  timeSelectTop:{
    flex: 1,
  },
  timeSelectMid: {
    flex: 8,
  },
  timeSelectBot: {
    flex: 2,
    justifyContent: 'center',
  },
  timeSelectTime: {
    flex: 3,
  },
  timeSelectTimeSheet: {
    flex: 5,
    margin: '5%',
    //borderColor: colors.kuBlack,
    //borderWidth: 1,
  },
  timeSelectContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: '2%',
    marginTop: '5%',
  },
  timeSelectTextContainer: {
    width: '30%',
  },
  timeSelectText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  timeSelectSelectBox: {
    justifyContent: 'center',
    height: 40,
    width: 220,
    backgroundColor: colors.kuWhite,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.kuDarkGray,
  },
  timeSelectInboxText: {
    alignSelf: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.kuDarkGray,
  },
  timeSelectText2: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  timeSelectBorder: {
    borderWidth: 1,
    borderColor: colors.kuBlack,
  },
  timeSelectSheetTitle: {
    justifyContent: 'center',
    height: 40,
    backgroundColor: colors.kuWarmGray,
  },
  timeSelectSheetTitleText: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  timeSelectSheetDivision:  {
    backgroundColor: colors.kuBeige,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeSelectWrapper: {
    marginTop: -1,
  },
  timeSelectScrollRow: {
    height: 40,
    backgroundColor: colors.kuBeige,
  },
  timeSelectSheetText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  timeSelectNextButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: colors.kuDarkGreen,
    width: '70%',
    height: '60%',
    opacity: 0.5,
    borderWidth: 1,
    borderRadius: 5,
  }, 
  timeSelectNextText: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.kuWhite,
  },
});

const detailStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  detailTop: {
    flex: 3,
    justifyContent: 'center',
  },
  detailMid: {
    flex: 7,
  },
  detailBot: {
    flex: 2,
    justifyContent: 'center',
  },
  detailTitleText: {
    alignSelf: 'center',
    fontSize: 48,
    fontWeight: 'bold',
  },
  detailTableContainer: {
    flex: 1,
    margin: '5%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.kuDarkGray,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  detailTable: {
    margin: '3%',
  },
  detailTableText: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    margin: '10%',
  },
  detailTableText2: {
    fontSize: 28,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    margin: '6%',
  },
  detailTableText3: {
    color: colors.kuDarkGray,
    fontSize: 28,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    margin: '6%',
    textDecorationLine: 'underline',
  },
  detailVerticleLine: {
    width: 1,
    height: '90%',
    backgroundColor: colors.kuBlack,
    margin: '1%',
  },


  detailNextButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: colors.kuDarkGreen,
    width: '70%',
    height: '60%',
    opacity: 0.5,
    borderWidth: 1,
    borderRadius: 5,
  }, 
  detailNextText: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.kuWhite,
  },
});

const completeStyle=StyleSheet.create({
  container: {
    flex: 1,
  },
  completeTop: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completeMid: {
    flex: 7,
  },
  completeBot: {
    flex: 2,
  },
  completeTitleText: {
    fontSize: 44,
    fontWeight: 'bold',
  },
  completeContainer1: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completeContainer2: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completeText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  completeText2: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  completeLine: {
    height: 1,
    width: '80%',
    backgroundColor: colors.kuBlack,
    margin: '2%',
  },

});


export default App;
