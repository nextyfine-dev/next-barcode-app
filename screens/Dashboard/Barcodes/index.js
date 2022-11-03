import {
  Box,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { useEffect, useState } from "react";
import { NxtText } from "../../../components/common";
import { getProductBarCodes } from "../../../services/productService";
import ProductBarcode from "./ProductBarcode";

export default function BarCodes({ refreshing, navigation }) {
  const [details, setDetails] = useState([]);

  const getDetails = async () => {
    const res = await getProductBarCodes();
    if (res && res.status === "success") {
      setDetails(res.data.barcodes);
    }
  };
  useEffect(() => {
    getDetails();
  }, [refreshing, navigation]);

  return (
    <Box p={1} mt={4}>
      {details && details.length > 0 && (
        <ProductBarcode navigation={navigation} products={details} />
      )}
    </Box>
  );
}
