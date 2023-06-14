import {
  Box,
  Center,
  HStack,
  Icon,
  IconButton,
  ScrollView,
  Text,
  View,
  VStack,
} from "native-base";
import { memo, useCallback, useEffect, useState } from "react";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { NxtButton, RenderInput } from "../../../components/common";
import { THEME_COLORS } from "../../../config/constants";
import { RefreshControl } from "react-native";
import { wait } from "../../../services";
import { useIsFocused } from "@react-navigation/native";
import { getEmployees } from "../../../services/authService";
import { useSelector } from "react-redux";

const Employees = () => {
  const { user } = useSelector((state) => state.auth);

  const [refreshing, setRefreshing] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [data, setData] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortType, setSortType] = useState("DESC");
  const [showLimits, setShowLimits] = useState([
    "6",
    "10",
    "26",
    "50",
    "76",
    "100",
  ]);
  const [limitValue, setLimitValue] = useState("10");

  const isFocused = useIsFocused();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
  }, []);

  const getAllDetails = async (
    page = currentPage,
    limit = currentLimit,
    sortBy = sortBy,
    sortType = sortType
  ) => {
    setIsFetching(true);
    const values = {
      adminId: user.adminId,
      page,
      limit: limit * 1,
      sortBy,
      sortType,
    };

    const res = await getEmployees(values);

    if (res && res.status === "success") {
      setData(res.data);
    }
    setIsFetching(false);
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
    <ScrollView
      flex={1}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Box p={4}>
        {data && data.count > 10 && (
          <HStack width={"90%"}>
            <RenderInput bg={"#fff"} placeholder={"Search Employee"} />
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
        )}
        <Center>
          {data?.employees?.map((e) => (
            <View
              justifyContent={"center"}
              borderRadius={20}
              key={e.employeeId}
            //   shadow={1}
              borderColor={"blue.200"}
              p={10}
              bgColor={"#fff"}
              width={"90%"}
              mt={4}

            >
              <Icon
                alignSelf="center"
                as={<FontAwesome name="user-circle-o" />}
                size={45}
                color={THEME_COLORS.PRIMARY_COLOR}
              />
              <Text>Name: {e.fullName}</Text>
              <Text>Gender: {e.gender}</Text>
              <Text>Email: {e.email}</Text>
              <Text>Phone: {e.phoneNumber}</Text>
            </View>
          ))}
        </Center>

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

            {data.count > data.limit &&
              data.limit + data.offset < data.count && (
                <NxtButton
                  text={"Next >>"}
                  onPress={() => changePage("Next")}
                />
              )}
          </HStack>
        )}
      </Box>
    </ScrollView>
  );
};

export default memo(Employees);
