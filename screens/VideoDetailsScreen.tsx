import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Video, { VideoRef } from 'react-native-video';
import { useNavigation } from '@react-navigation/native';

const VideoDetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { video } = route.params;

  const videoRef = useRef<VideoRef>(null);
  const videoUrl = `https://www.youtube.com/watch?v=${video.id.videoId}`;

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
        <Image source={require('../assets/icons/leftarrow-icon.svg')} style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.title}>{video.snippet.title}</Text>
      <Image source={{ uri: video.snippet.thumbnails.high.url }} style={styles.thumbnail} />

      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.description}>{video.snippet.description}</Text>

        {/* <Video 
          source={{ uri: videoUrl }} 
          ref={videoRef}
          onBuffer={onBuffer}
          onError={onError}
          controls={true}
          style={styles.videoPlayer}
        /> */}
      </ScrollView>
    </View>
  );
};

const onBuffer = (buffer) => {
  console.log('Buffering', buffer);
};

const onError = (error) => {
  console.error('Video Error', error);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  backButton: {
    marginBottom: 16,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  thumbnail: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
  videoPlayer: {
    width: '100%',
    height: 200,
  },
  scrollContainer: {
    flex: 1,
  },
});

export default VideoDetailsScreen;
