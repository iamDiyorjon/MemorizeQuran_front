import heroImg from "@assets/image 2.png";
import {
  ActionIcon,
  Box,
  Card,
  Checkbox,
  Flex,
  Image,
  ScrollArea,
  Text,
  Title,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import {
  AlarmClock,
  Clock,
  MessageCircle,
  Octagon,
  StarsIcon,
} from "lucide-react";
const Page = () => {
  return (
    <Flex h="calc(100vh - 122px)" direction="column">
      <Box h="70%" pos="relative" style={{ overflow: "hidden" }}>
        <Flex
          direction="column"
          p={24}
          pb={0}
          pos="absolute"
          w="100%"
          h="100%"
          style={{
            background:
              "linear-gradient(0deg, #F6FAFC 21.78%, rgba(246, 250, 252, 0.85) 38.81%, rgba(246, 250, 252, 0.00) 74.1%)",
          }}
        >
          <Flex direction="column" mt="auto">
            <Title order={2} mb={40}>
              Easy Memorize Quran
            </Title>
            <Carousel
              slideSize="90%"
              align="start"
              slideGap="xs"
              loop
              dragFree
              withControls={false}
            >
              {Array.from({ length: 10 }).map((_, i) => (
                <Carousel.Slide key={i} w="100%">
                  <Card shadow="lg" withBorder p={10} h="100px">
                    <Flex direction="column">
                      <Title order={5}>Easy Memoize Quran</Title>
                      <Text c="dimmed" size="xs">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Rem vitae reprehenderit placeat.
                      </Text>
                    </Flex>
                  </Card>
                </Carousel.Slide>
              ))}
            </Carousel>
            <Flex h={90} gap={10} align="center" justify="space-evenly">
              <Flex
                w={80}
                h={80}
                gap={5}
                direction="column"
                align="center"
                justify="center"
              >
                <AlarmClock size={32} color="#E7BFEE" />
                <Text c="dimmed" size="sm" fw={500}>
                  Reminder
                </Text>
              </Flex>
              <Flex
                w={80}
                h={80}
                gap={5}
                direction="column"
                align="center"
                justify="center"
              >
                <MessageCircle size={32} color="#B7D5F3" />
                <Text c="dimmed" size="sm" fw={500}>
                  Q&A
                </Text>
              </Flex>
              <Flex
                w={80}
                h={80}
                gap={5}
                direction="column"
                align="center"
                justify="center"
              >
                <StarsIcon size={32} color="var(--mantine-color-green-2)" />
                <Text c="dimmed" size="sm" fw={500}>
                  Zikr
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Image src={heroImg} />
      </Box>
      <Box p={24} py={0} h="55%">
        <Title my={5} order={5}>
          All Tasks
        </Title>
        <ScrollArea type="never" h="100%">
          {Array.from({ length: 10 }).map((_, i) => (
            <Card key={i} p={10} mb={10}>
              <Flex align="center" justify="space-between">
                <Flex gap={10} align="center">
                  <Octagon size={28} color="var(--mantine-color-teal-6)" />
                  <Flex direction="column">
                    <Text>Al-Baqarah 10 - 50</Text>
                    <Text c="dimmed" size="xs">
                      Repeat after 15 minutes
                    </Text>
                  </Flex>
                </Flex>
                <Checkbox />
              </Flex>
            </Card>
          ))}
        </ScrollArea>
      </Box>
    </Flex>
  );
};

export const Home = {
  route: "/",
  component: Page,
};
