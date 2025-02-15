import { getJournal } from '@/lib/database';
import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'

const Journal = () => {
  const [loading,setLoading] = useState(false);

  useEffect(()=>{
    const fetchJournals = async () => {
      try {
        setLoading(true)
        getJournal() 
      } catch (error) {
        console.log(error)
      }
    }
    fetchJournals()
  },[])

  return (
    <View className='h-full flex-col items-center justify-center'>
      <Text className='text-3xl text-blue-500'>Journal</Text>
    </View>
  )
}
export default Journal