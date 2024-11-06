import { View, Text } from 'react-native'
import React from 'react'
import { ArrowUpRight, Clock } from 'lucide-react-native';

interface EventProps {
  type: "future event" | "event"
  title: string
  content: string
  date: string
  
  timeLeft: string
}

const Event: React.FC<EventProps> = ({ type, title, content, date, timeLeft }) => {
    if (type === "event") {
      return(
      <View className=" flex w-[85vw] bg-[#FFB055] rounded-3xl pt-9 pb-6 px-8 color-[#222222]">
      <View className="flex-row justify-between pb-6">
        <View ><Text className='text-base font-medium'>{title}</Text></View>
        <View className='flex-row items-center justify-center gap-2 py-1 px-3 rounded-xl bg-[#FFEEDA]'><Clock size={16} color={"#212121"} strokeWidth={3}/><Text className='text-xl font-psemibold'>{timeLeft}</Text></View>
      </View>
      <View><Text className='text-6xl font-pmedium leading-tight'>{content}</Text></View>
      <View className="flex-row justify-between pt-7">
        <View className="flex justify-center items-center p-1 bg-black rounded-full"><ArrowUpRight color="white" size={24}/></View>
        <View className='flex-row items-center justify-center gap-2'><Text className='text-lg font-pregular'>{date}</Text><Clock size={16} color={"#212121"} strokeWidth={3}/></View>
      </View>
    </View>
      )
    } else {
      return (
      <View className=" flex w-[85vw] bg-[#74A8E5] rounded-3xl pt-9 pb-6 px-8 color-[#222222]">
      <View className="flex-row justify-between pb-6">
        <View ><Text className='text-base font-medium'>{title}</Text></View>
      </View>
      
      <View className="flex-row justify-center items-center pt-1">
        <View className='w-[66%]'><Text className='text-4xl font-pmedium leading-tight'>{content}</Text></View>
        <View className='w-[33%]'><Text className='text-lg font-pregular'>{date}</Text></View>
      </View>
    </View>
      )
    }
}

export default Event