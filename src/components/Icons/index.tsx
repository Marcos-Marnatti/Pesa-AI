import { Image, ImageSourcePropType, TouchableOpacity } from "react-native";

type Props = {
  icon: ImageSourcePropType;
  width: number;
  height: number;
  tintColor: string;
  onPress?: () => void;
}

export function Icons({ icon, width, height, tintColor, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}>
      <Image style={{ width: width, height: height, tintColor: tintColor }} source={icon} />
    </TouchableOpacity>
  );
}