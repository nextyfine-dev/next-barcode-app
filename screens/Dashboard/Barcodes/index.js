import { useIsFocused } from "@react-navigation/native";
import { Box, HStack } from "native-base";
import { useEffect, useState } from "react";
// import Spinner from "react-native-loading-spinner-overlay";
import { NxtButton, NxtText } from "../../../components/common";
import useNxtToast from "../../../hooks/useNxtToast";
import {
  getAllCustomers,
  getCustomerDetails,
} from "../../../services/customerService";
import {
  getProductBarCodes,
  getProductDetails,
} from "../../../services/productService";
import CustomerBarcode from "./CustomerBarcode";
import ProductBarcode from "./ProductBarcode";

export default function BarCodes({
  refreshing,
  navigation,
  type,
  setSelectedProducts,
  isCustomer,
  onRefresh,
}) {
  const [data, setData] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortType, setSortType] = useState("DESC");

  const [showToast] = useNxtToast();

  const isFocused = useIsFocused();

  const getAllDetails = async (
    page = currentPage,
    limit = currentLimit,
    sortBy = sortBy,
    sortType = sortType
  ) => {
    setIsFetching(true);
    const res = !isCustomer
      ? await getProductBarCodes(page, limit, sortBy, sortType)
      : await getAllCustomers(page, limit, sortBy, sortType);

    if (res && res.status === "success") {
      setData(res.data);
    }
    setIsFetching(false);
  };

  const search = async (value) => {
    setSearchValue(value);
    setIsFetching(true);
    if (value && value.length > 0) {
      const res = !isCustomer
        ? await getProductDetails(value)
        : await getCustomerDetails(value);
      if (res && res.status === "success") {
        setData(res.data);
        setIsFetching(false);
      } else {
        showToast("error", res.message);
        setIsFetching(false);
      }
    } else {
      await getAllDetails();
    }
  };

  useEffect(() => {
    if (isFocused) {
      getAllDetails(currentPage, currentLimit, sortBy, sortType);
      setSearchValue("");
    }
  }, [refreshing, currentPage, currentLimit, sortBy, sortType, isFocused]);

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
      {!isCustomer && data && (data.products || data.barcodes) && (
        <ProductBarcode
          navigation={navigation}
          searchProduct={search}
          products={data.products || data.barcodes}
          searchValue={searchValue}
          isFetching={isFetching}
          setSortBy={setSortBy}
          setSortType={setSortType}
          type={type}
          setSelectedProducts={setSelectedProducts}
          setCurrentLimit={setCurrentLimit}
          onRefresh={onRefresh}
        />
      )}

      {isCustomer && data && (data.customers || data.barcodes) && (
        <CustomerBarcode
          navigation={navigation}
          customers={data.customers || data.barcodes}
          setCurrentLimit={setCurrentLimit}
          isFetching={isFetching}
          setSortBy={setSortBy}
          setSortType={setSortType}
          type={type}
          searchCustomer={search}
          searchValue={searchValue}
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
