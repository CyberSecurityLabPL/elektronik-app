import { Button } from "react-native"
import * as Clipboard from 'expo-clipboard'
import { catchError } from '@/utils/catchError'
import { toast } from 'sonner-native'

export const CopyToClipboard = ({ content }: { content: string }) => {
    const handleCopy = async () => {
        const [error] = await catchError(Clipboard.setStringAsync(content))
        if (error) {
            console.error(error)
            toast.error('Failed to copy to clipboard')
        }
    }

    return (
        <Button title="Copy" onPress={handleCopy} />
    )
}