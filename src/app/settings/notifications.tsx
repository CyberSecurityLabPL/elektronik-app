import { SwitchPanel } from "@/components/notifications/SwitchPanel"
import ScreenWrapper from "@/components/ScreenWrapper"
import Heading from "@/components/ui/Heading"
import { useState } from "react"
import { useTranslation } from "react-i18next"

const Notifications = () => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)

  return (
    <ScreenWrapper>
      <Heading title={t("Settings.notifications.heading")} screen="settings" blockReturn={isLoading} />
      <SwitchPanel
          isLoading={isLoading}
          setIsLoading={setIsLoading}
      />
    </ScreenWrapper>
  )
}

export default Notifications