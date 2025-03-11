//Layout.tsx
import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native"
import HomeScreen from "./home"
import FactScreen from "./facts"

const Tabs = createBottomTabNavigator()

export default function TabLayout() {
  return (
   
      <Tabs.Navigator>
        <Tabs.Screen name="Home" component={HomeScreen} />
        <Tabs.Screen name="Facts" component={FactScreen} />
      </Tabs.Navigator>
  
  )
}
