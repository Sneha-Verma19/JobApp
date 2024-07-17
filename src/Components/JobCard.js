import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as SuccessAnimation from '../Assests/animation/success.json';
import * as ErrorAnimation from '../Assests/animation/error.json';
import LottieView from 'lottie-react-native';

const JobCard = ({ job }) => {
  const navigation = useNavigation();
  const [bookmarked, setBookmarked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [lottieVisible, setLottieVisible] = useState(false);
  const [animationJson, setAnimationJson] = useState(null);

  useEffect(() => {
    checkIfBookmarked();
  }, []);

  const checkIfBookmarked = async () => {
    const bookmarks = await AsyncStorage.getItem('bookmarkedJobs');
    if (bookmarks) {
      const parsedBookmarks = JSON.parse(bookmarks);
      const isBookmarked = parsedBookmarks.some(item => item.id === job.id);
      setBookmarked(isBookmarked);
    }
  };

  const handlePress = () => {
    navigation.navigate('JobDetails', { job });
  };

  const toggleBookmark = async () => {
    const bookmarks = await AsyncStorage.getItem('bookmarkedJobs');
    let updatedBookmarks = [];
    let message = '';

    if (bookmarks) {
      updatedBookmarks = JSON.parse(bookmarks);
      if (bookmarked) {
        updatedBookmarks = updatedBookmarks.filter(item => item.id !== job.id);
        message = 'Removed from bookmarks';
        setAnimationJson(ErrorAnimation); // Set error animation
      } else {
        updatedBookmarks.push(job);
        message = 'Bookmarked successfully';
        setAnimationJson(SuccessAnimation); // Set success animation
      }
    } else {
      updatedBookmarks.push(job);
      message = 'Bookmarked successfully';
      setAnimationJson(SuccessAnimation); // Set success animation
    }

    await AsyncStorage.setItem('bookmarkedJobs', JSON.stringify(updatedBookmarks));
    setBookmarked(!bookmarked); // Toggle bookmarked state
    setModalMessage(message); // Set modal message
    setLottieVisible(true); // Show Lottie animation
    setModalVisible(true); // Show modal
  };

  const onAnimationFinish = () => {
    setLottieVisible(false); // Hide Lottie animation after it finishes playing
    setModalVisible(false); // Close modal after animation finishes
  };

  if (!job || !job.title) {
    return null; // Return null if job or job.title is not present
  }

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View style={styles.headerRow}>
        <Text style={styles.company}>{job?.company_name}</Text>
        <TouchableOpacity onPress={toggleBookmark}>
          <Icon name={bookmarked ? "bookmark" : "bookmark-border"} size={wp(7)} color="#2a9bf4" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>{job.title}</Text>
      <Text style={styles.location}>{job?.primary_details?.Place}</Text>
      <Text style={styles.detail}>{job?.primary_details?.Salary}</Text>
      <Text style={styles.detail}>{job?.whatsapp_no}</Text>

      {/* Modal for displaying bookmark message */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {lottieVisible && animationJson ? (
              <>
              <LottieView
                source={animationJson}
                autoPlay
                loop={false}
                style={styles.lottieAnimation}
                onAnimationFinish={onAnimationFinish}
                />
              <Text style={styles.modalText}>{modalMessage}</Text>
                </>
            ) : (
              <Text style={styles.modalText}></Text>
            )}
            <TouchableOpacity onPress={onAnimationFinish} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    padding: wp(5),
    margin: wp(2),
    borderRadius: wp(5),
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: wp(2),
  },
  company: {
    fontSize: wp(4),
    color: 'grey',
    fontWeight: '500',
  },
  title: {
    fontSize: wp(5),
    fontWeight: '400',
    marginBottom: wp(2),
    color: '#000000',
  },
  location: {
    fontSize: wp(4),
    fontWeight: '400',
    marginBottom: wp(2),
    color: 'grey',
  },
  detail: {
    fontSize: wp(4),
    fontWeight: '400',
    color: '#555',
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: wp(5),
    borderRadius: wp(5),
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    fontSize: wp(4.5),
    marginBottom: wp(4),
    textAlign: 'center',
    color: '#000000',
  },
  modalButton: {
    paddingVertical: wp(3),
    paddingHorizontal: wp(5),
    backgroundColor: '#0080ff',
    borderRadius: wp(3),
    marginTop: wp(2),
  },
  modalButtonText: {
    fontSize: wp(4.5),
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  lottieAnimation: {
    width: wp(20),
    height: wp(20),
  },
});

export default JobCard;
