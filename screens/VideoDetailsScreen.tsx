import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Video, {VideoRef} from 'react-native-video';
import { Colors } from '../constants/colors';

const VideoDetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { video } = route.params; 

  const [activeTab, setActiveTab] = useState('Details');
  const [notes, setNotes] = useState<string[]>([]);
  const [newNote, setNewNote] = useState<string>('');

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const storedNotes = await AsyncStorage.getItem(`notes_${video.id.videoId}`);
        if (storedNotes) {
          setNotes(JSON.parse(storedNotes));
        }
      } catch (error) {
        console.error('Failed to fetch notes', error);
      }
    };

    fetchNotes();
  }, [video.id.videoId]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleAddNote = async () => {
    if (newNote.trim()) {
      const updatedNotes = [...notes, newNote.trim()];
      setNotes(updatedNotes);
      setNewNote('');

      try {
        await AsyncStorage.setItem(`notes_${video.id.videoId}`, JSON.stringify(updatedNotes));
      } catch (error) {
        console.error('Failed to save notes', error);
      }
    }
  };

  const statistics = {
    views: video.statistics.viewCount,
    likes: video.statistics.likeCount,
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
        <Image source={require('../assets/icons/leftarrow-icon.svg')} style={styles.backIcon} />
      </TouchableOpacity>
      {/* <Video/> */}
      <Text style={styles.title}>{video.snippet.title}</Text>

      <View style={styles.channelContainer}>
        <Image source={require('../assets/icons/person-icon.svg')} style={styles.channelIcon} />
        <Text style={styles.channelName}>{video.snippet.channelTitle}</Text>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Details' && styles.activeTab]}
          onPress={() => handleTabChange('Details')}
        >
          <Text style={styles.tabText}>Details</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Notes' && styles.activeTab]}
          onPress={() => handleTabChange('Notes')}
        >
          <Text style={styles.tabText}>Notes</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer}>
        {activeTab === 'Details' && (
          <View style={styles.detailsContainer}>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.description}>{video.snippet.description}</Text>
          </View>
        )}
        {activeTab === 'Notes' && (
          <View style={styles.notesContainer}>
            <TextInput
              style={styles.noteInput}
              placeholder="Write a note..."
              value={newNote}
              onChangeText={setNewNote}
            />
            <Button title="Add Note" onPress={handleAddNote} />
            {notes.map((note, index) => (
              <View key={index} style={styles.noteItem}>
                <Text style={styles.noteText}>{note}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <View style={styles.statisticsContainer}>
        <View style={styles.statItem}>
          <Image source={require('../assets/icons/views-icon.svg')} style={styles.statIcon} />
          <Text style={styles.statText}>{statistics.views}</Text>
        </View>
        <View style={styles.statItem}>
          <Image source={require('../assets/icons/likes-icon.svg')} style={styles.statIcon} />
          <Text style={styles.statText}>{statistics.likes}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
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
  channelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  channelIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  channelName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tab: {
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: Colors.primary,
  },
  tabText: {
    fontSize: 16,
  },
  scrollContainer: {
    flex: 1,
  },
  detailsContainer: {
    marginBottom: 16,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: Colors.text, 
  },
  notesContainer: {
    marginBottom: 16,
  },
  noteInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  noteItem: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  noteText: {
    fontSize: 16,
  },
  statisticsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.secondary, 
    padding: 8,
    borderRadius: 15,
  },
  statIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  statText: {
    fontSize: 16,
    color: Colors.white,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default VideoDetailsScreen;
