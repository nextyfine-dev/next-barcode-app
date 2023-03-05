import { useIsFocused } from "@react-navigation/native";
import { Box, Center, Icon, Input, ScrollView, VStack } from "native-base";
import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import omit from "lodash/omit";

import { NxtCard, NxtFormLabel } from "../../../components/common";
import { getAdmin } from "../../../services/authService";
import { THEME_COLORS } from "../../../config/constants";

const Admin = () => {
  const { user } = useSelector((state) => state.auth);
  const isFocused = useIsFocused();

  const [admin, setAdmin] = useState(null);

  const findAdmin = async () => {
    const res = await getAdmin(user.adminId);

    if (res && res.status === "success") {
      setAdmin(res.data);
    }
  };

  useEffect(() => {
    if (isFocused) {
      findAdmin();
    }

    return () => {
      setAdmin(null);
    };
  }, [isFocused]);

  return (
    <ScrollView>
      <Box safeArea mt={3}>
        <Center mt={3} mb={10}>
          <NxtCard pb={10} pt={10}>
            <Icon
              alignSelf="center"
              size={50}
              as={<FontAwesome name="user-circle-o" />}
            />
            <VStack mt={5}>
              {admin &&
                Object.keys(
                  omit(admin, [
                    "active",
                    "adminId",
                    "createdAt",
                    "updatedAt",
                    "userRole",
                    "password",
                    "userName"
                  ])
                ).map((u, i) => (
                  <VStack key={i} mt={2}>
                    <NxtFormLabel label={u.capitalize()} />
                    <Input
                      placeholder="Full Name"
                      value={admin[u]}
                      borderRadius={10}
                      borderColor={THEME_COLORS.PRIMARY_COLOR}
                      bg="#fff"
                    />
                  </VStack>
                ))}
            </VStack>
          </NxtCard>
        </Center>
      </Box>
    </ScrollView>
  );
};

export default memo(Admin);
