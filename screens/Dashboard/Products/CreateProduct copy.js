import {
  Box,
  Button,
  Center,
  HStack,
  Image,
  ScrollView,
  Text,
  View,
  VStack,
} from "native-base";
import {
  NxtButton,
  NxtCard,
  NxtHeading,
  RenderInput,
} from "../../../components/common";
import * as ImagePicker from "expo-image-picker";
// import * as ImageManipulator from "expo-image-manipulator";
// import { ImageBrowser } from "expo-image-picker-multiple";
import { useState } from "react";

export default function CreateProduct({ navigation }) {
  const [images, setImages] = useState([]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImages((prev) => [...prev, result]);
    }
  };
  // const _processImageAsync = async (uri, l) => {
  //   console.log("uri", uri);
  //   const file = await ImageManipulator.manipulateAsync(uri, {
  //     compress: 0.8,
  //     format: ImageManipulator.SaveFormat.JPEG,
  //   });
  //   return file;
  // };

  // const _renderDoneButton = (count, onSubmit) => {
  //   if (!count) return null;
  //   return <NxtButton bg="red" text={"done"} onPress={onSubmit} />;
  // };

  // const updateHandler = (count, onSubmit) => {
  //   console.log("count", count);
  // navigation.setOptions({
  //   title: `Selected ${count} files`,
  //   headerRight: () => _renderDoneButton(count, onSubmit),
  // });
  //   if (count === 4) {
  //     onSubmit();
  //   }
  // };

  return (
    <ScrollView>
      <Center>
        <NxtCard mt={5} pb={5} mb={8}>
          <NxtHeading text={"Create a new product"} textAlign="center" />
          <VStack mt={4} space={4}>
            <NxtButton text={"Select photo"} onPress={pickImage} />
            {images && images.length > 0 && (
              <HStack space={3} flexWrap="wrap" flexDirection="row">
                {images.map((img, i) => (
                  <Center key={i}>
                    <Image
                      source={{ uri: img.uri }}
                      w={100}
                      h={100}
                      alt="product image"
                    />
                  </Center>
                ))}
              </HStack>
            )}
            <RenderInput label={"Name"} required />
            <RenderInput label={"Category"} />
            <RenderInput label={"Price"} required />
            <RenderInput label={"Discount"} />
            <RenderInput label={"Discount Price"} />
            <RenderInput label={"Gst"} />
            <RenderInput label={"Details"} textArea />
            <NxtButton text="Create product barcode" />
          </VStack>
        </NxtCard>
      </Center>
    </ScrollView>
  );
}
