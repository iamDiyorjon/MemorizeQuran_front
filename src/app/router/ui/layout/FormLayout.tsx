import { ActionIcon, AppShell, Flex, Title } from "@mantine/core";
import { ChevronLeft } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";

export const FormLayout = () => {
  const navigate = useNavigate();
  return (
    <>
      <AppShell.Header>
        <Flex px={10} w="100%" h="100%" align="center">
          <ActionIcon onClick={() => navigate("/")} variant="transparent">
            <ChevronLeft />
          </ActionIcon>
          <Title w="100%" ta="center" fw={400} order={5}>
            Easy memorize Quran
          </Title>
        </Flex>
      </AppShell.Header>
      <Outlet />
    </>
  );
};
