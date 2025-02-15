import { Stack } from "expo-router"

const _layout = () => {
  return (
    <Stack>
        <Stack.Screen
        name="NewJournal"
        />
        <Stack.Screen
        name="EditJournal/[id]"
        options={{
          title:"Edit Journal"
        }}
        />
    </Stack>
  )
}
export default _layout