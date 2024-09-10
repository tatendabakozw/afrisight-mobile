import { View, TouchableOpacity, FlatList, Image } from "react-native";
import Text from "@/components/ui/Text";
import Colors from "@/constants/Colors";
import { Fonts, Typography } from "@/constants/typography";
import tw from "twrnc";
import { useState } from "react";
import { SF_ICONS } from "@/constants/icons";

const search_filters = [
    { name: "Shopping", _id: "shopping", icon: SF_ICONS.shopping_filled },
    { name: "Commercial", _id: "all", icon: SF_ICONS.commercial_filled },
    { name: "Pharmaceutical", _id: "inprogress", icon: SF_ICONS.pill_filled },
    { name: "Knowledge", _id: "saved", icon: SF_ICONS.knowledge_filled },
    { name: "Social", _id: "Experiments", icon: SF_ICONS.social_filled },
];

export default function DiscoverGigsSection(props: {
    onSelectChange?: (value: string) => void
}) {
    const [selected_option, setSelectedOption] = useState(search_filters[0]);

    const renderSearchFilter = ({ item }: { item: { _id: string; name: string, icon: any } }) => (
        <TouchableOpacity
            onPress={() => setSelectedOption(item)}
            activeOpacity={0.7}
            style={[
                tw`py-2 rounded-full`,
                {
                    backgroundColor:
                        selected_option._id === item._id
                            ? Colors.design.surfaceOnSurface
                            : Colors.design.surface,
                    borderColor:
                        selected_option._id === item._id
                            ? Colors.design.white
                            : Colors.design.separator,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 6,
                    paddingHorizontal: 10,
                    paddingRight: 20
                },
            ]}
        >
            <Text style={{
                fontFamily: Fonts.Inter_600SemiBold,
                fontSize: Typography.body,
                color: Colors.design.highContrastText
            }}>
                {item.icon}
            </Text>
            <Text
                style={{
                    fontSize: Typography.body,
                    fontFamily:
                        selected_option._id === item._id
                            ? Fonts.Inter_700Bold
                            : Fonts.Inter_600SemiBold,
                    color:
                        selected_option._id === item._id
                            ? Colors.design.highContrastText
                            : Colors.design.text,
                }}
            >
                {item.name}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 10,
                    paddingHorizontal: 20,
                }}
            >
                <Text
                    style={{
                        fontSize: Typography.heading,
                        fontFamily: Fonts.Inter_700Bold,
                        color: Colors.design.highContrastText,
                    }}
                >
                    Discover gigs
                </Text>

            </View>
            <FlatList
                data={search_filters}
                renderItem={renderSearchFilter}
                keyExtractor={(item) => item._id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 20,
                    gap: 8,
                }}
                style={{
                    marginBottom: 20,
                }}
            />
        </View>
    );
}