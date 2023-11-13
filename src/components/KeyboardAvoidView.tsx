import React, { PropsWithChildren, useEffect, useState } from "react";
import {
  Platform,
  Animated,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  EmitterSubscription,
  TouchableWithoutFeedback,
} from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { useKeyboard } from "@react-native-community/hooks";

export default function KeyboardShift(props: PropsWithChildren<{}>) {
  const { children } = props;
  const [shift] = useState(new Animated.Value(0));
  const [didShowListener, setDidShowListener] =
    useState<EmitterSubscription | null>();
  const [didHideListener, setDidHideListener] =
    useState<EmitterSubscription | null>();
  const keyboard = useKeyboard();

  useEffect(() => {
    setDidShowListener(
      Keyboard.addListener("keyboardDidShow", handleKeyboardDidShow)
    );
    setDidHideListener(
      Keyboard.addListener("keyboardDidHide", handleKeyboardDidHide)
    );
    return () => {
      if (didShowListener) {
        didShowListener.remove();
      }
      if (didHideListener) {
        didHideListener.remove();
      }
    };
  }, []);

  const handleKeyboardDidShow = () => {
    const { height: windowHeight } = Dimensions.get("window");
    const keyboardHeight = keyboard.keyboardHeight;
    const currentlyFocusedInputRef = TextInput.State.currentlyFocusedInput();
    currentlyFocusedInputRef.measure((x, y, width, height, pageX, pageY) => {
      const fieldHeight = height;
      const fieldTop = pageY;
      const gap = windowHeight - keyboardHeight - (fieldTop + fieldHeight);
      if (gap >= 0) {
        return;
      }
      Animated.timing(shift, {
        toValue: gap,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleKeyboardDidHide = () => {
    Animated.timing(shift, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  if (Platform.OS === "android") {
    return (
      <Animated.View
        style={[styles.container, { transform: [{ translateY: shift }] }]}
      >
        {children}
      </Animated.View>
    );
  }
  
  const headerHeight = useHeaderHeight();
  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={() => {
        Keyboard?.dismiss();
      }}
    >
      <KeyboardAvoidingView
        keyboardVerticalOffset={headerHeight + 50}
        style={styles.container}
        behavior={"padding"}
      >
        {children}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});