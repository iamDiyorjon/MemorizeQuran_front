import {
  Box,
  Card,
  Checkbox,
  Divider,
  Flex,
  Skeleton,
  Text,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useUnit } from "effector-react";
import {
  $isLoadingPlanForDay,
  $isLoadingPlanForMonth,
  $planForDay,
  $planForMonth,
  pageMounted,
  plansForDayFetched,
} from "../model";
import { useEffect, useState } from "react";
import "./style.css";
import { Icon } from "@/shared/ui";
const Page = () => {
  const [mountPage, fetchPlansForDay] = useUnit([
    pageMounted,
    plansForDayFetched,
  ]);
  const [plans, plansForDay] = useUnit([$planForMonth, $planForDay]);
  const [isLoadingPlanForMonth, isLoadingPlanForDay] = useUnit([
    $isLoadingPlanForMonth,
    $isLoadingPlanForDay,
  ]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  useEffect(() => {
    mountPage({
      userId: 2,
      date: new Date().toDateString(),
    });
  }, []);

  const handleDayClick = (e, date: Date) => {
    setSelectedDate(date);
    fetchPlansForDay({
      userId: 2,
      date: date.toDateString(),
    });
  };

  if (isLoadingPlanForMonth) {
    return <Skeleton h="100%">Loading...</Skeleton>;
  }
  return (
    <Flex
      align="center"
      justify="center"
      direction="column"
      w="100%"
      pt={50}
      bg="#F6FAFC"
      h="calc(100vh - 90px)"
    >
      <Box h="50%">
        <DatePicker
          // value={new Date()}
          hideOutsideDates
          renderDay={(date) => {
            // if date is today, return a circle with the date
            if (date.getDate() === selectedDate?.getDate()) {
              return (
                <Flex
                  align="center"
                  justify="center"
                  w="100%"
                  h="100%"
                  className="selected"
                >
                  {date.getDate()}
                </Flex>
              );
            } else {
              return (
                plans.find((plan) => plan.day === date.getDate())?.hasPlan && (
                  <Flex
                    align="center"
                    justify="center"
                    w="100%"
                    h="100%"
                    className="hasPlan"
                  >
                    {date.getDate()}
                  </Flex>
                )
              );
            }
          }}
          styles={{
            day: {
              borderRadius: "10px",
            },
          }}
          __onDayClick={handleDayClick}
          size="md"
        />
      </Box>
      <Divider mb={10} w="80%" label="Plans for today" labelPosition="center" />
      <Flex direction="column" gap={10} px={20} w="100%" h="50%">
        {isLoadingPlanForDay ? (
          <Box>Loading...</Box>
        ) : (
          plansForDay.map((plan) => (
            <Card
              bg={
                !plan.isCompleted ? "var(--mantine-primary-color-filled)" : ""
              }
              py={5}
              shadow="xs"
              radius="md"
              key={plan.id}
            >
              <Flex align="center" gap={10}>
                <Icon name="book" size={20} />
                <Flex direction="column">
                  <Text fw="500">
                    {plan.surahName ? plan.surahName : "By Pages"} {plan.from} -{" "}
                    {plan.to}
                  </Text>
                  <Text fz={12}>repeat after 15 minutes</Text>
                </Flex>
                <Checkbox
                  color="var(--mantine-primary-color-filled)"
                  variant="filled"
                  ml="auto"
                  size="sm"
                />
              </Flex>
            </Card>
          ))
        )}
        {plansForDay?.length <= 0 && (
          <Flex align="center" justify="center" w="100%" h="100%">
            No plans for today
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export const Tasks = {
  route: "/tasks",
  component: Page,
};
