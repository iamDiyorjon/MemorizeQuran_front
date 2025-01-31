import { AppShell, Button, Flex, rem } from "@mantine/core";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { BookOpenText, Calendar, GraduationCap, House } from "lucide-react";
const navbar = [
  {
    label: "Home",
    link: "/",
    icon: <House />,
    enabled: true,
  },
  {
    label: "Learn",
    link: "/learn",
    icon: <GraduationCap />,
    enabled: true,
  },
  {
    label: "Duas",
    link: "/duas",
    icon: <BookOpenText />,
    enabled: false,
  },
  {
    label: "Khatm",
    link: "/khatm",
    icon: <BookOpenText />,
    enabled: false,
  },
  {
    label: "Tasks",
    link: "/tasks",
    icon: <Calendar />,
    enabled: true,
  },
];

export const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleRouting = (route: string) => {
    navigate(route);
  };
  return (
    <AppShell footer={{ height: 90 }} header={{ height: 50 }} padding="md">
      <AppShell.Main pt={0} pl={0} pr={0} bg="#F6FAFC">
        <Outlet />
      </AppShell.Main>
      <AppShell.Footer p={0} px={20}>
        <Flex w="100%" h="100%" gap="md" justify="space-between" align="center">
          {navbar.map((item, index) => (
            <Button
              h={65}
              w={65}
              p={0}
              key={index}
              onClick={() => handleRouting(item.link)}
              variant="transparent"
              c={
                location.pathname === item.link
                  ? "var(--mantine-primary-color-filled)"
                  : "gray"
              }
              styles={{
                label: {
                  display: "flex",
                  fontSize: rem(14),
                  flexDirection: "column",
                  gap: rem(6),
                  alignItems: "center",
                  justifyContent: "center",
                },
              }}
            >
              {item.icon}
              {item.label}
            </Button>
          ))}
        </Flex>
      </AppShell.Footer>
    </AppShell>
  );
};
