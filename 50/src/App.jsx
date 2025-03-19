import {
     Button,
     Card,
     Input,
     Stack,
     Container,
     ClientOnly,
     IconButton,
     Skeleton,
     Text,
     For,
     Alert,
     Center,
     Flex,
     Show,
} from "@chakra-ui/react";

import { useColorMode } from "@/components/ui/color-mode";

import { LuMoon, LuSun } from "react-icons/lu";

import { useEffect, useState } from "react";

function App() {
     // States And Hooks

     const { toggleColorMode, colorMode } = useColorMode();
     const [array, setArray] = useState([]);
     const [inuputValue, setInputValue] = useState("");
     const [isInputEmpty, setIsInputEmpty] = useState(false);
     const [editValue, setEditValue] = useState("");
     const [editIndex, setEditIndex] = useState(false);

     // Constants

     const DefaltAry = [{ Nots: "Didnt Find Any Data", EState: false }];

     // Functions

     // Loader Function

     const Loader = (StorgeName, StoreValueFunc, defaultValue) => {
          if (
               !localStorage.getItem(StorgeName) ||
               localStorage.getItem(StorgeName) == null
          ) {
               console.log("didnt Find");
               StoreValueFunc(defaultValue);
          } else {
               console.log("Found");
               StoreValueFunc(JSON.parse(localStorage.getItem(StorgeName)));
          }
     };

     const Saver = (StorgeName, StoreValue) => {
          localStorage.setItem(StorgeName, JSON.stringify(StoreValue));
     };

     // Add ,Dellte and Edit Functions
     const SotreInput = (Input) => {
          setInputValue(Input);
     };

     const AddItem = (IteamValue) => {
          if (!IteamValue) {
               setIsInputEmpty(true);
          } else {
               if (isInputEmpty) {
                    setIsInputEmpty(false);
               }
               setArray([...array, { Nots: IteamValue, EState: false }]);
               Saver("TheNots", [
                    ...array,
                    { Nots: IteamValue, EState: false },
               ]);
               setInputValue("");
          }
     };

     const DeleteItem = (index) => {
          if (array.length === 1) {
               setArray(DefaltAry);
               Saver("TheNots", DefaltAry);
          } else {
               const newArray = array.filter((_, i) => i !== index);
               setArray(newArray);
               Saver("TheNots", newArray);
          }
     };

     const EditThis = (index) => {
          const updatedArray = [...array];

          if (editIndex !== false) {
               updatedArray[editIndex].EState = false;
          }

          updatedArray[index].EState = true;

          setEditIndex(index);
          setArray(updatedArray);
     };

     const EditThisDone = (index) => {
          // Create a copy of the array
          const updatedArray = [...array];

          // Update the item with new value and disable edit mode
          updatedArray[index].Nots = editValue;
          updatedArray[index].EState = false;

          // Reset edit index and update array
          setEditIndex(false);
          setArray(updatedArray);

          // Save to localStorage (using updatedArray to ensure latest data)
          Saver("TheNots", updatedArray);
     };
     //Run The App
     // LoadData

     useEffect(() => {
          Loader("TheNots", setArray, DefaltAry);
     }, []);

     return (
          <>
               {/* Alert */}
               <Show when={isInputEmpty}>
                    <Flex
                         position={"fixed"}
                         bottom={"2vh"}
                         left={"0px"}
                         right={"0px"}
                         align={"center"}
                         alignItems={"center"}
                         justifyContent={"center"}
                    >
                         <Alert.Root
                              width={"5/12"}
                              status="error"
                              title="This is the alert title"
                         >
                              <Alert.Indicator />
                              <Alert.Title>This is the alert title</Alert.Title>
                         </Alert.Root>
                    </Flex>
               </Show>
               <Container
                    width={"full"}
                    margin={0}
                    position={"absolute"}
                    alignItems={"end"}
                    justifyItems={"end"}
               >
                    <ClientOnly fallback={<Skeleton boxSize="8" />}>
                         <IconButton
                              onClick={toggleColorMode}
                              variant="outline"
                              size="sm"
                         >
                              {colorMode === "light" ? <LuSun /> : <LuMoon />}
                         </IconButton>
                    </ClientOnly>
               </Container>

               {/* Inputs */}

               <Stack margin={"50px 0px"}>
                    <Card.Root
                         display={"flex"}
                         alignContent={"center"}
                         justifyContent={"center"}
                         width="5/12"
                         height={"15vh"}
                         alignSelf={"center"}
                         variant={"outline"}
                         padding={"0px 3vw"}
                    >
                         <Container width="100%" display={"Flex"} gap={"0.5vw"}>
                              <Input
                                   value={inuputValue}
                                   placeholder="Nigro Gigro"
                                   onChange={(e) => SotreInput(e.target.value)}
                              />
                              <Button
                                   variant={"outline"}
                                   onClick={() => {
                                        AddItem(inuputValue);
                                   }}
                              >
                                   Submit
                              </Button>
                         </Container>
                    </Card.Root>
               </Stack>

               {/* The Rendering */}

               <Stack margin={"50px 0px"}>
                    <Card.Root
                         display={"flex"}
                         alignContent={"center"}
                         justifyContent={"center"}
                         width="5/12"
                         alignSelf={"center"}
                         variant={"outline"}
                         padding={"4vh 3vw"}
                         gap={"1vh"}
                    >
                         <For each={array}>
                              {(item, index) =>
                                   !item.EState === true ? (
                                        <Card.Root
                                             key={index}
                                             width="100%"
                                             display={"Flex"}
                                             gap={"0.5vw"}
                                             padding={"0.5vw 1vw  0.5vw   1vw"}
                                             flexDir={"row"}
                                             justifyContent={"space-between"}
                                             alignItems={"center"}
                                        >
                                             <Text
                                                  textStyle={"xl"}
                                                  fontWeight={"bold"}
                                             >
                                                  {item.Nots}
                                             </Text>
                                             <Container
                                                  padding={"0"}
                                                  margin={"0"}
                                                  minWidth={"165px"}
                                                  maxWidth={"170px"}
                                                  display={"flex"}
                                                  justifyContent={"end"}
                                             >
                                                  <Button
                                                       variant={"outline"}
                                                       margin={" 0 5px 0 0 "}
                                                       onClick={() => {
                                                            EditThis(index);
                                                       }}
                                                  >
                                                       Edit
                                                  </Button>
                                                  <Button
                                                       variant={"outline"}
                                                       onClick={() => {
                                                            DeleteItem(index);
                                                       }}
                                                  >
                                                       Delete
                                                  </Button>
                                             </Container>
                                        </Card.Root>
                                   ) : (
                                        <Container
                                             width="100%"
                                             display={"Flex"}
                                             gap={"0.5vw"}
                                             key={index}
                                        >
                                             <Input
                                                  // value={inuputValue}
                                                  placeholder="Nigro Gigro"
                                                  onChange={(e) =>
                                                       setEditValue(
                                                            e.target.value
                                                       )
                                                  }
                                             />
                                             <Button
                                                  variant={"outline"}
                                                  onClick={() => {
                                                       EditThisDone(index);
                                                  }}
                                             >
                                                  Submit
                                             </Button>
                                        </Container>
                                   )
                              }
                         </For>
                    </Card.Root>
               </Stack>
          </>
     );
}

export default App;
