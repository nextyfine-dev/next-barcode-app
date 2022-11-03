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
import useNxtToast from "../../../hooks/useNxtToast";
import {
  getProductBarCodes,
  getProductDetails,
} from "../../../services/productService";
import ProductBarcode from "./ProductBarcode";

export default function BarCodes({ refreshing, navigation }) {
  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const [showToast] = useNxtToast();

  const getAllProductDetails = async () => {
    setIsFetching(true);
    const res = await getProductBarCodes();
    if (res && res.status === "success") {
      setProducts(res.data.barcodes);
    }
    setIsFetching(false);
  };

  const searchProduct = async (value) => {
    setSearchValue(value);
    setIsFetching(true);
    if (value && value.length > 0) {
      const res = await getProductDetails(value);
      if (res && res.status === "success") {
        setProducts(res.data.products);
        setIsFetching(false);
      } else {
        showToast("error", res.message);
        setIsFetching(false);
      }
    } else {
      await getAllProductDetails();
    }
  };

  useEffect(() => {
    getAllProductDetails();
    setSearchValue("");
  }, [refreshing, navigation]);

  return (
    <Box p={1}>
      {products && (
        <ProductBarcode
          navigation={navigation}
          searchProduct={searchProduct}
          products={products}
          searchValue={searchValue}
          isFetching={isFetching}
        />
      )}
    </Box>
  );
}
