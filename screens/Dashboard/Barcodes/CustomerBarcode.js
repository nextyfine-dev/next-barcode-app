import {
  Box,
  Checkbox,
  CheckIcon,
  Divider,
  HStack,
  Icon,
  IconButton,
  Image,
  Modal,
  Pressable,
  Select,
  Spinner as Loading,
  View,
  VStack,
} from "native-base";
import Spinner from "react-native-loading-spinner-overlay";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { NxtButton, NxtText, RenderInput } from "../../../components/common";
import { THEME_COLORS } from "../../../config/constants";
import { colors } from "./../../../models/ColorModel";
import PrintBarcodes from "./PrintBarcodes";
const BarcodeImg = require("../../../assets/barcode.png");

const CustomerBarcode = ({
  customers,
  navigation,
  searchCustomer,
  searchValue,
  isFetching,
  setSortBy,
  setSortType,
  type,
  setSelectedCustomers,
  setCurrentLimit,
}) => {
  const [selectedItem, setSelectedItem] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [isPending, startTransition] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showLimits, setShowLimits] = useState([
    "6",
    "10",
    "26",
    "50",
    "76",
    "100",
  ]);
  const [limitValue, setLimitValue] = useState("10");
  const [isPrinting, setIsPrinting] = useState(false);

  const addToSelectItem = (item) => {
    const allItems = [...selectedItem];
    allItems.push(item);
    setSelectedItem(allItems);
    return true;
  };

  const removeFromSelectItem = (item) => {
    const allItems = selectedItem.filter(
      (i) => i.customerId !== item.customerId
    );
    setSelectedItem(allItems);
    return true;
  };

  const checkIsItemSelected = (item) => {
    const hasItem = selectedItem.findIndex(
      (i) => i.customerId === item.customerId
    );
    if (hasItem !== -1) {
      return true;
    } else {
      return false;
    }
  };

  const toggleCheck = (item) => {
    startTransition(true);
    const hasItem = checkIsItemSelected(item);
    if (hasItem) {
      const res = removeFromSelectItem(item);
      res && startTransition(false);
    } else {
      const res = addToSelectItem(item);
      res && startTransition(false);
    }
  };

  const toggleSelect = (item) => {
    if (Array.isArray(selectedItem)) {
      toggleCheck(item);
      setIsSelecting((s) => !s);
    } else {
      setSelectedItem([item]);
      setIsSelecting((s) => !s);
    }
  };

  const selectAndRemoveAll = (type) => {
    startTransition(true);
    let allSelectedCustomer = [...selectedItem];
    for (const customer of customers) {
      if (type === "select") {
        const hasItem = checkIsItemSelected(customer);
        if (!hasItem) {
          allSelectedCustomer.push(customer);
        }
      } else if (type === "unselect") {
        allSelectedCustomer = allSelectedCustomer.filter(
          (i) => i.customerId !== customer.customerId
        );
      } else {
        allSelectedCustomer = selectedItem;
      }
    }
    setSelectedItem(allSelectedCustomer);
    startTransition(false);
  };

  return (
    <>
      <Box p={2}>
        <HStack width={"90%"}>
          <RenderInput
            bg={"#fff"}
            placeholder={"Search customer"}
            onChangeText={searchCustomer}
            value={searchValue}
          />
          <IconButton
            mt={8}
            m={1}
            onPress={() => {
              setShowOptions(!showOptions);
            }}
            icon={
              <Icon
                as={<Ionicons />}
                name={showOptions ? "settings" : "settings-outline"}
                size={25}
                color={THEME_COLORS.PRIMARY_COLOR}
              />
            }
            borderWidth={1}
            // bg="blue.200"
            borderColor={THEME_COLORS.PRIMARY_COLOR}
            borderRadius={15}
          />
        </HStack>
      </Box>

      {!isFetching ? (
        customers.length > 0 ? (
          <HStack
            alignItems={"center"}
            flexWrap={"wrap"}
            justifyContent={"center"}
          >
            {customers.map((item, i) => (
              <Pressable
                key={item.customerId || i}
                onPress={() =>
                  navigation.navigate("BarcodeAndProductDetails", {
                    detail: item,
                    isCustomer: true,
                  })
                }
                onLongPress={() => toggleSelect(item)}
              >
                <View
                  justifyContent={"center"}
                  borderRadius={5}
                  height={isSelecting ? 120 : 100}
                  alignItems={"center"}
                  alignSelf="center"
                  shadow={9}
                  width={150}
                  m={2}
                  style={{
                    shadowColor: colors[Math.floor(Math.random() * 100)].hex,
                  }}
                  borderWidth={isSelecting && checkIsItemSelected(item) ? 2 : 0}
                  borderColor={"blue.200"}
                  bgColor={"#fff"}
                >
                  {isSelecting && (
                    <Checkbox
                      mb={2}
                      onChange={() => toggleCheck(item)}
                      isChecked={checkIsItemSelected(item)}
                      accessibilityLabel={`${item.customerId}`}
                      borderWidth={1}
                      width={140}
                      ariaLabel={`${item.customerId}`}
                    />
                  )}
                  <Image
                    source={BarcodeImg}
                    width={20}
                    height={10}
                    alt="barcode"
                  />

                  <NxtText fontSize={11} text={item.customerId} />
                  <NxtText
                    color={THEME_COLORS.MAIN_DARK_COLOR}
                    text={item.name}
                  />
                </View>
              </Pressable>
            ))}
          </HStack>
        ) : (
          <NxtText text={"customer not found!"} color="red.500" />
        )
      ) : (
        <HStack space={2} alignItems="center" justifyContent="center">
          <Loading accessibilityLabel="Loading posts" />
          <NxtText text={"Loading..."} color="primary.500" fontSize="md" />
        </HStack>
      )}

      <Spinner
        visible={isPending}
        textContent={"Checking... "}
        textStyle={{ color: "#fff" }}
      />

      <Modal
        isOpen={showOptions}
        onClose={() => setShowOptions(false)}
        safeAreaTop={true}
      >
        <Modal.Content
          width={"100%"}
          borderRadius={0}
          marginBottom={0}
          marginTop="auto"
        >
          <Modal.CloseButton />
          <Modal.Header>Options</Modal.Header>
          <Modal.Body>
            {isSelecting ? (
              <VStack>
                <NxtText text={` ${selectedItem.length} customer Selected`} />
                <HStack bg="#fff" mt={2} flexWrap="wrap">
                  <NxtButton
                    m={1}
                    text={"Select All"}
                    onPress={() => selectAndRemoveAll("select")}
                  />
                  {selectedItem.length > 0 && (
                    <NxtButton
                      m={1}
                      text={"Un Select"}
                      onPress={() => selectAndRemoveAll("unselect")}
                      bg="blue.400"
                    />
                  )}
                  {selectedItem.length > 0 && (
                    <NxtButton
                      m={1}
                      text={"Un Select All"}
                      onPress={() => setSelectedItem([])}
                      bg="blue.500"
                    />
                  )}

                  {!type && selectedItem.length > 0 && (
                    <NxtButton
                      m={1}
                      text={`Print Barcodes`}
                      onPress={() => setIsPrinting(true)}
                      bg="green.500"
                    />
                  )}

                  <NxtButton
                    m={1}
                    text={`Hide Selection`}
                    onPress={() => setIsSelecting(false)}
                    bg="red.500"
                  />

                  {type && selectedItem.length > 0 && (
                    <NxtButton
                      m={1}
                      text={`Done`}
                      onPress={() => {
                        setSelectedCustomers(selectedItem);
                        setShowOptions(false);
                      }}
                    />
                  )}
                </HStack>
              </VStack>
            ) : (
              <VStack>
                <HStack space={2} mt={2}>
                  <NxtButton
                    text={`Show Selection`}
                    onPress={() => setIsSelecting(true)}
                  />
                </HStack>
              </VStack>
            )}
            <Divider mt={3} mb={3} />
            <NxtText text="Sort By :" fontSize={20} />
            <HStack flexWrap="wrap">
              <NxtButton
                m={1}
                text={"Name"}
                onPress={() => setSortBy("name")}
                bg={"blue.500"}
              />
              <NxtButton
                m={1}
                text={"Time"}
                onPress={() => setSortBy("createdAt")}
                bg={"yellow.500"}
              />
              <NxtButton
                m={1}
                text={"Id"}
                onPress={() => setSortBy("customerId")}
                bg={"green.500"}
              />
              <NxtButton
                m={1}
                text={`DESC`}
                onPress={() => setSortType("DESC")}
              />
              <NxtButton
                m={1}
                text={`ASC`}
                onPress={() => setSortType("ASC")}
                bg="violet.500"
              />
            </HStack>
            <Divider mt={3} mb={3} />
            <HStack space={3}>
              <NxtText text="Show :" fontSize={20} />
              <Select
                selectedValue={limitValue}
                defaultValue={"10"}
                onValueChange={(value) => {
                  setLimitValue(value);
                  setCurrentLimit(value * 1);
                }}
                accessibilityLabel="Select Limit"
                minWidth="200"
                height={35}
                placeholder="Select Limit"
                _selectedItem={{
                  bg: "green.400",
                  endIcon: <CheckIcon size={5} />,
                  borderRadius: 30,
                }}
              >
                {showLimits.map((limit, i) => (
                  <Select.Item key={i} label={limit} value={limit} />
                ))}
              </Select>
            </HStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>

      {isPrinting && (
        <PrintBarcodes
          isPrinting={isPrinting}
          setIsPrinting={setIsPrinting}
          barcodes={selectedItem}
        />
      )}
    </>
  );
};

export default CustomerBarcode;
