import {
  Box,
  Center,
  HStack,
  Image,
  Input,
  ScrollView,
  VStack,
} from "native-base";
import { useEffect, useState } from "react";
import { NxtButton, NxtFormLabel, NxtHeading, NxtText } from "../../../components/common";
import useNxtToast from "../../../hooks/useNxtToast";
import { getProductDetails } from "../../../services/productService";
import omit from "lodash/omit";
import { BARE_URL, THEME_COLORS } from "../../../config/constants";
import Spinner from "react-native-loading-spinner-overlay";
import { getCustomerDetails } from "../../../services/customerService";


export default function BarcodeDetails({ setData, data, setCustomerDetail, setCproductsDetail, setProductDetail }) {
  const [showToast] = useNxtToast();
  const [isPending, startTransition] = useState(false);

  const [details, setDetails] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [cProducts, setCProducts] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [defaultFeilds] = useState(["active",
    "adminId",
    "createdAt", "updatedAt", "employeeId"]);

  const getValues = (obj) => {
    const values = omit(obj, [
      ...defaultFeilds,
      "isLoved",
      "isPined",
      "Files",
      "files",
      "fileId",
      "type",
      "code",
      "fileType",
      "Customer",
    ]);
    return values;
  };

  const getCustomerValues = (customer) => omit(customer, [...defaultFeilds, "name", "customerId"])

  const getProducts = async (productIds) => {
    try {
      if (productIds) {
        startTransition(true)
        const ids = JSON.parse(productIds);
        const products = [];
        for (const id of ids) {
          if (id) {
            const res = await getProductDetails(id);
            if (res && res.status === "success") {
              products.push(getValues(res.data.products[0]))

            }
          }
        }
        startTransition(false)
        if (products.length > 0) {
          setCProducts(products)
          setCproductsDetail(products)
        }
      }

    } catch (error) {
      startTransition(false)
    }

  }

  const getDetails = async () => {
    startTransition(true)
    const res = await getProductDetails(data);
    if (res && res.status === "success") {
      res.data.products.length > 0 && showToast("success", res.message);
      const values = getValues(res.data.products[0]);
      setDetails(values);
      setProductDetail(values)
      startTransition(false)

    } else {
      startTransition(false)
      showToast("error", res.message || "Data not found!");
    }
  };

  const setNewCustomerDetails = (details, type = "fetch") => {

    const cvalues = type === "fetch" ? getValues(details) : getCustomerValues(details);
    setCustomer(cvalues)
    setCustomerDetail({ ...cvalues, name: details.name })
    getProducts(details.productIds)

  }

  const getCustomet = async () => {
    startTransition(true)
    const res = await getCustomerDetails(data);
    if (res && res.status === "success") {
      const { customers } = res.data;
      customers && customers.length > 0 && showToast("success", res.message);
      startTransition(false)
      setNewCustomerDetails(customers[0])
    } else {
      startTransition(false)
      showToast("error", res.message || "Data not found!");
    }

  }
  useEffect(() => {
    if (data) {
      if (typeof data === "string") {

        if (data.startsWith("c")) {
          getCustomet()
        } else {
          getDetails();
        }

      } else if (typeof data === "object") {
        const values = getValues(data);
        setDetails(values);
        setProductDetail(values)
        if (data.Customer) {
          setNewCustomerDetails(data.Customer, "")
        }
      }
    }
  }, [data]);


  return (
    <ScrollView>
      {(details || customer) && (
        <Box p={4} mb={5}>
          {details &&
            Object.keys(details).map(
              (key, i) =>
                details[key] &&
                key !== "product_images" && (
                  <VStack
                    key={i}
                    mt={2}
                    onTouchStart={() => setIsDisabled(false)}
                  >
                    <NxtFormLabel label={key.capitalize()} />
                    <Input
                      value={details[key]}
                      borderRadius={10}
                      borderColor={THEME_COLORS.PRIMARY_COLOR}
                      bg="#fff"
                      // onKeyPress={}
                      isDisabled={isDisabled}
                      onBlur={() => setIsDisabled(true)}
                    />
                  </VStack>
                )
            )}
          {customer && Object.keys(customer).map((key, i) => customer[key] && key !== "productIds" && <VStack
            key={i}
            mt={2}
            onTouchStart={() => setIsDisabled(false)}
          >
            <NxtFormLabel label={key.capitalize()} />
            <Input
              value={customer[key]}
              borderRadius={10}
              borderColor={THEME_COLORS.PRIMARY_COLOR}
              bg="#fff"
              // onKeyPress={}
              isDisabled={isDisabled}
              onBlur={() => setIsDisabled(true)}
            />
          </VStack>)}
          {cProducts && <VStack mt={5}>

            <NxtHeading text={`Products (${cProducts.length})`} />
            {cProducts.map((product, index) => <VStack key={index} borderBottomColor="blue.600" borderBottomWidth={cProducts.length - 1 !== index ? 1 : 0} pb={5}>
              <NxtText text={`Product - ${index + 1} `} mt={4} />

              {Object.keys(product).map((key, i) => product[key] && key !== "product_images" && <VStack
                key={i}
                mt={2}
              >
                <NxtFormLabel label={key.capitalize()} />
                <Input
                  value={product[key]}
                  borderRadius={10}
                  borderColor={THEME_COLORS.PRIMARY_COLOR}
                  bg="#fff"
                  // onKeyPress={}
                  isDisabled={true}
                />
              </VStack>)}

            </VStack>)}
          </VStack>}
          <HStack space={3} flexWrap="wrap" flexDirection="row" mt={4}>
            {details && details.product_images &&
              JSON.parse(details.product_images) &&
              JSON.parse(details.product_images).map((img, i) => (
                <Center key={i} mt={2}>
                  <Image
                    src={`${BARE_URL}/files/${img}`}
                    w={100}
                    h={100}
                    alt="product image"
                  />
                </Center>
              ))}
          </HStack>

          {setData && (
            <Center mt={5}>
              <NxtButton
                onPress={() => setData(false)}
                bg="red.400"
                text="Close"
                width={100}
              />
            </Center>
          )}
        </Box>
      )}

      <Spinner
        visible={isPending}
        textContent={"Fetching details... "}
        textStyle={{ color: "#fff" }}
      />
    </ScrollView>
  );
}
