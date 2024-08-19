import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import axios from "axios";
import { useRoute, useNavigation } from "@react-navigation/native";
import debounce from "lodash.debounce";
import { Colors } from "../constants/colors";
import { Video } from "../types/videoTypes";

const cache: { [key: string]: any[] } = {};

const SearchScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { query } = route.params || {};
  const [searchQuery, setSearchQuery] = useState(query || "");
  const [videos, setVideos] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState("most popular");
  const [isModalVisible, setModalVisible] = useState(false);

  const fetchVideos = async (query: string) => {
    if (cache[query]) {
      setVideos(cache[query]);
      return;
    }

    try {
      const response = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            part: "snippet",
            q: query,
            type: "video",
            order: sortBy === "Most popular" ? "viewCount" : "date",
            key: process.env.API_KEY,
          },
        }
      );

      const videoIds = response.data.items
        .map((item: any) => item.id.videoId)
        .join(",");

      const statsResponse = await axios.get(
        "https://www.googleapis.com/youtube/v3/videos",
        {
          params: {
            part: "statistics",
            id: videoIds,
            key: process.env.API_KEY,
          },
        }
      );

      const videosWithStats = response.data.items.map((video: any, index: number) => ({
        ...video,
        statistics: statsResponse.data.items[index].statistics,
      }));

      cache[query] = videosWithStats;
      setVideos(videosWithStats);
    } catch (error) {
      console.error(error);
    }
  };

  const debouncedFetchVideos = useCallback(
    debounce((query: string) => fetchVideos(query), 500),
    [sortBy]
  );

  useEffect(() => {
    if (searchQuery) {
      debouncedFetchVideos(searchQuery);
    }
  }, [searchQuery, debouncedFetchVideos, sortBy]);

  const handleSearch = () => {
    navigation.navigate("Search", { query: searchQuery });
  };

  const handleVideoPress = (video: Video) => {
    navigation.navigate("VideoDetails", { video });
  };

  const handleSortOptionChange = (option: string) => {
    setSortBy(option);
  };

  const handleConfirm = () => {
    if (searchQuery) {
      fetchVideos(searchQuery);
    }
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Sort records by</Text>
            <View style={styles.optionsContainer}>
              {[
                "Upload date: oldest",
                "Upload date: newest",
                "Most popular",
              ].map((option) => (
                <TouchableOpacity
                  key={option}
                  style={styles.optionContainer}
                  onPress={() => handleSortOptionChange(option)}
                >
                  <View
                    style={[
                      styles.radioButton,
                      sortBy === option && styles.radioButtonChecked,
                    ]}
                  >
                    {sortBy === option && (
                      <View style={styles.radioButtonInner} />
                    )}
                  </View>
                  <Text style={styles.sortOption}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirm}
            >
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Image
            source={require("../assets/icons/search-icon.svg")}
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
        {searchQuery ? (
          <Text
            style={styles.resultsText}
          >{`${videos.length} results found for "${searchQuery}"`}</Text>
        ) : null}
        <TouchableOpacity
          style={styles.sortContainer}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.sortLabel}>Sort by:</Text>
          <Text style={styles.sortValue}>{sortBy}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {videos.map((video) => (
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
            <Text style={styles.videoDescription}>
              {video.snippet.description}
            </Text>
            <Text style={styles.videoDate}>
              {new Date(video.snippet.publishedAt).toLocaleDateString()}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.white,
  },
  header: {
    marginBottom: 16,
    marginTop: 32,
  },
  resultsText: {
    fontSize: 14,
    marginBottom: 8,
  },
  sortContainer: {
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  sortLabel: {
    fontSize: 14,
    marginRight: 8,
    color: Colors.text,
  },
  sortValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.text,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    padding: 16,
    backgroundColor: Colors.primary,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: Colors.white,
  },
  optionsContainer: {
    marginBottom: 16,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  radioButtonChecked: {
    borderColor: Colors.white,
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.secondary,
  },
  sortOption: {
    fontSize: 16,
    color: Colors.white,
  },
  confirmButton: {
    backgroundColor: Colors.secondary,
    padding: 8,
    borderRadius: 15,
  },
  confirmButtonText: {
    color: Colors.white,
    textAlign: "center",
    fontWeight: "bold",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  videoContainer: {
    marginBottom: 24,
  },
  videoThumbnail: {
    width: "100%",
    height: 180,
    borderRadius: 8,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
  },
  videoDescription: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 4,
  },
  videoDate: {
    fontSize: 14,
    color: "#666",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
    height: 40,
    borderColor: Colors.secondary,
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

