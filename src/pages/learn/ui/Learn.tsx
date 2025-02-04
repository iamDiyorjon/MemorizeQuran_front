import { PostIssue } from "@/shared/models";
import { $allSurahs, $currentUser } from "@/shared/state";
import { ActionIcon, Button, Checkbox, Flex, Select } from "@mantine/core";
import { DateInput, TimeInput } from "@mantine/dates";
import { useUnit } from "effector-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "@mantine/form";
import { Icon } from "@/shared/ui";
import { issueCreated } from "../model";

const Page = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [allSurahs, currentUser] = useUnit([$allSurahs, $currentUser]);
  const [createIssue] = useUnit([issueCreated]);
  const [fromValue, setFromValue] = useState<string>("");
  const [toValue, setToValue] = useState<string>("");
  const [from, setFrom] = useState<string[]>(
    Array.from({ length: 604 }, (_, i) => (i + 1).toString())
  );
  const [to, setTo] = useState<string[]>([]);

  const handleFromValue = (value: any) => {
    setFromValue(value as string);
    form.setFieldValue("from", value);
    const selectedIndex = from.indexOf(value);
    const newToOptions = from.slice(selectedIndex + 1);
    setTo(newToOptions);
  };

  const handleToValue = (value: any) => {
    if (to.includes(value)) {
      setToValue(value);
      form.setFieldValue("to", value);
    }
  };

  const form = useForm<PostIssue>({
    initialValues: {
      learnTypeId: 0,
      surahId: null,
      from: 0,
      to: 0,
      dateLearned: new Date().toISOString(),
      durationMinutes: 0,
      repetitionCount: 0,
      userId: currentUser ? currentUser.userId : 0,
    },
    validate: {
      learnTypeId: (value) => (value > 0 ? null : "Select learning type"),
      surahId: (value, values) =>
        values.learnTypeId === "1" && value <= 0 ? "Select surah" : null,
      from: (value) => (value <= 0 ? "Select from" : null),
      to: (value) => (value <= 0 ? "Select to" : null),
    },
    transformValues: (values) => {
      return {
        ...values,
        surahId: Number(values.surahId),
        from: Number(values.from),
        to: Number(values.to),
        learnTypeId: Number(values.learnTypeId),
      };
    },
    onValuesChange: (values) => {
      // if changed field if surahId, update from and to options
      if (values.surahId !== form.values.surahId) {
        const selectedSurahSize = allSurahs?.find(
          (s) => s.id === Number(values.surahId)
        )?.ayahSize;
        setFrom(
          Array.from({ length: selectedSurahSize || 0 }, (_, i) =>
            (i + 1).toString()
          )
        );
      }
    },
  });

  const handleClear = (field: string) => {
    switch (field) {
      case "from":
        setFromValue("");
        form.setFieldValue("from", 0);
        break;
      case "to":
        setToValue("");
        form.setFieldValue("to", 0);
        break;
      default:
        return;
    }
  };

  // Reset related fields when learning type changes
  useEffect(() => {
    if (form.values.learnTypeId === "2") {
      form.setFieldValue("surahId", null);
      form.setFieldValue("from", 0);
      form.setFieldValue("to", 0);
      setFromValue("");
      setToValue("");
      setFrom(Array.from({ length: 604 }, (_, i) => (i + 1).toString()));
    }
  }, [form.values.learnTypeId]);

  const handleCreateTask = (values: PostIssue) => {
    console.log("Submitting:", {
      ...values,
      surahId: values.surahId === 0 ? null : values.surahId,
      userId: currentUser?.userId,
    });
    console.log(form.errors);
    createIssue({
      ...values,
      surahId: values.surahId === 0 ? null : values.surahId,
      userId: currentUser ? currentUser.userId : 0,
    });
  };

  const pickerControl = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => ref.current?.showPicker()}
    >
      <Icon name="alarm" size={18} />
    </ActionIcon>
  );

  return (
    <Flex w="100%" h="100%" direction="column" justify="center" align="center">
      <form style={{ width: "85%" }} onSubmit={form.onSubmit(handleCreateTask)}>
        <Flex direction="column" gap={15} w="100%">
          <Select
            {...form.getInputProps("learnTypeId")}
            label="Learn by"
            placeholder="Pick value"
            data={[
              { value: "1", label: "Surah" },
              { value: "2", label: "Pages" },
            ]}
            w="100%"
            clearable
          />

          {String(form.values.learnTypeId) === "1" && (
            <Select
              {...form.getInputProps("surahId")}
              label="Surah"
              placeholder="Pick surah"
              data={allSurahs?.map((surah) => ({
                value: surah.id.toString(),
                label: surah.name,
              }))}
              clearable
              searchable
              w="100%"
            />
          )}
          <Flex gap={10}>
            <Select
              error={form.errors.from}
              label="Enter range"
              placeholder="from"
              data={from}
              onChange={(e) => handleFromValue(e as any)}
              value={fromValue}
              onClear={() => handleClear("from")}
              clearable
              w="100%"
            />
            <Select
              error={form.errors.to}
              label={<></>}
              disabled={!fromValue}
              value={toValue}
              onChange={(e) => handleToValue(e as any)}
              placeholder="to"
              data={to}
              clearable
              onClear={() => handleClear("to")}
              w="100%"
            />
          </Flex>
          <DateInput
            label="Date learned"
            placeholder="Pick date"
            valueFormat="DD/MM/YYYY"
            onChange={(date) =>
              form.setFieldValue("dateLearned", date?.toISOString() || "")
            }
            value={new Date(form.values.dateLearned)}
          />

          <TimeInput
            ref={ref}
            label="Learning time"
            placeholder="Pick time"
            rightSection={pickerControl}
            // onChange={(date) => {
            //   const minutes = (date?.getHours() || 0) * 60 + (date?.getMinutes() || 0);
            //   form.setFieldValue("durationMinutes", minutes);
            // }}
          />

          <Checkbox
            label="Remind me"
            // checked={form.values.repetitionCount > 0}
            // onChange={(e) =>
            //   form.setFieldValue("repetitionCount", e.currentTarget.checked ? 1 : 0)
            // }
          />

          <Button type="submit" mt="auto" fullWidth>
            Create Task
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};

export const Learn = {
  route: "/learn",
  component: Page,
};
