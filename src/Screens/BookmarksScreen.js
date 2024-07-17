import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import JobCard from '../Components/JobCard';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const BookmarksScreen = ({ navigation }) => {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBookmarkedJobs = async () => {
    const bookmarks = await AsyncStorage.getItem('bookmarkedJobs');
    if (bookmarks) {
      setBookmarkedJobs(JSON.parse(bookmarks));
    }
    setLoading(false);
  };

  const refreshData = useCallback(() => {
    loadBookmarkedJobs();
  }, []);

  useEffect(() => {
    loadBookmarkedJobs();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      refreshData();
    }, [])
  );

  const renderJob = ({ item }) => <JobCard job={item} />;

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : bookmarkedJobs.length === 0 ? (
        <Text style={styles.noBookmarksText}>No bookmarks yet.</Text>
      ) : (
        <FlatList
          data={bookmarkedJobs}
          renderItem={renderJob}
          keyExtractor={(item, index) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(4),
    backgroundColor: '#fff',
  },
  noBookmarksText: {
    color: 'grey',
    textAlign: 'center',
    marginTop: hp(2),
  },
});

export default BookmarksScreen;
