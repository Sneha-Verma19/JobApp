import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {Linking} from 'react-native'

const JobDetailsScreen = () => {
  const route = useRoute();
  const job = route.params.job;

  const handleCallHR = () => {
    const hrNumber = job.whatsapp_no || job.custom_link.replace('tel:', ''); // Prioritize WhatsApp if available
    Linking.openURL(`tel:${hrNumber}`); // Open phone dialer with HR number
  };

  return (
    <ScrollView style={{ flex: 1, padding: wp(5) }}>
      <Text style={{ fontSize: wp(6), fontWeight: '500', marginBottom: wp(2.5), color: 'black' }}>{job.title}</Text>
      <Text style={{ fontSize: wp(4), marginBottom: wp(2.5), color: 'black' }}>{job.company_name}</Text>
      <Image source={{ uri: job.creatives[0].file }} style={{ width: '100%', height: hp(25), marginBottom: wp(2.5) }} resizeMode="cover" />

      <View style={{ marginBottom: wp(5) }}>
        <Text style={{ fontSize: wp(4.5), fontWeight: '500', marginBottom: wp(2.5), color: 'black' }}>Job Details:</Text>
        <Text style={{ fontSize: wp(4.5), fontWeight: '400', marginBottom: wp(2.5), color: 'black' }}>{job.contentV3.V3[0].field_value}</Text>
      </View>

      <View style={{ marginBottom: wp(5) }}>
        <Text style={{ fontSize: wp(4.5), fontWeight: '500', marginBottom: wp(2.5), color: 'black' }}>Primary Details:</Text>
        <Text style={{ fontSize: wp(4.5), fontWeight: '400', marginBottom: wp(2.5), color: 'black' }}>Place: {job.primary_details.Place}</Text>
        <Text style={{ fontSize: wp(4.5), fontWeight: '400', marginBottom: wp(2.5), color: 'black' }}>Salary: {job.primary_details.Salary}</Text>
        <Text style={{ fontSize: wp(4.5), fontWeight: '400', marginBottom: wp(2.5), color: 'black' }}>Job Type: {job.primary_details.Job_Type}</Text>
        <Text style={{ fontSize: wp(4.5), fontWeight: '400', marginBottom: wp(2.5), color: 'black' }}>Experience: {job.primary_details.Experience}</Text>
        <Text style={{ fontSize: wp(4.5), fontWeight: '400', marginBottom: wp(2.5), color: 'black' }}>Qualification: {job.primary_details.Qualification}</Text>
      </View>

      <View style={{ marginBottom: wp(5) }}>
        <Text style={{ fontSize: wp(4.5), fontWeight: '500', marginBottom: wp(2.5), color: 'black' }}>Contact Details:</Text>
        <Text style={{ fontSize: wp(4.5), fontWeight: '400', marginBottom: wp(2.5), color: 'black' }}>WhatsApp Number: {job.whatsapp_no}</Text>
        <Text style={{ fontSize: wp(4.5), fontWeight: '400', marginBottom: wp(1), color: 'black' }}>Phone Number: {job.custom_link.replace('tel:', '')}</Text>
      </View>

      <TouchableOpacity style={styles.callButton} onPress={handleCallHR}>
        <Text style={styles.callButtonText}>Call HR</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  callButton: {
    backgroundColor: '#007AFF',
    paddingVertical: wp(3),
    paddingHorizontal: wp(5),
    borderRadius: wp(2),
    alignItems: 'center',
    marginBottom: wp(10)
  },
  callButtonText: {
    fontSize: wp(4.5),
    color: '#ffffff',
    fontWeight: '500',
  },
});

export default JobDetailsScreen;
