import IconSymbol from '@/components/ui/IconSymbol';
import useStore  from '@/store/store';
import { Link } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect} from 'react'
import { RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Moment from 'moment';

const journal = () => {
  Moment.locale('en');
  const db = useSQLiteContext()
  const {loading,getJournal,journals,deleteJournal} = useStore()

  const handleDelete = (id:number) => {
    deleteJournal(db,id)
  }


  useEffect(()=>{
    getJournal(db)
  },[])


  if(loading){
    return(
      <View className='w-full h-full flex items-center justify-center'>
        <Text className='text-white text-2xl'>Loading...</Text>
      </View>
    )
  }

  if(journals.length <= 0){
    return (
      <View className='w-full h-full flex-row items-start justify-center p-4'>
          <Text className='text-white/50 text-4xl font-bold'>Empty Journal....</Text>
      </View>
    )
  }


  return (
    <ScrollView
    refreshControl={
      <RefreshControl refreshing={loading} onRefresh={()=>getJournal(db)}/>
    }>
      <View className='h-full flex-col items-start'>
        {/* Table header */}
        <View className='w-full bg-white/10 flex-row items-center '>
          <View className='flex-1  h-[40px] flex-row items-center justify-center'>
            <Text className='text-white text-lg '>Title</Text>
          </View>
          <View className='flex-1 h-[40px] flex-row items-center justify-center'>
            <Text className='text-white text-lg '>Content</Text>
          </View>
          <View className='flex-1 h-[40px] flex-row items-center justify-center'>
            <Text className='text-white text-lg '>Date</Text>
          </View>
          <View className='flex-1 h-[40px] flex-row items-center justify-center'>
            <Text className='text-white text-lg '>Customize</Text>
          </View>
        </View>
        
        {/* Table data */}
        {
          journals.map((item)=>(
            <View key={item.id} className='w-full  flex-row items-center'>
              <View className='flex-1 border-b border-x border-white/20 h-[40px] flex-row items-center justify-center'>
                <Text className='text-white text-xs '>{item.title}</Text>
              </View>
              <View className='flex-1 border-b border-r border-white/20 h-[40px] flex-row items-center justify-center'>
                <Text className='text-white text-xs' numberOfLines={1} ellipsizeMode='tail'>{item.content}</Text>
              </View>
              <View className='flex-1 border-b border-r border-white/20 h-[40px] flex-row items-center justify-center'>
                <Text className='text-white text-xs'>{Moment(item.created_at).format('d MMM y')}</Text>
              </View>
              <View className='flex-1 border-b border-r border-white/20 h-[40px] flex-row  items-center justify-center'>
                <Link href={`/EditJournal/${item.id}`} className='mr-1'>
                  <IconSymbol size={18} name='pencil.and.list.clipboard' color={"#10b981"}/>
                </Link>
                <TouchableOpacity className='ml-1' onPress={()=>handleDelete(item.id)}>
                  <IconSymbol size={18} name='delete.backward.fill' color={"#ef4444"}/>
                </TouchableOpacity>
              </View>
          </View>
          )) 
        }
        <View className='w-full h-[50px] flex-row items-center justify-end mt-2'>
            <Link asChild href={`/(screens)/NewJournal`} className='mr-1'>
              <TouchableOpacity className='bg-emerald-500 px-6 py-3 rounded-lg'>
                  <Text className='text-white'>ADD NEW</Text>
              </TouchableOpacity>
            </Link>
        </View>
      </View>
    </ScrollView>
  )
}
export default journal