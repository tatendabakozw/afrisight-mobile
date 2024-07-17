import React from "react";
import Welcome from "@/assets/svgs/onboarding/Welcome";
import HowItWorks from "@/assets/svgs/onboarding/HowItWorks";
import GetStarted from "@/assets/svgs/onboarding/GetStarted";
import { useCallback } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from "react-native";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import OnBoardingListItem from "@/components/on-boarding/OnBoardingListItem";
import OnBoardingPaginationElement from "@/components/on-boarding/OnBoardingPaginationElement";
import OnBoardingButton from "@/components/on-boarding/OnBoardingButton";
import tw from "twrnc";
import Colors from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const pages = [
  {
    text: "Welcome to Gig",
    desc: "Discover a gateway to thrilling experiences in mystery shopping and product mapping. Join us for exciting opportunities to explore and evaluate diverse products and services.",
    image: <Welcome />,
  },
  {
    text: "How it works",
    desc: "Embark on your mystery shopping and product mapping journey with ease. Explore diverse opportunities and experiences waiting for you.",
    image: <HowItWorks />,
  },
  {
    text: "Get started",
    desc: "Create your profile and embark on a thrilling adventure. Start exploring exciting opportunities and challenges. Customize your experience and unlock new possibilities.",
    image: <GetStarted />,
  },
];

const index = () => {
  const insets = useSafeAreaInsets();
  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);
  const flatListRef = useAnimatedRef<
    Animated.FlatList<{
      text: string;
      image: any;
    }>
  >();

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      flatListIndex.value = viewableItems[0].index ?? 0;
    },
    []
  );
  const scrollHandle = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  const renderItem = useCallback(
    ({
      item,
      index,
    }: {
      item: { text: string; image: any; desc: string };
      index: number;
    }) => {
      return <OnBoardingListItem item={item} index={index} x={x} />;
    },
    [x]
  );

  return (
    <ImageBackground
      source={require("../../assets/images/onboarding/background.png")}
      style={[tw`py-4`, styles.container, { paddingTop: insets.top }]}
    >
      <TouchableOpacity
        onPress={() => {
          flatListRef?.current?.scrollToIndex({
            index: pages.length - 1,
          });
        }}
        style={tw`self-end bg-white rounded-full mx-4 `}
      >
        <Text
          style={tw`text-xs font-semibold text-[${Colors.light.primary}] px-2 py-1`}
        >
          SKIP
        </Text>
      </TouchableOpacity>
      <Animated.FlatList
        ref={flatListRef}
        onScroll={scrollHandle}
        horizontal
        scrollEventThrottle={16}
        pagingEnabled={true}
        data={pages}
        keyExtractor={(_, index) => index.toString()}
        bounces={false}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
      />
      <View style={styles.bottomContainer}>
        <OnBoardingPaginationElement length={pages.length} x={x} />
        <OnBoardingButton
          currentIndex={flatListIndex}
          length={pages.length}
          flatListRef={flatListRef}
        />
      </View>
    </ImageBackground>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
