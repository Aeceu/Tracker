import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import { SymbolWeight } from "expo-symbols"
import { OpaqueColorValue, StyleProp, ViewProps, ViewStyle } from "react-native"

const MAPPING = {
    "house.fill":'home',
    "book.fill":'book'
} as Partial<Record<import('expo-symbols').SymbolViewProps['name'],React.ComponentProps<typeof MaterialIcons>['name']>>

export type IconSymbolName = keyof typeof MAPPING

type IconSymbolProps = {
    name:IconSymbolName
    color:string|OpaqueColorValue;
    size?:number ;
    className?:string;
    weight?:SymbolWeight;    
}

const IconSymbol:React.FC<IconSymbolProps> = ({color,name,size = 24,className,weight}) => {
  return (
     <MaterialIcons color={color} size={size} name={MAPPING[name]} className={className}/>
  )
}
export default IconSymbol