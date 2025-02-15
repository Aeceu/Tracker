import { Tabs } from 'expo-router'
import IconSymbol from '@/components/ui/IconSymbol'
import { useEffect, useState } from 'react'

const Tablayout = () => {
  
  useEffect(()=>{
    
  },[])

    

    return (
    <Tabs>
        <Tabs.Screen
        name='index'
        options={{
            title:"Dashboard",
            headerShown:false,
            tabBarIcon:({color})=> <IconSymbol size={28} name='house.fill' color={color}/>
        }}
        />

        <Tabs.Screen
        name='Journal'
        options={{
            title:"Journal",
            headerShown:false,
            tabBarIcon:({color})=> <IconSymbol size={28} name='book.fill' color={color}/>
        }}
        />
    </Tabs>
  )
}
export default Tablayout