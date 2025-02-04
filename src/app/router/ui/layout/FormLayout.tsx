import { Icon } from "@/shared/ui";
import { ActionIcon, AppShell, Flex, Title } from "@mantine/core";
import { Outlet, useNavigate } from "react-router-dom";
export const FormLayout = () => {
  const navigate = useNavigate();
  return (
    <Flex direction="column" w="100%" h="calc(100vh - 70px)">
      <AppShell.Header>
        <Flex px={10} w="100%" h="100%" align="center">
          <ActionIcon onClick={() => navigate("/")} variant="transparent">
            <Icon name="chevron_left" />
          </ActionIcon>
          <Title w="100%" ta="center" fw={400} order={5}>
            Easy memorize Quran
          </Title>
        </Flex>
      </AppShell.Header>
      <Outlet />
    </Flex>
  );
};
