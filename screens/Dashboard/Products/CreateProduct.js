import { Center, HStack, Image, ScrollView, VStack } from "native-base";

import {
  NxtButton,
  NxtCard,
  NxtHeading,
  RenderInput,
} from "../../../components/common";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { initialValues, validationSchema } from "../../../models/productModel";
import useNxtToast from "../../../hooks/useNxtToast";
import { filterValues } from "../../../services/filterService";
import { createProductBarcode } from "../../../services/productService";
import * as FileSystem from "expo-file-system";
import Spinner from "react-native-loading-spinner-overlay";

export default function CreateProduct({ navigation }) {
  const [showToast] = useNxtToast();
  const [values, setValues] = useState(initialValues);
  const [isPending, startTransition] = useState(false);

  const validateValues = () => {
    for (const key in validationSchema) {
      if (!validationSchema[key].allowNull && values[key].length === 0) {
        return validationSchema[key].message;
      }
    }
    return false;
  };

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
  const handleChange = (value, name) => {
    setValues((prev) => {
      const data = { ...prev };
      data[name] = value;
      return data;
    });
  };

  const handleSubmit = async () => {
    startTransition(true);
    const isError = validateValues();
    if (isError) {
      startTransition(false);
      showToast("error", isError);
    } else {
      const newValues = filterValues(values);
      const fd = new FormData();
      for (const key in newValues) {
        // fd.append(key, newValues[key]);
        if (key === "product_images") {
          for (const img of newValues[key]) {
            fd.append("product_images", img);
          }
        } else {
          fd.append(key, newValues[key]);
        }
      }
      const res = await createProductBarcode(fd);
      startTransition(false);
      if (res && res.status === "success") {
        showToast("success", res.message);
        setValues(initialValues);
        setTimeout(() => {
          navigation.navigate("ShowCreatedBarcode", { data: res.data, isCreated: true });
        }, 500);
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
          textContent={"Creating Product and Barcode... "}
          textStyle={{ color: "#fff" }}
        />
        <NxtCard mt={5} pb={5} mb={8}>
          <NxtHeading text={"Create a new product"} textAlign="center" />
          <VStack mt={4} space={4}>
            <NxtButton text={"Select photo"} onPress={pickImage} />
            {values.product_images && values.product_images.length > 0 && (
              <HStack space={3} flexWrap="wrap" flexDirection="row">
                {values.product_images.map((img, i) => (
                  <Center key={i} mt={2}>
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
            <NxtButton text="Create product barcode" onPress={handleSubmit} />
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
