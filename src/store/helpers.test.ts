import storeHelpers from "store/helpers";

import staticData from "data.json";
import { IMessage } from "types";

test("store helpers ", () => {
  const input: IMessage[] = [
    {
      text: "a",
      datetime: "2023-03-30T13:29:38.392Z",
      userId: staticData.users[0].userId,
      messageId: "1",
    },
    {
      text: "b",
      datetime: "2023-03-30T13:28:38.392Z",
      userId: staticData.users[1].userId,
      messageId: "2",
    },
    {
      text: "b",
      datetime: "2023-03-30T13:28:38.392Z",
      userId: staticData.users[1].userId,
      messageId: "2",
    },
    {
      text: "c",
      datetime: "2023-03-30T13:27:38.392Z",
      userId: staticData.users[2].userId,
      messageId: "3",
    },
  ];

  const output = storeHelpers.sanitizeMessages(input);

  const expectedOutput = [
    {
      text: "a",
      datetime: "2023-03-30T13:29:38.392Z",
      userId: "Joyse",
      messageId: "1",
      timeString: "19:14",
    },
    {
      text: "b",
      datetime: "2023-03-30T13:28:38.392Z",
      userId: "Sam",
      messageId: "2",
      timeString: "19:13",
    },
    {
      text: "c",
      datetime: "2023-03-30T13:27:38.392Z",
      userId: "Russell",
      messageId: "3",
      timeString: "19:12",
    },
  ];

  expect(output).toStrictEqual(expectedOutput);
});
