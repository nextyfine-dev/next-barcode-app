import {
  Center,
  HStack,
  Icon,
  IconButton,
  Image,
  Modal,
  ScrollView,
  View,
  VStack,
} from "native-base";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
const BarcodeImg = require("../../../assets/barcode.png");

import {
  NxtButton,
  NxtCard,
  NxtHeading,
  NxtText,
  RenderInput,
} from "../../../components/common";
import { THEME_COLORS } from "../../../config/constants";
import { colors } from "../../../models/ColorModel";
import BarCodes from "../Barcodes";
import useNxtToast from "../../../hooks/useNxtToast";
import { validationSchema, initialValues } from "../../../models/CustomerModel";
import Spinner from "react-native-loading-spinner-overlay";
import { filterValues } from "../../../services/filterService";
import {
  createCustomer,
  updateCustomer,
} from "../../../services/customerService";
import { useIsFocused } from "@react-navigation/native";

const CreateCustomer = ({
  navigation,
  isUpdate,
  customer,
  cProducts,
  customerId,
}) => {
  const [isSelectProduct, setIsSelectProduct] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const [showToast] = useNxtToast();
  const [values, setValues] = useState(initialValues);
  const [isPending, startTransition] = useState(false);

  const isFocused = useIsFocused();

  const validateValues = () => {
    for (const key in validationSchema) {
      if (!validationSchema[key].allowNull && values[key]?.length === 0) {
        return validationSchema[key].message;
      }
    }
    return false;
  };

  useEffect(() => {
    if (isUpdate && isFocused) {
      setSelectedProducts(cProducts);
      setValues({ ...customer, productIds: JSON.parse(customer.productIds) });
    } else {
      setSelectedProducts([]);
      setValues(initialValues);
    }
  }, [isFocused, isUpdate]);

  useEffect(() => {
    if (selectedProducts && selectedProducts.length > 0) {
      setIsSelectProduct(false);
    }
  }, [selectedProducts]);

  const removeFromSelection = (index) => {
    const allItems = [...selectedProducts];
    allItems.splice(index, 1);
    setSelectedProducts(allItems);
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
      let newValues = filterValues(values);
      let productIds;
      if (selectedProducts && selectedProducts.length > 0) {
        productIds = selectedProducts.map((product) => product.productId);
      }
      newValues = {
        ...newValues,
        productIds: JSON.stringify(productIds),
      };

      if (!isUpdate) {
        const res = await createCustomer(newValues);
        if (res && res.status === "success") {
          startTransition(false);
          showToast("success", res.message);
          setValues(initialValues);
          const data = { ...res.data, file: res.data.customer };
          setTimeout(() => {
            navigation.navigate("ShowCreatedBarcode", {
              data,
              isCustomer: true,
              isCreated: true,
            });
          }, 500);
        } else {
          startTransition(false);
          showToast("error", res.message);
        }
      } else {
        const res = await updateCustomer(customerId, newValues);
        if (res && res.status === "success") {
          startTransition(false);
          showToast("success", res.message);
          setTimeout(() => {
            navigation.navigate("Home");
          }, 500);
        } else {
          startTransition(false);
          showToast("error", res.message);
        }
      }
    }
  };

  return (
    <ScrollView>
      <Center>
        <Spinner
          visible={isPending}
          textContent={
            !isUpdate
              ? "Creating Customer and Barcode... "
              : "Updating customer..."
          }
          textStyle={{ color: "#fff" }}
        />
        <NxtCard mt={5} pb={5} mb={8}>
          <NxtHeading
            text={
              !isUpdate ? "Create a New Customer" : "Update Customer Details"
            }
            textAlign="center"
          />

          <VStack mt={4} space={4}>
            <RenderInput
              label={"Name"}
              required
              placeholder="Enter customer name"
              onChangeText={(value) => handleChange(value, "name")}
              value={values["name"]}
            />
            <RenderInput
              label={"Phone Number"}
              required
              onChangeText={(value) => handleChange(value, "phoneNumber")}
              value={values["phoneNumber"]}
              placeholder="Enter customer's mobile number"
            />
            <RenderInput
              label={"Email"}
              placeholder="Enter customer's email"
              onChangeText={(value) => handleChange(value, "email")}
              value={values["email"]}
            />
            <NxtButton
              text="Select Product"
              onPress={() => setIsSelectProduct(true)}
            />
            {selectedProducts && selectedProducts.length > 0 && (
              <VStack>
                <HStack flexWrap="wrap" justifyContent={"center"}>
                  {selectedProducts.map((product, i) => (
                    <View
                      key={product.productId || i}
                      justifyContent={"center"}
                      borderRadius={5}
                      height={140}
                      alignItems={"center"}
                      alignSelf="center"
                      shadow={9}
                      width={150}
                      m={1}
                      style={{
                        shadowColor:
                          colors[Math.floor(Math.random() * 100)].hex,
                      }}
                      bgColor={"#fff"}
                    >
                      <IconButton
                        width={10}
                        alignSelf="flex-end"
                        onPress={() => removeFromSelection(i)}
                        icon={
                          <Icon
                            as={<Ionicons />}
                            name={"close-circle"}
                            size={25}
                            color={"red.400"}
                          />
                        }
                      />
                      <Image
                        source={BarcodeImg}
                        width={20}
                        height={10}
                        alt="barcode"
                      />

                      <NxtText fontSize={11} text={product.productId} />
                      <NxtText
                        color={THEME_COLORS.MAIN_DARK_COLOR}
                        text={product.name}
                      />
                    </View>
                  ))}
                </HStack>
                {selectedProducts.length > 1 && (
                  <NxtButton
                    mt={2}
                    text="Remove All"
                    bg="red.500"
                    onPress={() => setSelectedProducts([])}
                  />
                )}
              </VStack>
            )}
            <RenderInput
              label={"Address"}
              required
              textArea
              onChangeText={(value) => handleChange(value, "address")}
              value={values["address"]}
              placeholder={"Enter customer's address"}
            />
            <RenderInput
              label={"More Details"}
              textArea
              onChangeText={(value) => handleChange(value, "details")}
              value={values["details"]}
              placeholder={"Enter more details"}
            />
            <NxtButton
              text={!isUpdate ? "Create Customer Barcode" : "Update Customer"}
              onPress={handleSubmit}
            />
          </VStack>
        </NxtCard>
      </Center>
      <Modal
        isOpen={isSelectProduct}
        onClose={() => setIsSelectProduct(false)}
        safeAreaTop={true}
      >
        <Modal.Content
          width={"100%"}
          borderRadius={0}
          marginBottom={0}
          marginTop="auto"
        >
          <Modal.CloseButton />
          <Modal.Header>Select Products</Modal.Header>
          <Modal.Body>
            <BarCodes
              navigation={navigation}
              type={"SELECT_FOR_CUSTOMER"}
              setSelectedProducts={setSelectedProducts}
            />
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </ScrollView>
  );
};

export default CreateCustomer;
