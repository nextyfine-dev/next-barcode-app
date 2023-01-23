import { Center, HStack, Icon, IconButton, ScrollView, View } from "native-base";
import { Camera } from "expo-camera";
import { useCallback, useEffect, useState } from "react";
import { CameraType } from "expo-camera/build/Camera.types";
import { Dimensions, RefreshControl } from "react-native";
import * as Animatable from "react-native-animatable";

import { MaterialIcons } from "@expo/vector-icons";
import BarcodeDetails from "./BarcodeDetails";
import { wait } from "../../../services";
import { useIsFocused } from "@react-navigation/native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const rectDimensions = SCREEN_WIDTH * 0.65;

const scanBarWidth = SCREEN_WIDTH * 0.46;
const scanBarHeight = SCREEN_WIDTH * 0.0025;
const scanBarColor = "#22ff00";

export default function Scanner() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [flash, setFlash] = useState(false);

  const isFocused = useIsFocused()

  const [data, setData] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }
  const makeSlideOutTranslation = (translationType, fromValue) => {
    return {
      from: {
        [translationType]: SCREEN_WIDTH * -0.18,
      },
      to: {
        [translationType]: fromValue,
      },
    };
  };

  useEffect(() => {
    if (isFocused) {
      onRefresh()
    }
  }, [isFocused])

  return (
    <ScrollView flex={1}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      } >
      {!refreshing && <View safeArea height={data ? "100%" : SCREEN_HEIGHT - 135} >
        {!data ? (
          <Camera
            ratio={"4:3"}
            focusable={true}
            onBarCodeScanned={(res) => {
              setData(res);
            }}
            autoFocus={true}
            focusDepth={1}
            type={type}
            flashMode={flash ? "torch" : "off"}
            style={{ flex: 1, justifyContent: "space-between" }}
          >
            <View
              flex={1}
              alignItems="center"
              justifyContent={"center"}
              alignContent="center"
              bg="transparent"
            >
              <Center
                bg="transparent"
                borderWidth={2}
                borderColor={data ? "green.600" : "red.600"}
                w={rectDimensions}
                h={rectDimensions}
              >
                <View flex={1} />
                <Animatable.View
                  style={{
                    width: scanBarWidth,
                    height: scanBarHeight,
                    backgroundColor: scanBarColor,
                  }}
                  direction="alternate-reverse"
                  iterationCount="infinite"
                  duration={1700}
                  easing="linear"
                  animation={makeSlideOutTranslation(
                    "translateY",
                    SCREEN_WIDTH * -0.54
                  )}
                />
              </Center>
            </View>
            <HStack
              // flex={1}
              // top={5}
              space={10}
              shadow="9"
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Center>
                <IconButton
                  onPress={() => setFlash(!flash)}
                  icon={
                    <Icon
                      as={<MaterialIcons />}
                      name={flash ? "flash-on" : "flash-off"}
                    />
                  }
                  _icon={{
                    color: "#fff",
                    size: "2xl",
                  }}
                  _hover={{
                    bg: "primary.100",
                  }}
                  _pressed={{
                    bg: "green.700",
                    borderRadius: "full",
                    borderWidth: 1,
                    borderColor: "#fff",
                  }}
                />
              </Center>

              <Center>
                <IconButton
                  onPress={toggleCameraType}
                  icon={
                    <Icon
                      as={<MaterialIcons />}
                      name={
                        type === CameraType.back
                          ? "party-mode"
                          : "flip-camera-ios"
                      }
                    />
                  }
                  _icon={{
                    color: "#fff",
                    size: "2xl",
                  }}
                  _hover={{
                    bg: "primary.100",
                  }}
                  _pressed={{
                    bg: "green.700",
                    borderRadius: "full",
                    borderWidth: 1,
                    borderColor: "#fff",
                  }}
                />
              </Center>
            </HStack>
          </Camera>
        ) : (
          <BarcodeDetails setData={setData} data={data.data} />
        )}
      </View>}
    </ScrollView>
  );
}
