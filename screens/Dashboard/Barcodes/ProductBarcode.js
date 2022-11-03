import { Image, Pressable, View } from "native-base";
import { StyleSheet } from "react-native";
import { FlatGrid, SectionGrid } from "react-native-super-grid";
import { NxtText } from "../../../components/common";
import { THEME_COLORS } from "../../../config/constants";
import { colors } from "./../../../models/ColorModel";
const BarcodeImg = require("../../../assets/barcode.png");

const ProductBarcode = ({ products, navigation }) => {
  return (
    <FlatGrid
      itemDimension={130}
      data={products}
      style={styles.gridView}
      spacing={10}
      renderItem={({ item }) => (
        <Pressable
          key={item.productId}
          mt={3}
          onPress={() =>
            navigation.navigate("BarcodeAndProductDetails", { detail: item })
          }
        >
          <View
            justifyContent={"center"}
            borderRadius={5}
            height={100}
            alignItems={"center"}
            shadow={9}
            style={{ shadowColor: colors[Math.floor(Math.random() * 100)].hex }}
            bgColor={"#fff"}
          >
            <Image source={BarcodeImg} width={20} height={10} alt="barcode" />

            <NxtText fontSize={11} text={item.productId} />
            <NxtText color={THEME_COLORS.MAIN_DARK_COLOR} text={item.name} />
          </View>
        </Pressable>
      )}
    />
  );
};

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    flex: 1,
  },
});

export default ProductBarcode;
