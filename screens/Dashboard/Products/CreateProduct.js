import {
  Center,
  HStack,
  Icon,
  IconButton,
  Image,
  ScrollView,
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
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { initialValues, validationSchema } from "../../../models/productModel";
import useNxtToast from "../../../hooks/useNxtToast";
import { filterValues } from "../../../services/filterService";
import {
  createProductBarcode,
  updateProduct,
} from "../../../services/productService";
import * as FileSystem from "expo-file-system";
import Spinner from "react-native-loading-spinner-overlay";
import { useIsFocused } from "@react-navigation/native";
import { BARE_URL } from "../../../config/constants";
import { validateValues } from "../../../services";

export default function CreateProduct({
  navigation,
  isUpdate,
  product,
  productId,
}) {
  const [showToast] = useNxtToast();
  const [values, setValues] = useState(initialValues);
  const [isPending, startTransition] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && isUpdate && productId) {
      setValues({
        ...product,
        product_images: JSON.parse(product.product_images),
        productId: undefined,
      });
    }
    return () => {
      setValues(initialValues);
    };
  }, [isFocused, isUpdate, productId]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      let img = await FileSystem.getInfoAsync(result.uri);
      delete img.exists;
      delete img.isDirectory;
      img = {
        ...img,
        type: "image/jpg",
        name: `product-image-${new Date()
          .getTime()
          .toString()
          .split("")
          .reverse()
          .join("")}.jpg`,
      };
      setValues((prev) => ({
        ...prev,
        product_images: [...prev.product_images, img],
      }));
    }
  };

  const removeFromSelection = (index) => {
    const product_images = [...values.product_images];
    product_images.splice(index, 1);
    setValues((prev) => ({
      ...prev,
      product_images,
    }));
  };
  const handleChange = (value, name) => {
    setValues((prev) => {
      const data = { ...prev };
      data[name] = value;
      return data;
    });
  };

  const handleSubmit = async () => {
    startTransition(true);
    const isError = validateValues(validationSchema, values);
    if (isError) {
      startTransition(false);
      showToast("error", isError);
    } else {
      const newValues = filterValues(values);
      const fd = new FormData();
      const previous_images = [];
      for (const key in newValues) {
        // fd.append(key, newValues[key]);
        if (key === "product_images") {
          for (const img of newValues[key]) {
            if (typeof img === "string") {
              previous_images.push(img);
            } else {
              fd.append("product_images", img);
            }
          }
        } else {
          fd.append(key, newValues[key]);
        }
      }
      isUpdate && fd.append("previous_images", previous_images);
      const res = !isUpdate
        ? await createProductBarcode(fd)
        : await updateProduct(productId, fd);

      startTransition(false);
      if (res && res.status === "success") {
        showToast("success", res.message);
        setValues(initialValues);
        setTimeout(() => {
          if (isUpdate) {
            navigation.navigate("Home");
          } else {
            navigation.navigate("ShowCreatedBarcode", {
              data: res.data,
              isCreated: true,
            });
          }
        }, 600);
      } else {
        startTransition(false);
        showToast("error", res.message);
      }
    }
  };

  return (
    <ScrollView>
      <Center>
        <Spinner
          visible={isPending}
          textContent={
            isUpdate
              ? "Updating Product and Barcode... "
              : "Creating Product and Barcode... "
          }
          textStyle={{ color: "#fff" }}
        />
        <NxtCard mt={5} pb={5} mb={8}>
          <NxtHeading
            text={isUpdate ? "Update product" : "Create a new product"}
            textAlign="center"
          />
          <VStack mt={4} space={4}>
            <NxtButton text={"Select photo"} onPress={pickImage} />
            {values.product_images && values.product_images.length > 0 && (
              <Center>
                <HStack
                  alignItems={"center"}
                  flexWrap="wrap"
                  flexDirection="row"
                >
                  {values.product_images.map((img, i) => (
                    <View
                      key={i}
                      justifyContent={"center"}
                      borderRadius={5}
                      height={160}
                      alignItems={"center"}
                      alignSelf="center"
                      shadow={9}
                      width={150}
                      m={1}
                      bgColor={"#fff"}
                      pt={2}
                      pb={10}
                    >
                      <IconButton
                        alignSelf="flex-end"
                        onPress={() => removeFromSelection(i)}
                        icon={
                          <Icon
                            as={<Ionicons />}
                            name={"close-circle"}
                            size={25}
                            color={"red.400"}
                            mt={2}
                          />
                        }
                      />
                      <Image
                        source={{ uri: img.uri || `${BARE_URL}/files/${img}` }}
                        w={110}
                        h={110}
                        alt="product image"
                      />
                    </View>
                  ))}
                </HStack>
              </Center>
            )}
            <RenderInput
              label={"Name"}
              required
              onChangeText={(value) => handleChange(value, "name")}
              value={values["name"]}
            />
            <RenderInput
              label={"Category"}
              required
              onChangeText={(value) => handleChange(value, "category")}
              value={values["category"]}
            />
            <RenderInput
              label={"Price"}
              required
              onChangeText={(value) => handleChange(value, "price")}
              value={values["price"]}
            />
            <RenderInput
              label={"Discount"}
              onChangeText={(value) => handleChange(value, "discount")}
              value={values["discount"]}
            />
            <RenderInput
              label={"Discount Price"}
              onChangeText={(value) => handleChange(value, "discountPrice")}
              value={values["discountPrice"]}
            />
            <RenderInput
              label={"Gst"}
              onChangeText={(value) => handleChange(value, "gst")}
              value={values["gst"]}
            />
            <RenderInput
              label={"Details"}
              textArea
              onChangeText={(value) => handleChange(value, "details")}
              value={values["details"]}
            />
            <NxtButton
              text={
                isUpdate ? "Update product barcode" : "Create product barcode"
              }
              onPress={handleSubmit}
            />
          </VStack>
        </NxtCard>
      </Center>
    </ScrollView>
  );
}

// singleFile
// File { name: "nexrqr-icon.png", lastModified: 1651249036701, webkitRelativePath: "", size: 44992, type: "image/png" }
// ​
// lastModified: 1651249036701
// ​
// name: "nexrqr-icon.png"
// ​
// size: 44992
// ​
// type: "image/png"
// ​
// webkitRelativePath: ""
// ​
// <prototype>: FilePrototype { name: Getter, lastModified: Getter, webkitRelativePath: Getter, … }
// Group.jsx:71
