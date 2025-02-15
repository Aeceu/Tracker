import { TJournal, TNewJournal } from "./types/journal"
import {create} from 'zustand'
import * as SQLite from 'expo-sqlite';
import { Alert } from "react-native";

type State = {
    journals:TJournal[]
    loading:Boolean;
}

type Action = {
    setJournal:(newJournal:TJournal)=>void;
    getJournal:(db:SQLite.SQLiteDatabase)=>void;
    getJournalById:(db:SQLite.SQLiteDatabase,journalId:string)=>Promise<TJournal|null|undefined>;
    insertJournal:(db:SQLite.SQLiteDatabase,newJournal:TNewJournal)=>void;
    editJournal:(db:SQLite.SQLiteDatabase,newJournal:TNewJournal,journalId:string)=>void;
    deleteJournal:(db:SQLite.SQLiteDatabase,journalId:number)=>void;
}

const useStore = create<State & Action>()(
    (set)=>({
        loading:false,
        journals:[],
        setJournal: (newJournal:TJournal) => {
            set((state)=>({...state,journal:[...state.journals,newJournal]}))
        },
        getJournal: async (db) => {
            try {
                set(()=>({loading:true}))
                const res:TJournal[] = await db.getAllAsync(`SELECT * FROM journal_entries;`)
                set(()=>({
                    journals:res
                }))
            } catch (error) {
                console.log("Failed to fetch journals!")
                console.log(error)
            } finally{
                set(()=>({loading:false}))
            }
        },
        getJournalById: async (db,journalId) => {
            try {
                const res: TJournal[] = await db.getAllAsync(`SELECT * FROM journal_entries WHERE id = ?;`, [journalId]);
                console.log("res",res)
                if (res.length > 0) {
                  return res[0]; 
                }
                return null; 
            } catch (error) {
                console.log("Failed to fetch journals!")
                console.log(error)
            } 
        },
        insertJournal:async (db,newJournal) => {
            try {
                const res = await db.runAsync(
                    `INSERT INTO journal_entries (title, content) VALUES (?,?);`,[
                        newJournal.title,
                        newJournal.content
                    ]
                )
                Alert.alert("Journal entries added!")
                console.log(res)
            } catch (error) {
                Alert.alert("Failed to insert journal!")
                console.log(error)
            }
        },
        editJournal:async (db,newJournal,journalId) => {
            try {
                const res = await db.runAsync(`
                    UPDATE journal_entries SET title = ?, content = ? WHERE id = ?;
                    `,[newJournal.title,newJournal.content,journalId])
                console.log(res)
                Alert.alert("Journal Updated successfully!")
            } catch (error) {
                Alert.alert("Failed to insert journal!")
                console.log(error)
            }
        },
        deleteJournal: async (db,journalId) => {
            try {
                const res = await db.runAsync(`DELETE FROM journal_entries WHERE id = ?;`,[journalId])
                console.log(res)
                Alert.alert("Journal deleted successfully!")
            } catch (error) {
                Alert.alert("Failed to delete journal!")
                console.log(error)
            }
        }
        
    }
))


export default useStore;