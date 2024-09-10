import { FlatList, StyleSheet, View } from "react-native";
import GigItem from "./GigItem";
import Separator from "@/design-system/Separator";
import { EmptyStateCaption, EndOfListCaption } from "../captions";
import { Survey } from "@/types";

const GigList = (props: {
  gigs?: {
    surveys: Survey[]
  }
}) => {
  return (
    <View style={{ flex: 1, paddingBottom: 20 }}>
      <FlatList
        data={props.gigs?.surveys}
        renderItem={({ item }: { item: Survey }) => (
          <>
            <GigItem {...item} />
            <Separator />
          </>
        )}
        keyExtractor={(item: Survey, index: number) => index.toString()}
        ListFooterComponent={<EndOfListCaption />}
        ListEmptyComponent={<EmptyStateCaption />}
      />
    </View>
  );
};

export default GigList;

const styles = StyleSheet.create({});
