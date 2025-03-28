import { getStorageData, setStorageData } from "@/lib/storage"
import SwitchButton from "../ui/SwitchButton"
import { useCallback, useEffect, useState } from "react"
import { catchError } from "@/utils/catchError"
import { toast } from "sonner-native"
import { getMessaging, subscribeToTopic, unsubscribeFromTopic } from "@react-native-firebase/messaging"
import { getApp } from "@react-native-firebase/app"
import { cn } from "@/lib/utils"

/**
 * Represents the available notification topics that users can subscribe to
 * @typedef {'council-articles' | 'school-announcements' | 'substitutions'} NotificationTopic
 */
type NotificationTopic = 'council-articles' | 'school-announcements' | 'substitutions';

/**
 * Settings object for managing notification preferences
 * @typedef {Object} NotificationSettings
 * @property {boolean} articles - Whether council articles notifications are enabled
 * @property {boolean} announcements - Whether school announcements notifications are enabled
 * @property {boolean} substitutions - Whether substitutions notifications are enabled
 */
type NotificationSettings = {
  articles: boolean;
  announcements: boolean;
  substitutions: boolean;
};

/**
 * Default notification settings when none are stored yet
 * @type {NotificationSettings}
 */
const DEFAULT_SETTINGS: NotificationSettings = {
  articles: true,
  announcements: true,
  substitutions: true
};

/**
 * Props for the TopicCard component
 * @typedef {Object} TopicCardProps
 * @property {string} title - Display title for the notification topic
 * @property {string} children - Description text explaining the notification type
 * @property {NotificationTopic} topic - Which notification topic this card controls
 * @property {boolean} isLoading - Whether the parent component is in a loading state
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setIsLoading - Function to update the loading state
 */
interface TopicCardProps {
  title: string;
  children: string;
  topic: NotificationTopic;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  withAdditionalStyles?: boolean
}

/**
 * Component that allows users to subscribe/unsubscribe from Firebase notification topics
 * 
 * The TopicCard renders a toggle switch that connects to Firebase Cloud Messaging
 * to manage notification subscriptions. It handles the UI state, Firebase subscriptions,
 * and persistent storage of user preferences.
 * 
 * @param {TopicCardProps} props - Component properties
 * @returns {JSX.Element} A toggleable notification subscription card
 */
export const TopicCard = ({
  title,
  children,
  topic,
  isLoading: isLoading,
  setIsLoading: setIsLoading,
  withAdditionalStyles = false
}: TopicCardProps) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const messaging = getMessaging(getApp());

  /**
   * Retrieves notification settings from local storage with error handling
   * 
   * @returns {Promise<NotificationSettings>} The user's notification preferences or default settings if none exist
   */
  const getSettings = async (): Promise<NotificationSettings> => {
    const [error, result] = await catchError(getStorageData('notifications'));
    return (!error && result && result.success) ? result.data : DEFAULT_SETTINGS;
  };

  /**
   * Maps a notification topic to its corresponding settings key
   * 
   * @param {NotificationTopic} topic - The notification topic to map
   * @returns {keyof NotificationSettings} The corresponding key in the settings object
   */
  const getSettingsKey = (topic: NotificationTopic): keyof NotificationSettings => {
    switch (topic) {
      case 'council-articles': return 'articles';
      case 'school-announcements': return 'announcements'; 
      case 'substitutions': return 'substitutions';
    }
  };

  /**
   * Handles toggling notification subscription on/off
   * 
   * This function:
   * 1. Updates the UI state
   * 2. Subscribes/unsubscribes from Firebase topic
   * 3. Saves the updated preferences to storage
   * 4. Handles any errors that occur during the process
   * 
   * @returns {Promise<void>}
   */
  const handleToggle = useCallback(async () => {
    try {
      setIsLoading(true);
      setIsEnabled(!isEnabled);

      const currentSettings = await getSettings();
      const settingsKey = getSettingsKey(topic);

      if (isEnabled) {
        console.log("Unsubscribing from topic:", topic);
        await unsubscribeFromTopic(messaging, topic);
      } else {
        console.log("Subscribing to topic:", topic);
        await subscribeToTopic(messaging, topic);
      }

      const newSettings = {
        ...currentSettings,
        [settingsKey]: !isEnabled
      };

      await setStorageData('notifications', newSettings);
      console.log('New settings:', newSettings);
    } catch (error) {
      console.error("Error handling toggle:", error);
      toast.error("Nie udało się zapisać ustawień powiadomień");
      setIsEnabled(isEnabled);
    } finally {
      setIsLoading(false);
    }
  }, [isEnabled, topic, messaging]);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        setIsLoading(true);
        const [error, result] = await catchError(getStorageData('notifications'));
        const isFirstTimeSetup = !(!error && result && result.success);
        const settings = isFirstTimeSetup ? DEFAULT_SETTINGS : result.data;
        const settingsKey = getSettingsKey(topic);
        
        setIsEnabled(settings[settingsKey]);
        
        // If this is first-time setup and the topic should be enabled by default,
        // subscribe to the topic and save settings
        if (isFirstTimeSetup && settings[settingsKey]) {
          console.log(`First-time setup: Subscribing to topic ${topic}`);
          await subscribeToTopic(messaging, topic);
          
          // If this is the first component to initialize settings, save them
          if (!result || !result.success) {
            await setStorageData('notifications', DEFAULT_SETTINGS);
            console.log('Initialized default notification settings:', DEFAULT_SETTINGS);
          }
        }
      } catch (error) {
        console.error("Error loading settings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, [topic, messaging]);

  return (
    <SwitchButton
      title={title}
      subtitle={children}
      onPress={() => handleToggle()}
      isEnabled={isEnabled}
      className={cn({
        "w-full shadow-md border border-foreground/20": withAdditionalStyles
      })}
      componentDisabled={isLoading}
    />
  );
}