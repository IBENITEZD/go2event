import { Pressable, Text, StyleSheet } from "react-native";

interface CustomButtonProps {
  onPress: () => void;
  text: string;
  size?: "normal" | "small";
}

export default function CustomButton({
  onPress,
  text,
  size = "normal",
}: CustomButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        size === "small" && styles.smallButton,
      ]}
    >
      <Text style={[styles.text, size === "small" && styles.smallText]}>
        {text}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  pressed: {
    backgroundColor: "#45a049",
    transform: [{ scale: 0.96 }],
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  smallText: {
    fontSize: 14,
  },
});
