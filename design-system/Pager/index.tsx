import { View } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import Animated, {
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';


import { Dot } from './dot';
import Colors from '@/constants/Colors';

const ACTIVE_COLOR = Colors.design.accent;

type DotsProps = {
    count: number;
    activeIndex: number;
};

const DOTS_SIZE = 10;
const DOTS_GAP = 20;

export const Dots = ({ count, activeIndex }: DotsProps) => {
    const rContainerStyle = useAnimatedStyle(() => {
        const width =
            DOTS_SIZE * (activeIndex + 1) + DOTS_GAP * (activeIndex + 1);

        return {
            width: withSpring(width, {
                mass: 0.6,
            }),
        };
    }, [activeIndex]);

    return (
        <View
            style={{
                flexDirection: 'row',
                gap: DOTS_GAP,
            }}
        >
            {new Array(count).fill(0).map((_, index) => {
                return (
                    <Dot
                        key={index}
                        index={index}
                        activeIndex={activeIndex}
                        size={DOTS_SIZE}
                    />
                );
            })}
            <Animated.View
                style={[
                    {
                        left: -DOTS_GAP / 2,
                        height: DOTS_SIZE * 3,
                        top: -DOTS_SIZE,
                        borderRadius: DOTS_SIZE * 2,
                        borderCurve: 'continuous',
                        position: 'absolute',
                        backgroundColor: ACTIVE_COLOR,
                        zIndex: -1,
                    },
                    rContainerStyle,
                ]}
            />
        </View>
    );
};