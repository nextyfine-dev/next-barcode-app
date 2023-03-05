import React, { memo } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { useSelector } from "react-redux";
import {
  Box,
  Center,
  Divider,
  // HStack,
  // Icon,
  // Image,
  // Pressable,
  // Text,
  VStack,
} from "native-base";
// import { MaterialIcons } from "@expo/vector-icons";
// import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { defaultNavOptions } from "../models/options";

import Main from "../screens/Main";
import Login from "../screens/auth/Login";
import Signup from "../screens/auth/Signup";
import Otp from "../screens/auth/Otp";
import CreateShop from "../screens/Dashboard/Shops/CreateShop";
import Home from "../screens/Dashboard/Home";
import { NxtDrawerBtn, NxtText } from "../components/common";
import { THEME_COLORS } from "../config/constants";
import Account from "../screens/Dashboard/Account";
import Scanner from "../screens/Dashboard/Barcodes/Scanner";
import CreateProduct from "../screens/Dashboard/Products/CreateProduct";
import ShowCreatedBarcode from "../screens/Dashboard/Barcodes/ShowCreatedBarcode";
import BarcodeAndProductDetails from "../screens/Dashboard/Barcodes/BarcodeAndProductDetails";
// import History from "../screens/Dashboard/History";
import CreateCustomer from "../screens/Dashboard/Customer/CreateCustomer";
import UpdateCustomer from "../screens/Dashboard/Customer/UpdateCustomer";
import UpdateProduct from "../screens/Dashboard/Products/UpdateProduct";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent({ props, navigation }) {
  return (
    <DrawerContentScrollView {...props} safeArea>
      <VStack space="6" my="2" mx="1">
        <Box px="4">
          <Center>
            <NxtText text="KABASI ENTERPRISE" bold fontSize={20} />

            {/* <Image source={nextQrLogo} size={100} alt="NextQr Logo" /> */}
          </Center>
        </Box>
        <VStack divider={<Divider />} space="4">
          <VStack space="5">
            <VStack space="3">
              <NxtDrawerBtn
                text="Home"
                onPress={() => navigation.navigate("Home")}
              />
            </VStack>

            <VStack space="3">
              <NxtDrawerBtn
                text="Products"
                iconName="local-mall"
                onPress={() => navigation.navigate("Home")}
              />
            </VStack>

            <VStack space="3">
              <NxtDrawerBtn
                text="Customers"
                iconName="perm-contact-cal"
                onPress={() => navigation.navigate("Home")}
              />
            </VStack>

            <VStack space="3">
              <NxtDrawerBtn
                text="Employees"
                iconName="quick-contacts-mail"
                onPress={() => navigation.navigate("Home")}
              />
            </VStack>

            {/* <VStack space="3">
              <NxtDrawerBtn
                text="CreateShop"
                onPress={() => navigation.navigate("CreateShop")}
              />
            </VStack> */}
          </VStack>
        </VStack>
      </VStack>
    </DrawerContentScrollView>
  );
}

const TabNavigation = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        size = 30;
        switch (route.name) {
          case "Home":
            iconName = focused ? "arch" : "arch";

            break;
          case "CreateBarcode":
            iconName = focused ? "qrcode-edit" : "qrcode-edit";
            size = 24;
            break;

          case "ScanBarcode":
            iconName = focused ? "barcode-scan" : "barcode-scan";
            break;

          case "CreateCustomer":
            iconName = focused ? "account-edit" : "account-edit-outline";
            size = 33;
            break;

          case "Account":
            iconName = focused ? "account-circle" : "account-circle-outline";
            size = 33;
            break;

          default:
            break;
        }
        return (
          <MaterialCommunityIcons name={iconName} size={size} color={color} />
        );
      },
      tabBarActiveTintColor: "#b5f5ae",
      tabBarInactiveTintColor: "#f1f1f1",

      tabBarStyle: {
        backgroundColor: THEME_COLORS.MAIN_DARK_COLOR,
        height: 60,
        margin: 10,
        borderRadius: 10,
      },
      tabBarShowLabel: false,
    })}
  >
    <Tab.Screen name="Home" component={Home} options={defaultNavOptions()} />
    <Tab.Screen
      name="CreateBarcode"
      component={CreateProduct}
      options={defaultNavOptions()}
    />
    <Tab.Screen
      name="ScanBarcode"
      component={Scanner}
      options={defaultNavOptions()}
    />
    <Tab.Screen
      name="CreateCustomer"
      component={CreateCustomer}
      options={defaultNavOptions()}
    />
    <Tab.Screen
      name="Account"
      component={Account}
      options={defaultNavOptions()}
    />
  </Tab.Navigator>
);

const DrawerNavigation = () => {
  return (
    <Box safeArea flex={1}>
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: { backgroundColor: "#fff" },
          headerTintColor: "#fff",
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="Kabasi Enterprise"
          component={TabNavigation}
          options={{
            headerStyle: {
              backgroundColor: THEME_COLORS.PRIMARY_COLOR,
              borderBottomEndRadius: 20,
              borderBottomStartRadius: 20,
            },
          }}
        />

        {/* <Drawer.Screen
          name="CreateShop"
          component={CreateShop}
          options={{
            headerStyle: { backgroundColor: "#6f7df2" },
            // drawerLabel:
          }}
        /> */}
      </Drawer.Navigator>
    </Box>
  );
};

const Navigation = () => {
  const { isLogin, user } = useSelector((state) => state.auth);

  return (
    <NavigationContainer>
      {!isLogin || !user.active ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={Main}
            options={defaultNavOptions()}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={defaultNavOptions()}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={defaultNavOptions()}
          />
          <Stack.Screen
            name="Otp"
            component={Otp}
            options={defaultNavOptions()}
          />

          {/* <Stack.Screen
            name="CreateShop"
            component={CreateShop}
            options={defaultNavOptions()}
          /> */}

          {/* <Stack.Screen
            name="Home"
            component={Home}
            options={defaultNavOptions()}
          /> */}
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="DrawerNavigation"
            component={DrawerNavigation}
            options={defaultNavOptions()}
          />
          {/* <Stack.Screen
            name="Home"
            component={Home}
            options={defaultNavOptions()}
          /> */}
          <Stack.Screen
            name="CreateShop"
            component={CreateShop}
            options={defaultNavOptions()}
          />
          <Stack.Screen
            name="ShowCreatedBarcode"
            component={ShowCreatedBarcode}
            options={defaultNavOptions()}
          />
          <Stack.Screen
            name="BarcodeAndProductDetails"
            component={BarcodeAndProductDetails}
            options={defaultNavOptions()}
          />
          <Stack.Screen
            name="UpdateCustomer"
            component={UpdateCustomer}
            options={defaultNavOptions()}
          />
          <Stack.Screen
            name="UpdateProduct"
            component={UpdateProduct}
            options={defaultNavOptions()}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default memo(Navigation);
