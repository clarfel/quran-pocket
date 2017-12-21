import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import * as ChapterActions from '../redux/ducks/chapterRedux';

const styles = StyleSheet.create({
  titleTxt: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  arabicTxt: {
    fontFamily: 'Uthmanic',
    fontSize: 24,
  },
  subTxt: {
    fontSize: 12,
  },
  listContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: 'silver',
  },
  leftContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  }
})

class HomeScreen extends Component {
  componentWillMount() {
    this.props.loadChapters();
  }

  shouldComponentUpdate(nextProps) {
    const { chapters } = nextProps;
    if (chapters === this.props.chapters) {
      return false;
    }
    return true;
  }

  renderChapterList(item, navigation) {
    const { number, englishName, englishNameTranslation, name, numberOfAyahs } = item;
    const params = { id: number };
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Chapter', params)}>
        <View style={styles.listContainer}>
          <View style={styles.leftContainer}>
            <Text style={styles.titleTxt}>{englishName}</Text>
            <Text style={styles.subTxt}>{englishNameTranslation} ({numberOfAyahs})</Text>
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.arabicTxt}>{name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const { chapters, navigation } = this.props;

    return (
      <FlatList 
        data={chapters}
        renderItem={({ item }) => this.renderChapterList(item, navigation)}
        keyExtractor={() => Math.random()}
      />
    );
  }
}

const mapStateToProps = state => ({
  chapters: state.quran.chapters,
})

const mapDispatchToProps = {
  loadChapters: ChapterActions.getAllChapter,
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);