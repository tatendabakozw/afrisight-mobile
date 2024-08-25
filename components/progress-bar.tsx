import Colors from "@/constants/Colors";
import { View } from "react-native";
import Animated, { interpolate } from "react-native-reanimated";
import tw from "twrnc";

type Props = {
    progress: number; // progress is now in percentage (0 to 100)
};

const ProgressBar = ({ progress }: Props) => {
    // ... existing code ...
    const animatedWidth = interpolate(progress, [0, 100], [0, 100]);
    return (
        <View style={tw`w-full h-2 bg-zinc-100 rounded-full`}>
            <Animated.View
                style={[
                    tw`bg-[${Colors.light.primary}] h-full rounded-full`,
                    { width: `${animatedWidth}%` },
                ]}
            />
        </View>
    );
};
