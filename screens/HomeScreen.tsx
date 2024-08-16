import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


const HomeScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [videos, setVideos] = useState<any[]>([]);
  
  const fetchVideos = async (query: string) => {
    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          q: query,
          type: 'video',
          key: process.env.API_KEY,
        }
      });
      setVideos(response.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVideos('React Native');
  }, []);

  const handleSearch = () => {
    navigation.navigate('Search', { query: searchQuery });
  };

  const handleVideoPress = (video) => {
    console.log(video)
    navigation.navigate('VideoDetails', { video });
  };

  const handleShowMore = (category: string) => {
    navigation.navigate('Search', { query: category });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Image
            source={require('../assets/icons/search-icon.svg')}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search videos"
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
          />
        </View>
        <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate('Settings')}>
          <Image
            source={require('../assets/icons/settings-icon.svg')}
            style={styles.settingsIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.sections}>
        {['React Native', 'React', 'TypeScript', 'JavaScript'].map((category) => (
          <View key={category} style={styles.section}>
            <View style={styles.sectionHeadingView}>
              <Text style={styles.sectionHeading}>{category}</Text>
              <TouchableOpacity onPress={() => handleShowMore(category)}>
                <Text style={styles.showMore}>Show more</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {videos.map(video => (
                <TouchableOpacity
                  key={video.id.videoId}
                  style={styles.videoContainer}
                  onPress={() => handleVideoPress(video)}
                >
                  <Image
                    source={{ uri: video.snippet.thumbnails.medium.url }}
                    style={styles.videoThumbnail}
                  />
                  <Text style={styles.videoTitle}>{video.snippet.title}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={styles.divider} />
          </View>
        ))}
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
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    height: 40,
    width: '85%',
    borderColor: '#2D3440',
    borderWidth: 2,
    paddingHorizontal: 8,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
  },
  settingsButton: {
    marginLeft: 16,
  },
  settingsIcon: {
    width: 24,
    height: 24,
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
    marginVertical: 8,
    fontSize: 14,
    color: '#333333',
    textAlign: 'center',
  },
  sections: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionHeadingView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  showMore: {
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  divider: {
    height: 4,
    backgroundColor: '#000000',
    marginVertical: 16,
    marginHorizontal: -16,
  },
});

export default HomeScreen;