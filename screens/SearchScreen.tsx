import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useRoute, useNavigation } from '@react-navigation/native';

const SearchScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { query } = route.params || {};
  const [searchQuery, setSearchQuery] = useState(query || '');
  const [videos, setVideos] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState('most popular');

  const fetchVideos = async (searchQuery: string) => {
    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          q: searchQuery,
          type: 'video',
          order: sortBy === 'most popular' ? 'viewCount' : 'date',
          key: 'AIzaSyB_-Txmf7tcvNpM91Eh9IArtqcicN45IWc',
        }
      });
      setVideos(response.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      fetchVideos(searchQuery);
    }
  }, [searchQuery, sortBy]);

  const handleSearch = () => {
    navigation.navigate('Search', { query: searchQuery });
  };

  const handleVideoPress = (video) => {
    navigation.navigate('VideoDetails', { video });
  };

  return (
    <View style={styles.container}>
      {searchQuery ? (
        <View>
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
            <Text style={styles.resultsText}>{`${videos.length} results found for "${searchQuery}"`}</Text>
            <View style={styles.sortContainer}>
              <Text style={styles.sortLabel}>Sort by:</Text>
              <TouchableOpacity onPress={() => setSortBy('most popular')}>
                <Text style={[styles.sortOption, sortBy === 'most popular' && styles.selectedSortOption]}>Most popular</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSortBy('newest')}>
                <Text style={[styles.sortOption, sortBy === 'newest' && styles.selectedSortOption]}>Newest</Text>
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView style={styles.scrollContainer}>
            {videos.map(video => (
              <TouchableOpacity
                key={video.id.videoId}
                style={styles.videoContainer}
                onPress={() => handleVideoPress(video)}
              >
                <Image
                  source={{ uri: video.snippet.thumbnails.high.url }}
                  style={styles.videoThumbnail}
                />
                <Text style={styles.videoTitle}>{video.snippet.title}</Text>
                <Text style={styles.videoDescription}>{video.snippet.description}</Text>
                <Text style={styles.videoDate}>{new Date(video.snippet.publishedAt).toLocaleDateString()}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ) : (
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
      )}
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
    marginBottom: 16,
    marginTop: 24
  },
  resultsText: {
    fontSize: 10,
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  sortLabel: {
    fontSize: 12,
    marginRight: 8,
  },
  sortOption: {
    fontSize: 12,
  },
  selectedSortOption: {
    fontWeight: 'bold',
  },
  scrollContainer: {
    flex: 1,
  },
  videoContainer: {
    marginBottom: 24,
  },
  videoThumbnail: {
    width: '100%',
    height: 180,
    borderRadius: 8,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  videoDescription: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  videoDate: {
    fontSize: 14,
    color: '#666',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    height: 40,
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
});

export default SearchScreen;
