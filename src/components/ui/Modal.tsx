import {
  Modal as RNModal,
  View,
  ModalProps,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native"
import React from "react"

type Props = ModalProps & {
  isOpen: boolean
  withInput?: boolean
  onClose: () => void
}

export default function Modal({
  isOpen,
  onClose,
  withInput,
  children,
  ...rest
}: Props) {
  const content = withInput ? (
    <TouchableWithoutFeedback onPress={onClose}>
      <KeyboardAvoidingView
        className="items-center justify-center flex-1 px-3 bg-black/60"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {children}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  ) : (
    <TouchableWithoutFeedback onPress={onClose}>
      <View className="items-center justify-center flex-1 px-3 bg-black/60">
        {children}
      </View>
    </TouchableWithoutFeedback>
  )
  return (
    <RNModal
      visible={isOpen}
      transparent={true}
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
      {...rest}
    >
      {content}
    </RNModal>
  )
}
