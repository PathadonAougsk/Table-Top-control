import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown: false}}/>
      <Stack.Screen name="rollPage" options={{headerShown: false}}/>
      <Stack.Screen name="CreateUnit" options={{headerShown: false}}/>
      <Stack.Screen name="loadout" options={{headerShown: false}}/>
      <Stack.Screen name="EditUnit" options={{headerShown: false}}/>
    </Stack>
  );
}
