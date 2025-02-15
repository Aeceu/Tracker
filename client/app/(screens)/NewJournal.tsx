import useStore from '@/store/store'
import { useSQLiteContext } from 'expo-sqlite'
import { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

const NewJournal = () => {
  const [newJournal,setNewJournal] = useState({
    title:"",
    content:""
  })

  const db = useSQLiteContext()
  const {insertJournal} = useStore()

  const handleAddJournal = () => {
    insertJournal(db,newJournal)
  }

  return (
      <SafeAreaProvider>
        <SafeAreaView className='w-full h-full p-4 flex-col gap-4'>
            <View className='flex-col gap-2'>
              <Text className='text-white text-lg'>Title:</Text>
              <TextInput
              value={newJournal?.title}
              onChangeText={text=>setNewJournal({...newJournal,title:text})}
              className='text-xl text-white border-2 border-white/20 rounded-xl p-3'
              />
            </View>

            <View className='flex-col gap-2'>
              <Text className='text-white text-lg'>Content</Text>
              <TextInput
                editable
                multiline
                numberOfLines={8}
                maxLength={500}
                value={newJournal?.content}
                onChangeText={(text)=>{
                  setNewJournal({...newJournal,content:text})
                }}
                className=' text-white text-xl border-2 border-white/20 rounded-xl p-3'
                />
            </View>
            <View className='w-full flex-row items-center justify-end'>
              <TouchableOpacity onPress={handleAddJournal} className='bg-emerald-500 px-6 py-3 rounded-lg'>
                <Text className='text-xl text-white'>Create Journal</Text>
              </TouchableOpacity>
            </View>
        </SafeAreaView>
      </SafeAreaProvider>
  )
}
export default NewJournal