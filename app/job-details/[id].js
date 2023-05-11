import { Stack, useRouter, useSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import ScreenHeaderBtn from "../../components/common/header/ScreenHeaderBtn";
import About from "../../components/jobdetails/about/About";
import Company from "../../components/jobdetails/company/Company";
import Specifics from "../../components/jobdetails/specifics/Specifics";
import Tabs from "../../components/jobdetails/tabs/Tabs";
import { COLORS, SIZES, icons } from "../../constants";
import { dummyData } from "../../data/data";

const tabs = ["About", "Qualifications", "Responsibilities"];

const JobDetails = () => {
  const params = useSearchParams();
  const router = useRouter();

  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const isLoading = false;
  const error = false;

  const onRefresh = () => {};

  const displayTabContent = () => {
    switch (activeTab) {
      case "Qualifications":
        return (
          <Specifics
            title="Qualifications"
            points={dummyData[0].job_highlights?.Qualifications ?? ["N/A"]}
          />
        );
      case "About":
        return (
          <About info={dummyData[0].job_description ?? "No data provided"} />
        );
      case "Responsibilities":
        return (
          <Specifics
            title="Responsibilities"
            points={dummyData[0].job_highlights?.Responsibilities ?? ["N/A"]}
          />
        );
    }
  };

  // const { isLoading, error, data, refetch} = useFetch("job-details", {
  //   job_id: params.id,
  //   num_pages: 1,
  // });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension={"60%"}
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension={"60%"} />
          ),
          headerTitle: "",
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {isLoading ? (
          <ActivityIndicator size={"large"} color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : dummyData.length === 0 ? (
          <Text>No data</Text>
        ) : (
          <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
            <Company
              companyLogo={dummyData[0].employer_logo}
              jobTitle={dummyData[0].job_title}
              companyName={dummyData[0].employer_name}
              location={dummyData[0].job_country}
            />
            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            {displayTabContent()}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default JobDetails;
