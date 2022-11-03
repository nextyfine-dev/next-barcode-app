import { Box, HStack, Image, Pressable, Spinner, View } from "native-base";
import { NxtText, RenderInput } from "../../../components/common";
import { THEME_COLORS } from "../../../config/constants";
import { colors } from "./../../../models/ColorModel";
const BarcodeImg = require("../../../assets/barcode.png");

const ProductBarcode = ({
  products,
  navigation,
  searchProduct,
  searchValue,
  isFetching,
}) => {
  return (
    <>
      <Box p={2}>
        <RenderInput
          bg={"#fff"}
          placeholder={"Search product"}
          onChangeText={searchProduct}
          value={searchValue}
        />
      </Box>
      {!isFetching ? (
        products.length > 0 ? (
          <HStack
            alignItems={"center"}
            flexWrap={"wrap-reverse"}
            justifyContent={"center"}
          >
            {products.map((item, i) => (
              <Pressable
                key={item.productId || i}
                onPress={() =>
                  navigation.navigate("BarcodeAndProductDetails", {
                    detail: item,
                  })
                }
              >
                <View
                  justifyContent={"center"}
                  borderRadius={5}
                  height={100}
                  alignItems={"center"}
                  alignSelf="center"
                  shadow={9}
                  width={40}
                  m={2}
                  style={{
                    shadowColor: colors[Math.floor(Math.random() * 100)].hex,
                  }}
                  bgColor={"#fff"}
                >
                  <Image
                    source={BarcodeImg}
                    width={20}
                    height={10}
                    alt="barcode"
                  />

                  <NxtText fontSize={11} text={item.productId} />
                  <NxtText
                    color={THEME_COLORS.MAIN_DARK_COLOR}
                    text={item.name}
                  />
                </View>
              </Pressable>
            ))}
          </HStack>
        ) : (
          <NxtText text={"Products not found!"} color="red.500" />
        )
      ) : (
        <HStack space={2} alignItems="center" justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" />
          <NxtText text={"Loading..."} color="primary.500" fontSize="md" />
        </HStack>
      )}
    </>
  );
};

export default ProductBarcode;
