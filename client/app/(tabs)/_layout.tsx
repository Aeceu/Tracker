import { Tabs } from 'expo-router'
import IconSymbol from '@/components/ui/IconSymbol'

const Tablayout = () => {
    return (
    <Tabs>
        <Tabs.Screen
        name='index'
        options={{
            title:"Dashboard",
            tabBarIcon:({color})=> <IconSymbol size={28} name='house.fill' color={color}/>
        }}
        />

        <Tabs.Screen
        name='journal'
        options={{
            title:"My Journal",
            tabBarIcon:({color})=> <IconSymbol size={28} name='book.fill' color={color}/>
        }}
        />
    </Tabs>
  )
}
export default Tablayout