import React, { Component } from 'react';
import { Container, Header, Item, Icon, Input, Spinner } from 'native-base'
import { connect } from 'react-redux';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import * as ChapterActions from '../redux/ducks/chapterRedux';

const styles = StyleSheet.create({
  titleTxt: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  arabicTxt: {
    fontFamily: 'quran',
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
});

class HomeScreen extends Component {
  componentWillMount() {
    this.props.loadChapters();
  }

  shouldComponentUpdate(nextProps) {
    const { chapters, isFetching } = nextProps;
    if (chapters === this.props.chapters && isFetching === this.props.isFetching) {
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
    );
  }

  render() {
    const { chapters, navigation, isFetching } = this.props;

    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon active name="search" />
            <Input placeholder="Search" />
          </Item>
        </Header>
        {isFetching && <Spinner color={'blue'} />}
        <FlatList 
          data={chapters}
          renderItem={({ item }) => this.renderChapterList(item, navigation)}
          keyExtractor={() => Math.random()}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  chapters: state.quran.chapters,
  isFetching: state.quran.isFetchingAllChapters,
})

const mapDispatchToProps = {
  loadChapters: ChapterActions.getAllChapter,
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);