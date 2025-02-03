// import { PostIssue, Surah } from "@/shared/models";
// import { $allSurahs } from "@/shared/state";
// import {
//   ActionIcon,
//   Button,
//   Checkbox,
//   ComboboxItem,
//   Flex,
//   Select,
// } from "@mantine/core";
// import { DateInput, TimeInput } from "@mantine/dates";
// import { useUnit } from "effector-react";
// import { Clock } from "lucide-react";
// import { useRef, useState } from "react";
// import { useForm } from "@mantine/form";
// interface SelectedSurah extends Surah, ComboboxItem {}

// const Page = () => {
//   const ref = useRef<HTMLInputElement>(null);
//   const form = useForm<PostIssue>({
//     initialValues: {
//       learnTypeId: 1,
//       surahId: 0,
//       from: 0,
//       to: 0,
//       dateLearned: "",
//       durationMinutes: 0,
//       repetitionCount: 0,
//       userId: 0,
//     },
//     validate: {
//       surahId: (value) => (value ? null : "Select surah"),
//       from: (value) => (value ? null : "Select from"),
//       to: (value) => (value ? null : "Select to"),
//       dateLearned: (value) => (value ? null : "Select date"),
//     },
//   });
//   const [allSurahs] = useUnit([$allSurahs]);
//   const [learnBy, setLearnBy] = useState<string>("");
//   const [selectedSurah, setSelectedSurah] = useState<SelectedSurah>();
//   const [dateLearned, setDateLearned] = useState<string>();
//   const [fromValue, setFromValue] = useState<string>("");
//   const [toValue, setToValue] = useState<string>("");
//   const [from, setFrom] = useState<string[]>(
//     Array.from({ length: 604 }, (_, i) => (i + 1).toString())
//   );
//   const [to, setTo] = useState<string[]>([]);

//   const handleFromValue = (value: string) => {
//     setFromValue(value);

//     // Get index of selected value in the original from array
//     const selectedIndex = from.indexOf(value);

//     // Create new to options starting from selected index
//     const newToOptions = from.slice(selectedIndex + 1);
//     setTo(newToOptions);
//   };

//   const handleToValue = (value: string) => {
//     // Ensure the selected value is valid in current context
//     if (to.includes(value)) {
//       setToValue(value);
//     }
//   };

//   const handleSurahSelection = (surah: ComboboxItem) => {
//     setSelectedSurah(surah);
//     setFrom(
//       Array.from({ length: surah.ayahSize }, (_, i) => (i + 1).toString())
//     );
//   };
//   const handleLearnBy = (value: string) => {
//     if (value === "1") {
//       setTo([]);
//       setFrom([]);
//       setFromValue("");
//       setToValue("");
//     }
//     if (value === "2") {
//       setFrom(Array.from({ length: 114 }, (_, i) => (i + 1).toString()));
//       setTo([]);
//       setFromValue("");
//       setToValue("");
//     }
//     setLearnBy(value);
//   };

//   const handleCreateTask = (values: PostIssue) => {
//     console.log(values);
//   };

//   const pickerControl = (
//     <ActionIcon
//       variant="subtle"
//       color="gray"
//       onClick={() => ref.current?.showPicker()}
//     >
//       <Clock size={16} />
//     </ActionIcon>
//   );
//   return (
//     <Flex
//       w="100%"
//       h="calc(100vh - 200px)"
//       direction="column"
//       justify="center"
//       align="center"
//     >
//       <form style={{ width: "85%" }} onSubmit={form.onSubmit(handleCreateTask)}>
//         <Flex mt={70} direction="column" gap={15} w="100%">
//           <Select
//             {...form.getInputProps("learnTypeId")}
//             error={form.errors.learnTypeId}
//             label="Learn by"
//             placeholder="Pick value"
//             data={[
//               {
//                 value: "2",
//                 label: "Pages",
//               },
//               {
//                 value: "1",
//                 label: "Surah",
//               },
//             ]}
//             value={learnBy}
//             onChange={(value) => handleLearnBy(value as any)}
//             onClear={() => setLearnBy("")}
//             clearable
//             w="100%"
//           />
//           {learnBy === "1" && (
//             <Select
//               label="Sura"
//               placeholder="Pick sura"
//               data={
//                 allSurahs &&
//                 allSurahs.map((surah) => ({
//                   value: surah.id.toString(),
//                   label: surah.name,
//                   ...surah,
//                 }))
//               }
//               onChange={(e, r) => handleSurahSelection(r)}
//               clearable
//               searchable
//               w="100%"
//             />
//           )}
//           <Flex gap={10}>
//             <Select
//               label="Enter range"
//               placeholder="from"
//               data={from}
//               onChange={(e) => handleFromValue(e as any)}
//               value={fromValue}
//               clearable
//               w="100%"
//             />
//             <Select
//               label={<></>}
//               disabled={!fromValue}
//               value={toValue}
//               onChange={(e) => handleToValue(e as any)}
//               placeholder="to"
//               data={to}
//               clearable
//               w="100%"
//             />
//           </Flex>
//           <DateInput
//             label="Date learned"
//             placeholder="Pick date"
//             clearable
//             valueFormat="DD/MM/YYYY"
//             onChange={(date) => setDateLearned(date?.toISOString())}
//           />
//           <TimeInput
//             ref={ref}
//             label="Learning time"
//             placeholder="Pick time"
//             rightSection={pickerControl}
//           />
//           <Checkbox label="Remind me" />
//           <Button type="submit" mt="auto" fullWidth>
//             Create Task
//           </Button>
//         </Flex>
//       </form>
//     </Flex>
//   );
// };

// export const Learn = {
//   route: "/learn",
//   component: Page,
// };

import { PostIssue, Surah } from "@/shared/models";
import { $allSurahs, $currentUser } from "@/shared/state";
import {
  ActionIcon,
  Button,
  Checkbox,
  ComboboxItem,
  Flex,
  Select,
} from "@mantine/core";
import { DateInput, TimeInput } from "@mantine/dates";
import { useUnit } from "effector-react";
// import { Clock } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "@mantine/form";

const Page = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [allSurahs, currentUser] = useUnit([$allSurahs, $currentUser]);
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
      surahId: 0,
      from: 0,
      to: 0,
      dateLearned: "",
      durationMinutes: 0,
      repetitionCount: 0,
      userId: currentUser ? currentUser.userId : 0,
    },
    validate: {
      learnTypeId: (value) => (value > 0 ? null : "Select learning type"),
      surahId: (value, values) =>
        values.learnTypeId === 1 && value <= 0 ? "Select surah" : null,
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

  // Calculate from options based on learning type
  // const fromOptions = useMemo(() => {
  //   if (form.values.learnTypeId === "1") {
  //     const selectedSurah = allSurahs?.find(
  //       (s) => s.id === form.values.surahId
  //     );
  //     return selectedSurah
  //       ? Array.from({ length: selectedSurah.ayahSize }, (_, i) =>
  //           (i + 1).toString()
  //         )
  //       : [];
  //   }
  //   if (form.values.learnTypeId === "2") {
  //     return Array.from({ length: 604 }, (_, i) => (i + 1).toString());
  //   }
  //   return [];
  // }, [form.values.learnTypeId, form.values.surahId, allSurahs]);

  // // Calculate to options based on selected from value
  // const toOptions = useMemo(() => {
  //   if (!form.values.from || form.values.from < 1) return [];

  //   const max =
  //     form.values.learnTypeId === 1
  //       ? allSurahs?.find((s) => s.id === form.values.surahId)?.ayahSize || 0
  //       : 604;

  //   return Array.from({ length: max - form.values.from }, (_, i) =>
  //     (form.values.from + i + 1).toString()
  //   );
  // }, [
  //   form.values.from,
  //   form.values.learnTypeId,
  //   form.values.surahId,
  //   allSurahs,
  // ]);

  // Reset related fields when learning type changes
  useEffect(() => {
    if (form.values.learnTypeId === 2) {
      form.setFieldValue("surahId", 0);
    }
    form.setFieldValue("from", 0);
    form.setFieldValue("to", 0);
  }, [form.values.learnTypeId]);

  const handleCreateTask = (values: PostIssue) => {
    console.log("Submitting:", {
      ...values,
      userId: currentUser?.userId,
    });
    console.log("User:", currentUser);
  };

  const pickerControl = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => ref.current?.showPicker()}
    >
      {/* <Clock size={16} /> */}
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
      <form style={{ width: "85%" }} onSubmit={form.onSubmit(handleCreateTask)}>
        <Flex mt={70} direction="column" gap={15} w="100%">
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

          {/* <Flex gap={10}>
            <Select
              {...form.getInputProps("from")}
              label="Enter range"
              placeholder="from"
              data={from}
              value={fromValue}
              onChange={(e) => handleFromValue(e as any)}
              w="100%"
              clearable
              disabled={!form.values.learnTypeId}
            />
            <Select
              {...form.getInputProps("to")}
              label={<></>}
              placeholder="to"
              value={toValue}
              data={to}
              onChange={(e) => handleToValue(e as any)}
              w="100%"
              clearable
              disabled={!form.values.from}
            />
          </Flex> */}
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
            valueFormat="DD/MM/YYYY"
            onChange={(date) =>
              form.setFieldValue("dateLearned", date?.toISOString() || "")
            }
            clearable
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
