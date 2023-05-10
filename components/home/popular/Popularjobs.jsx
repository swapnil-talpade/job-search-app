import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PopularJobCard from "../../common/cards/popular/PopularJobCard.jsx";
import styles from "./popularjobs.style.js";

import { useRouter } from "expo-router";
import { COLORS, SIZES } from "../../../constants";
// import { useFetch } from "../../../hook/useFetchHook.js";
import { dummyData } from "../../../data/data.js";
const Popularjobs = () => {
  const router = useRouter();

  const isLoading = false;
  const error = false;

  // const { isLoading, error, data } = useFetch("search", {
  //   query: "React developer",
  //   num_pages: 1,
  // });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size={"large"} color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList
            data={dummyData}
            keyExtractor={(item) => item?.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal={true}
            renderItem={({ item }) => <PopularJobCard item={item} />}
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
