import { StyleSheet, View } from "react-native";
import GigItem from "./GigItem";
import { Survey } from "@/utils/types";
import Separator from "@/design-system/Separator";
import { EndOfListCaption } from "../captions";

const AllGigs = (props: {
  gigs: Survey[]
}) => {
  return (
    <View
      style={{
        flex: 1,
        paddingBottom: 20
      }}
    >
      {props.gigs.map((item, index) => (
        <>
          <GigItem key={index} {...item} />
          <Separator key={`${index}-separator`} />
        </>

      ))}
      <EndOfListCaption />
    </View>
  );
};

export default AllGigs;

const styles = StyleSheet.create({});
