import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider, useSelector } from 'react-redux';
import { RootState, store } from './redux/store';
import Profile_Provider from './provider/Profile_Provider';
import IntroScreen from './app/page/auth/intro/page';
import Tabs from './app/tabs';
import SettingsScreen from './app/page/setting/page';
import LoginScreen from './app/page/auth/login/page';
import RegisterScreen from './app/page/auth/register/page';
import * as SplashScreen from 'expo-splash-screen';
import NewMessageScreen from './app/page/home/newMessage/page';
import ChatScreen from './app/page/[chat]/page';

SplashScreen.preventAutoHideAsync();


function Routes() {
  const {isLogin} = useSelector((state: RootState) => state.authState)
  const useTheme = useSelector((state: RootState) => state.ThemeMode.currentTheme)

  const backgroundColor = useTheme.background

  const options = {
    headerTintColor: useTheme.iconColor,
    headerTitleAlign: 'center',
    headerStyle: {
      backgroundColor: backgroundColor,
    },
    headerTitleStyle: {
      fontSize: 20,
      fontWeight: '800',
      color: useTheme.primaryTextColor,
    },
    contentStyle: {
      backgroundColor: backgroundColor,
      elevation: 0,
      height: 100,
    }
  }

  const Option2 = {
    headerShown: false,
    contentStyle: {
      backgroundColor: backgroundColor,
      elevation: 0,
      height: "auto"
    }
  }
  return (
    <Stack.Navigator>
      <Stack.Screen name="home" component={isLogin ? Tabs : IntroScreen} options={Option2 as any} />
      <Stack.Screen name="login" component={LoginScreen} options={Option2 as any} />
      <Stack.Screen name="register" component={RegisterScreen} options={Option2 as any} />
   
      <Stack.Screen name="Chat" component={ChatScreen} options={Option2 as any} />
      
      <Stack.Screen name="Message" component={NewMessageScreen} options={options as any} />
      <Stack.Screen name="Setting" component={SettingsScreen} options={options as any} />
    </Stack.Navigator>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Profile_Provider>
          <Routes />
        </Profile_Provider>
      </Provider>
    </NavigationContainer>
  );
}

export default App;