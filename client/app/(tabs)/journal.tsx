import IconSymbol from '@/components/ui/IconSymbol';
import useStore  from '@/store/store';
import { Link } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect} from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'

const journal = () => {
  const db = useSQLiteContext()
  const {loading,getJournal,journal} = useStore()

  useEffect(()=>{
    getJournal(db)
  },[])

  if(loading){
    return(
      <View className='w-full h-full flex items-center justify-center'>
        <Text className='text-white'>Loading...</Text>
      </View>
    )
  }

  return (
    <ScrollView>
      <View className='h-full flex-col items-start'>
        {/* Table header */}
        <View className='w-full  flex-row items-center'>
          <View className='w-1/4 border border-white h-[40px] flex-row items-center justify-center'>
            <Text className='text-white text-xl '>Title</Text>
          </View>
          <View className='w-1/2 border border-white h-[40px] flex-row items-center justify-center'>
            <Text className='text-white text-xl '>Content</Text>
          </View>
          <View className='w-1/4 border border-white h-[40px] flex-row items-center justify-center'>
            <Text className='text-white text-xl '>Customize</Text>
          </View>
        </View>
        
        {/* Table data */}
        {
          journal.map((item)=>(
            <View className='w-full  flex-row items-center'>
              <View className='w-1/4 border-b border-x border-white/20 h-[40px] flex-row items-center justify-center'>
                <Text className='text-white text-xl '>{item.title}</Text>
              </View>
              <View className='w-1/2 border-b border-r border-white/20 h-[40px] flex-row items-center justify-center'>
                <Text className='text-white text-xl '>{item.content}</Text>
              </View>
              <View className='w-1/4 border-b border-r border-white/20 h-[40px] flex-row  items-center justify-center'>
                <Link href={'/CreateJournal'} className='mr-1'>
                  <IconSymbol name='pencil.and.list.clipboard' color={"#10b981"}/>
                </Link>
                <TouchableOpacity className='ml-1'>
                  <IconSymbol name='delete.backward.fill' color={"#ef4444"}/>
                </TouchableOpacity>
              </View>
          </View>
          )) 
        }
        <View className='w-full h-[50px] flex-row items-center justify-end'>
          <TouchableOpacity className='bg-emerald-500 px-6 py-3 rounded-lg'>
            <Text className='text-white'>ADD NEW</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}
export default journal