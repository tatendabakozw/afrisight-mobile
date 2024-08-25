import { RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import AllGigs from "@/components/git-item/AllGigs";
import TabsWithChat from "@/layouts/TabsWithChat";
import Colors from "@/constants/Colors";
import Text from "@/components/ui/Text";
import { Fonts, Typography } from "@/constants/typography";
import useAxiosInstance from "../utils/axios";
import AnimatedRefreshControl from "@/components/util/refresh-control";

const search_filters = [
  { name: "All", _id: "all" },
  { name: "In progress", _id: "inprogress" },
  { name: "New", _id: "new" },
  { name: "Saved", _id: "saved" },
];

const Gigs = () => {
  const [selected_option, setSelectedOption] = useState(search_filters[0]);
  const [gigs, setGigs] = useState([]);
  const axiosInstance = useAxiosInstance();
  const [refreshing, setRefreshing] = useState(false);

  const onFetchData = () => {
    axiosInstance
      .get("/gigs")
      .then((res) => {
        setGigs(res.data.gigs);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onRefresh = async () => {
    console.log("Refreshing");
    setRefreshing(true);
    await onFetchData();
    setRefreshing(false);
  };

  useEffect(() => {
    onFetchData();
  }, []);

  return (
    <TabsWithChat>
      <ScrollView
        style={{ flex: 1, backgroundColor: Colors.design.white }}
        contentContainerStyle={{
          flex: 1,
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <View
          style={{
            paddingHorizontal: 16,
            flexDirection: "row",
            gap: 8,
          }}
        >
          {search_filters.map((item) => (
            <TouchableOpacity
              onPress={() => setSelectedOption(item)}
              activeOpacity={0.7}
              style={[
                tw`px-4 py-2 rounded-full`,
                {
                  backgroundColor:
                    selected_option._id === item._id
                      ? Colors.design.highContrastText
                      : Colors.design.interactiveSurface,
                  borderColor:
                    selected_option._id === item._id
                      ? Colors.design.white
                      : Colors.design.separator,
                },
              ]}
              key={item._id}
            >
              <Text
                style={{
                  fontSize: Typography.buttonText,
                  fontFamily:
                    selected_option._id === item._id
                      ? Fonts.Inter_600SemiBold
                      : Fonts.Inter_400Regular,
                  color:
                    selected_option._id === item._id
                      ? Colors.design.white
                      : Colors.design.text,
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={tw`h-full pt-4 pb-16`}>
          <AllGigs gigs={gigs} />
        </View>
      </ScrollView>
    </TabsWithChat>
  );
};

export default Gigs;

const styles = StyleSheet.create({});
