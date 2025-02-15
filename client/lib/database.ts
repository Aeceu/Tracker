import { Asset } from "expo-asset";
import * as SQLite from "expo-sqlite";
import * as FileSystem from 'expo-file-system';

const db = SQLite.useSQLiteContext()

export const loadDatabase = async () => {
    const dbName = "jobTracker.db"
    const dbAsset = "./jobTracker.db"
    const dbUri = Asset.fromModule(dbAsset).uri;
    const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

    const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
    if(!fileInfo.exists){
        await FileSystem.makeDirectoryAsync(
            `${FileSystem.documentDirectory}SQLite`,
            {intermediates:true}
        );
        await FileSystem.downloadAsync(dbUri,dbFilePath);
    }
}


export const initializeDB = async () => {
    try {
        const res = db.withTransactionAsync(async () => {
            db.execAsync(`
            CREATE TABLE IF NOT EXISTS journal_entries (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                content TEXT NOT NULL,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP 
            );`)
        })
        console.log(res)
        console.log("DB initialize!")
        return res;
    } catch (error) {
        console.log("Failed to initialize database!")
        console.log(error)
    }
}

type InsertJournalProps = {
    title:string;
    content:string
}

export const insertJournal = async ({content,title}:InsertJournalProps) => {
    try {
        const res = await db.runAsync(
            `INSERT INTO journal_entries (title, content) VALUES (?,?);`,[
                title,
                content
            ]
        )
        console.log("Journal entries added!")
        console.log(res)
    } catch (error) {
        console.log("Failed to insert a journal!")
        console.log(error)
    }
}

export const getJournal = async () => {
    try {
        const res = await db.getAllAsync("SELECT * FROM journal_entries;")
        console.log(res)
        return res
    } catch (error) {
        console.log("Failed to fetch journal")
        console.log(error)
    }
}