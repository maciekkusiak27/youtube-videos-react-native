import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';

const HomeScreen = () => {
//   const [videos, setVideos] = useState<any[]>([]);

  const videos = [
    { id: { videoId: '1' }, snippet: { thumbnails: { medium: { url: 'https://via.placeholder.com/120' } }, title: 'React Native Video 1' } },
    { id: { videoId: '2' }, snippet: { thumbnails: { medium: { url: 'https://via.placeholder.com/120' } }, title: 'React Native Video 2' } },
    { id: { videoId: '3' }, snippet: { thumbnails: { medium: { url: 'https://via.placeholder.com/120' } }, title: 'React Native Video 2' } },
    { id: { videoId: '4' }, snippet: { thumbnails: { medium: { url: 'https://via.placeholder.com/120' } }, title: 'React Native Video 2' } },
    { id: { videoId: '5' }, snippet: { thumbnails: { medium: { url: 'https://via.placeholder.com/120' } }, title: 'React Native Video 2' } },
  ];
  
//   useEffect(() => {
//     const fetchVideos = async () => {
//       try {
//         const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
//           params: {
//             part: 'snippet',
//             q: 'React Native',
//             type: 'video',
//             key: 'YOUR_YOUTUBE_API_KEY',
//           }
//         });
//         setVideos(response.data.items);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchVideos();
//   }, []);

  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search videos"
      />
      <TouchableOpacity style={styles.settingsButton}>
        <Image source={require('../assets/icons/settings-icon.svg')} style={styles.settingsIcon} />
      </TouchableOpacity>
    </View>

    <View style={styles.sections}>
      <View style={styles.section}>
        <View style={styles.sectionHeadingView}>
        <Text style={styles.sectionHeading}>React Native</Text>
        <Text style={styles.showMore}>Show more</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {videos.map(video => (
            <View key={video.id.videoId} style={styles.videoContainer}>
              <Image
                source={{ uri: video.snippet.thumbnails.medium.url }}
                style={styles.videoThumbnail}
              />
              <Text style={styles.videoTitle}>{video.snippet.title}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeading}>React</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {videos.map(video => (
            <View key={video.id.videoId} style={styles.videoContainer}>
              <Image
                source={{ uri: video.snippet.thumbnails.medium.url }}
                style={styles.videoThumbnail}
              />
              <Text style={styles.videoTitle}>{video.snippet.title}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeading}>TypeScript</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {videos.map(video => (
            <View key={video.id.videoId} style={styles.videoContainer}>
              <Image
                source={{ uri: video.snippet.thumbnails.medium.url }}
                style={styles.videoThumbnail}
              />
              <Text style={styles.videoTitle}>{video.snippet.title}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
      marginTop:16
    },
    searchInput: {
      flex: 1,
      height: 40,
      borderColor: '#ddd',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    settingsButton: {
      marginLeft: 16,
    },
    settingsIcon: {
      width: 24,
      height: 24,
    },
    scrollContainer: {
      marginBottom: 16,
    },
    videoContainer: {
      marginRight: 16,
      alignItems: 'center',
    },
    videoThumbnail: {
      width: 120,
      height: 90,
      borderRadius: 8,
    },
    videoTitle: {
      marginTop: 8,
      fontSize: 14,
      color: '#333',
      textAlign: 'center',
    },
    sections: {
      flex: 1,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    sectionHeading: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    sectionHeadingView:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    showMore:{
        fontSize: 14,
      }
  });
  
  export default HomeScreen;
