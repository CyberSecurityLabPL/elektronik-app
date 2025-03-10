import { AnnouncementList } from "@/components/news/AnnouncementList"
import { ArticleList } from "@/components/news/ArticlesList"
import { Tabs } from "@/components/news/Tabs"
import ScreenWrapper from "@/components/ScreenWrapper"
import Heading from "@/components/ui/Heading"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { View } from "react-native"

const News = () => {
    const { t } = useTranslation()
    const [tabs, setTabs] = useState<'article' | 'announcment'>('article')

    return (
        <ScreenWrapper>
            <Heading title={t("News.heading")} />
            <Tabs
                tabs={tabs}
                setTabs={setTabs} />
            <View className="mb-[40px] mt-4 bg-background-secondary w-full h-fit flex-1 rounded-2xl p-4">
                {tabs === 'article' && (
                    <ArticleList />
                )}
                {tabs === 'announcment' && (
                    <AnnouncementList />
                )}
            </View>
        </ScreenWrapper>
    )
}

export default News