import useStore from '@/store/store';
import { TJournal } from '@/store/types/journal';
import { useLocalSearchParams } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { Button, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const EditJournal = () => {
  const { id } = useLocalSearchParams();
  const journalId = Array.isArray(id) ? id[0] : id; 

  const db = useSQLiteContext()
  const {editJournal,getJournalById} = useStore()
  const [journal,setJournal] = useState<TJournal|null>(null);
  const [loading,setLoading] = useState(false)

  const handleEdit = async () => {
    if(!journal) return;
    editJournal(db,journal,journalId)
  }


  useEffect(() => {
    const fetchJournal = async () => {
      setLoading(true)
      if (journalId) {
        const res = await getJournalById(db, journalId);
        if (res) {
          setJournal(res);
        } else {
          console.log("Journal not found");
        }
      }
      setLoading(false)
    };

    fetchJournal();
  }, [journalId]);
  

  if (loading){
    return(
      <View className='w-full h-full items-center justify-center'>
        <Text>Loading...</Text>
      </View>
    )
  }

  if (!journal){
    return(
      <View className='w-full h-full items-center justify-center'>
        <Text className='text-2xl text-white'>There is no journal!</Text>
      </View>
    )
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView className='w-full h-full p-4 flex-col gap-4'>
          <TextInput
          value={journal?.title}
          onChangeText={text=>setJournal({...journal,title:text})}
          className='text-xl text-white border-2 border-white/20 rounded-xl p-3'
          />
          <TextInput
            editable
            multiline
            numberOfLines={8}
            maxLength={500}
            value={journal?.content}
            onChangeText={(text)=>{
              setJournal({...journal,content:text})
            }}
            className=' text-white text-xl border-2 border-white/20 rounded-xl p-3'
          />
          <View className='w-full flex-row items-center justify-end'>
            <TouchableOpacity onPress={handleEdit} className='bg-emerald-500 px-6 py-3 rounded-lg'>
              <Text className='text-xl text-white'>Update Journal</Text>
            </TouchableOpacity>

          </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default EditJournal;
