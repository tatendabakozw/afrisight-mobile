import Colors from '@/constants/Colors';
import type { SharedValue } from 'react-native-reanimated';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

type DotProps = {
  index: number;
  activeIndex: number;
  size: number;
};

export const Dot: React.FC<DotProps> = ({ index, activeIndex, size }) => {
  const isDotActive = index <= activeIndex;

  return (
    <Animated.View
      style={[
        {
          width: size,
          height: size,
          backgroundColor: isDotActive ? Colors.design.white : Colors.design.surfaceOnSurface,
          borderRadius: size / 2,
        },
      ]}
    />
  );
};