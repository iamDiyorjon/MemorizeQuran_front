import { ActionIcon, Button, Checkbox, Flex, Select } from "@mantine/core";
import { DateInput, TimeInput } from "@mantine/dates";
import { Clock } from "lucide-react";
import { useRef, useState } from "react";
const Page = () => {
  const ref = useRef<HTMLInputElement>(null);

  const [learnBy, setLearnBy] = useState<"Pages" | "Surah" | "">("");
  const [from, setFrom] = useState<string[]>(
    Array.from({ length: 114 }, (_, i) => (i + 1).toString())
  );
  const [to, setTo] = useState<string[]>([]);
  const [fromValue, setFromValue] = useState<string>("");
  const [toValue, setToValue] = useState<string>("");

  const handleFromValue = (value: string) => {
    setFromValue(value);

    // Get index of selected value in the original from array
    const selectedIndex = from.indexOf(value);

    // Create new to options starting from selected index
    const newToOptions = from.slice(selectedIndex + 1);
    setTo(newToOptions);
  };

  const handleToValue = (value: string) => {
    // Ensure the selected value is valid in current context
    if (to.includes(value)) {
      setToValue(value);
    }
  };
  const pickerControl = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => ref.current?.showPicker()}
    >
      <Clock size={16} />
    </ActionIcon>
  );
  return (
    <Flex
      w="100%"
      h="calc(100vh - 200px)"
      direction="column"
      justify="center"
      align="center"
    >
      <Flex mt={70} direction="column" gap={15} w="85%">
        <Select
          label="Learn by"
          placeholder="Pick value"
          data={["Pages", "Surah"]}
          value={learnBy}
          onChange={(value) => setLearnBy(value as any)}
          onClear={() => setLearnBy("")}
          clearable
          w="100%"
        />
        {learnBy === "Surah" && (
          <Select
            label="Sura"
            placeholder="Pick sura"
            data={["Surah Al-Fatihah", "Surah Al-Baqarah"]}
            clearable
            w="100%"
          />
        )}
        <Flex gap={10}>
          <Select
            label="Enter range"
            placeholder="from"
            data={from}
            onChange={(e) => handleFromValue(e as any)}
            value={fromValue}
            clearable
            w="100%"
          />
          <Select
            label={<></>}
            disabled={!fromValue}
            value={toValue}
            onChange={(e) => handleToValue(e as any)}
            placeholder="to"
            data={to}
            clearable
            w="100%"
          />
        </Flex>
        <DateInput
          label="Date learned"
          placeholder="Pick date"
          clearable
          valueFormat="DD/MM/YYYY"
        />
        <TimeInput
          ref={ref}
          label="Learning time"
          placeholder="Pick time"
          rightSection={pickerControl}
        />
        <Checkbox label="Remind me" />
        <Button mt="auto" fullWidth>
          Create Task
        </Button>
      </Flex>
    </Flex>
  );
};

export const Learn = {
  route: "/learn",
  component: Page,
};
