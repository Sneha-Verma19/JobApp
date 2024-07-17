import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import JobCard from '../Components/JobCard'; // Assuming you have a JobCard component
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const JobsScreen = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchJobs();
  }, [page]);

  const fetchJobs = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`https://testapi.getlokalapp.com/common/jobs?page=${page}`);
      const fetchedJobs = response.data.results;
      console.log('Fetched jobs:', fetchedJobs);
      setJobs(prevJobs => [...prevJobs, ...fetchedJobs]);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError('Error fetching jobs');
    } finally {
      setLoading(false);
    }
  };

  const renderJob = ({ item }) => {
    if (!item) {
      console.warn('Job item is undefined');
      return null;
    }

    return <JobCard job={item} />;
  };

  const loadMoreJobs = () => {
    if (!loading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <View style={styles.container}>
      {/* {loading && <ActivityIndicator size="large" color="#0000ff" />} */}
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={jobs}
          renderItem={renderJob}
          keyExtractor={(item, index) => item.id}
          onEndReached={loadMoreJobs}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading ? <ActivityIndicator size="large" color="#2a9df4" /> : null}
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
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: hp(2),
  },
});

export default JobsScreen;
