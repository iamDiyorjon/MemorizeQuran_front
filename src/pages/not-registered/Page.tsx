import { userNotFound } from "@/shared/state";
import { Button, Flex, Text } from "@mantine/core";
import WebApp from "@twa-dev/sdk";
import { useUnit } from "effector-react";

export const Page = () => {
  const [registerUser] = useUnit([userNotFound]);
  const handleRegister = () => {
    registerUser({
      telegramId: WebApp.initDataUnsafe?.user.id,
      fullName: "New User",
    });
  };
  return (
    <Flex gap={10} direction="column" h="100vh" align="center" justify="center">
      <Text>Not registered</Text>
      <Text>Please register to use the app</Text>
      <Button onClick={handleRegister}>Register</Button>
    </Flex>
  );
};

export const NotRegisteredPage = {
  component: Page,
  route: "/notRegistered",
};
