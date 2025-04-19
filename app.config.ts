import Constants from 'expo-constants'

const IS_DEV = process.env.APP_VARIANT === 'development';
const IS_DEV_FROM_CONST = Constants.expoConfig?.extra?.isDevelopmentClient
const IS_PREVIEW = process.env.APP_VARIANT === 'preview';
const IS_BETA = process.env.APP_VARIANT === 'beta';

const BASE_APP_ID = 'pl.krystian_wybranowski.elektronPlus'
const BASE_APP_NAME = 'Elektronik'

console.log(`App variant: ${process.env.APP_VARIANT}, isDev: ${IS_DEV}, isDevFromConst: ${IS_DEV_FROM_CONST}, isPreview: ${IS_PREVIEW}, isBeta: ${IS_BETA}`)

const getUniqueIdentifier = () => {
    if (IS_DEV || IS_DEV_FROM_CONST) return `${BASE_APP_ID}.dev`
    if (IS_PREVIEW) return `${BASE_APP_ID}.preview`

    // No check for beta, because it should be able to download production version too
    return BASE_APP_ID
}

const getAppName = () => {
    if (IS_DEV || IS_DEV_FROM_CONST) return `${BASE_APP_NAME} (Dev)`
    if (IS_PREVIEW) return `${BASE_APP_NAME} (Preview)`
    if (IS_BETA) return `${BASE_APP_NAME} (Beta)`

    return BASE_APP_NAME
}


export default {
    name: getAppName(),
    slug: "elektron",
    version: "6.1.0",
    orientation: "portrait",
    icon: "./src/assets/images/icon.png",
    scheme: "elektronik",
    userInterfaceStyle: "automatic",
    notification: {
        icon: "./src/assets/images/splash-icon-dark.png",
        color: "#032666",
        iosDisplayInForeground: true
    },
    ios: {
        supportsTablet: true,
        infoPlist: {
            UIBackgroundModes: ["remote-notification"]
        },
        bundleIdentifier: getUniqueIdentifier()
    },
    android: {
        googleServicesFile: process.env.GOOGLE_SERVICES_JSON ?? "./google-services.json",
        softwareKeyboardLayoutMode: "resize",
        adaptiveIcon: {
            foregroundImage: "./src/assets/images/adaptive-icon.png",
            backgroundColor: "#ffffff"
        },
        package: getUniqueIdentifier(),
        versionCode: 62
    },
    web: {
        bundler: "metro",
        output: "static",
        favicon: "./src/assets/images/favicon.png"
    },
    plugins: [
        "@react-native-firebase/app",
        "@react-native-firebase/messaging",
        "expo-router",
        "expo-localization",
        [
            "expo-build-properties",
            {
                android: {
                    usesCleartextTraffic: true
                }
            }
        ],
        [
            "expo-splash-screen",
            {
                backgroundColor: "ffffff",
                image: "./src/assets/images/splash-icon-light.png",
                dark: {
                    image: "./src/assets/images/splash-icon-dark.png",
                    backgroundColor: "#1a1a1f"
                },
                imageWidth: 200
            }
        ]
    ],
    experiments: {
        typedRoutes: true
    },
    extra: {
        router: {
            origin: false
        },
        eas: {
            projectId: "bd6c3fcd-4517-4f6e-a10d-5172653e8437"
        },
        APP_VARIANT: process.env.APP_VARIANT || "development"
    },
    owner: "cybersecuritylab"
}