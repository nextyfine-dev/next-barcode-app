import { useCallback, useEffect, useState } from "react";
import { Box, ScrollView } from "native-base";
import { useSelector } from "react-redux";
import { RefreshControl } from "react-native";

import { USER_ROLE } from "../../../config/constants";
import AdminHome from "./AdminHome";
import EmployeeHome from "./EmployeeHome";
import { wait } from "../../../services";

export default function Home({ navigation }) {
  const { user } = useSelector((state) => state.auth);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
  }, []);

  return (
    <ScrollView
      flex={1}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Box safeArea p={4}>
        {user?.userRole === USER_ROLE.ADMIN ? (
          <AdminHome
            navigation={navigation}
            user={user}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        ) : (
          <EmployeeHome navigation={navigation} user={user} />
        )}
      </Box>
    </ScrollView>
  );
}
