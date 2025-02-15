import { TJournal } from "./types/journal"
import {create} from 'zustand'
import * as SQLite from 'expo-sqlite';

type State = {
    journal:TJournal[]
    loading:Boolean;
}

type Action = {
    setJournal:(newJournal:TJournal)=>void;
    getJournal:(db:SQLite.SQLiteDatabase)=>void;
}

const useStore = create<State & Action>()(
    (set)=>({
        loading:false,
        journal:[],
        setJournal: (newJournal:TJournal) => {
            set((state)=>({...state,journal:[...state.journal,newJournal]}))
        },
        getJournal: async (db) => {
            try {
                set(()=>({loading:true}))
                const res:TJournal[] = await db.getAllAsync(`SELECT * FROM journal_entries;`)
                set(()=>({
                    journal:res
                }))
            } catch (error) {
                console.log("Failed to fetch journals!")
                console.log(error)
            } finally{
                set(()=>({loading:false}))
            }
        }
    }
))


export default useStore;