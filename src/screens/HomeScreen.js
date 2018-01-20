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
    fontFamily: 'AmiriQuran',
    fontSize: 24,
    color: '#333'
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
    justifyContent: 'center',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  header: {
    backgroundColor: '#3cb385',
  },
});

class HomeScreen extends Component {
  state = {
    searchKey: '',
  }

  componentWillMount() {
    this.props.loadChapters();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { chapters, isFetching } = nextProps;
    const { searchKey } = nextState;
    if (chapters === this.props.chapters && isFetching === this.props.isFetching && searchKey === this.state.nextState) {
      return false;
    }
    return true;
  }

  renderChapterList(item, navigation) {
    const { name_simple, name_arabic, verses_count, translated_name, chapter_number, bismillah_pre } = item;
    const params = { id: chapter_number, bismillah_pre, name_arabic };
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Chapter', params)}>
        <View style={styles.listContainer}>
          <View style={styles.leftContainer}>
            <Text style={styles.titleTxt}>{name_simple}</Text>
            <Text style={styles.subTxt}>{translated_name.name} ({verses_count})</Text>
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.arabicTxt}>{name_arabic}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { chapters, navigation, isFetching } = this.props;
    const { searchKey } = this.state;
    let filteredChapters = chapters.filter((chapter) => {
      return chapter.name_simple.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1;
    });

    console.log()

    return (
      <Container>
        <Header
          searchBar
          rounded
          style={styles.header}
          androidStatusBarColor="#5acea1">
          <Item>
            <Icon active name="search" />
            <Input 
              placeholder="Search"
              onChangeText={(text) => this.setState({ searchKey: text })}
            />
          </Item>
        </Header>
        {isFetching && <Spinner color={'#3cb385'} />}
        <FlatList 
          data={filteredChapters}
          renderItem={({ item }) => this.renderChapterList(item, navigation)}
          keyExtractor={() => Math.random()}
          initialNumToRender={115}
          disableVirtualization={true}
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