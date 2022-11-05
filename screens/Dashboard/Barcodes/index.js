import { Box, HStack } from "native-base";
import { useEffect, useState } from "react";
// import Spinner from "react-native-loading-spinner-overlay";
import { NxtButton, NxtText } from "../../../components/common";
import useNxtToast from "../../../hooks/useNxtToast";
import {
  getProductBarCodes,
  getProductDetails,
} from "../../../services/productService";
import ProductBarcode from "./ProductBarcode";

export default function BarCodes({
  refreshing,
  navigation,
  route,
  type,
  setSelectedProducts,
}) {
  const [data, setData] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortType, setSortType] = useState("DESC");

  const [showToast] = useNxtToast();

  const getAllProductDetails = async (
    page = currentPage,
    limit = currentLimit,
    sortBy = sortBy,
    sortType = sortType
  ) => {
    setIsFetching(true);
    const res = await getProductBarCodes(page, limit, sortBy, sortType);
    if (res && res.status === "success") {
      setData(res.data);
    }
    setIsFetching(false);
  };

  const searchProduct = async (value) => {
    setSearchValue(value);
    setIsFetching(true);
    if (value && value.length > 0) {
      const res = await getProductDetails(value);
      if (res && res.status === "success") {
        setData(res.data);
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
    getAllProductDetails(currentPage, currentLimit, sortBy, sortType);
    setSearchValue("");
  }, [
    refreshing,
    currentPage,
    currentLimit,
    sortBy,
    sortType,
    navigation.isFocused(),
  ]);

  const changePage = (type) => {
    if (type === "Next") {
      setCurrentPage((p) => p + 1);
    } else if (type === "Previous") {
      setCurrentPage((p) => p - 1);
    } else {
      setCurrentPage(1);
    }
  };

  return (
    <Box p={1}>
      {data && (data.products || data.barcodes) && (
        <ProductBarcode
          navigation={navigation}
          searchProduct={searchProduct}
          products={data.products || data.barcodes}
          searchValue={searchValue}
          isFetching={isFetching}
          setSortBy={setSortBy}
          setSortType={setSortType}
          type={type}
          setSelectedProducts={setSelectedProducts}
          setCurrentLimit={setCurrentLimit}
        />
      )}

      {!isFetching && data && data.count && data.page && (
        <HStack
          justifyContent={"center"}
          alignItems={"center"}
          space={5}
          mt={4}
        >
          {data.page > 1 && data.offset > 0 && (
            <NxtButton
              text={"<< Previous"}
              onPress={() => changePage("Previous")}
            />
          )}

          {data.count > data.limit && data.limit + data.offset < data.count && (
            <NxtButton text={"Next >>"} onPress={() => changePage("Next")} />
          )}
        </HStack>
      )}

      {/* <Spinner
        visible={isFetching}
        textContent={"Please wait... "}
        textStyle={{ color: "#fff" }}
      /> */}
    </Box>
  );
}
