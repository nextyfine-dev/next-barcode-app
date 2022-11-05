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

const CreateCustomer = ({ navigation }) => {
  const [isSelectProduct, setIsSelectProduct] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

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

  return (
    <ScrollView>
      <Center>
        <NxtCard mt={5} pb={5} mb={8}>
          <NxtHeading text={"Create a New Customer"} textAlign="center" />

          <VStack mt={4} space={4}>
            <RenderInput
              label={"Name"}
              required
              placeholder="Enter customer name"
            />
            <RenderInput
              label={"Phone Number"}
              required
              placeholder="Enter customer's mobile number"
            />
            <RenderInput label={"Email"} placeholder="Enter customer's email" />
            <NxtButton
              text="Select Product"
              onPress={() => setIsSelectProduct(true)}
            />
            {selectedProducts && selectedProducts.length > 0 && (
              <VStack>
                <HStack flexWrap="wrap" justifyContent={"center"}>
                  {selectedProducts.map((product, i) => (
                    <View
                      key={product.productId || 1}
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
              placeholder={"Enter customer's address"}
            />
            <RenderInput
              label={"More Details"}
              textArea
              placeholder={"Enter more details"}
            />
            <NxtButton text="Create Customer Barcode" />
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
