import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import styles from "./nearbyjobs.style.js";

import { useRouter } from "expo-router";
import { COLORS } from "../../../constants";
import { useFetch } from "../../../hook/useFetchHook.js";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard.jsx";

const NearbyJobs = () => {
  const router = useRouter();

  // const isLoading = false;
  // const error = false;

  const { isLoading, error, data } = useFetch("search", {
    query: "React developer",
    num_pages: 1,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
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
          data?.map((job) => (
            <NearbyJobCard
              key={job?.job_id}
              job={job}
              handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default NearbyJobs;
