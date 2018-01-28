import React, { Component } from 'react';
import { Container, Header, Item, Icon, Input, Spinner, Button, Right, CheckBox } from 'native-base'
import { connect } from 'react-redux';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import Modal from 'react-native-modal';
import * as ChapterActions from '../redux/ducks/chapterRedux';
import * as TranslationActions from '../redux/ducks/translationRedux';
import * as SettingActions from '../redux/ducks/settingRedux';

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
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    borderRadius: 2,
  },
  modalItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 4,
  },
  modalItemTxt: {
    marginLeft: 18, 
    fontSize: 18,
  },
  nightTheme: {
    backgroundColor: '#303030',
  },
  nightThemeTxt: {
    color: '#ececec',
  },
  nightThemeArabicTxt: {
    color: '#77bbb1',
  },
  nightThemeSubTxt: {
    color: '#9c9c9c',
  },
  nightThemeNavbar: {
    backgroundColor: '#36474f',
  },
  nightThemeBorder: {
    borderColor: '#333',
  }
});

class HomeScreen extends Component {
  state = {
    searchKey: '',
    isModalVisible: false,
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

  toggleModal() {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  translationAction() {
    const { translation } = this.props;
    if (translation) {
      this.props.setTranslation(false);
    } else {
      this.props.setTranslation(true);
    }
  }

  nightModeAction() {
    const { isNightMode } = this.props;
    if (isNightMode) {
      this.props.setNormalMode();
    } else {
      this.props.setNightMode();
    }
  }

  renderSettingModal() {
    const { translation, isNightMode } = this.props;

    return (
      <View style={styles.modalContent}>
        <TouchableOpacity
          onPress={() => this.translationAction()}>
          <View style={styles.modalItem}>
            <Switch
              value={translation}
              onValueChange={() => this.translationAction()}
            />
            <Text style={styles.modalItemTxt}>Translation</Text>     
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.nightModeAction()}>
          <View style={styles.modalItem}>
            <Switch
              value={isNightMode}
              onValueChange={() => this.nightModeAction()}
            />
            <Text style={{ marginLeft: 18, fontSize: 18 }}>Night Mode</Text>     
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  renderChapterList(item, navigation, isNightMode) {
    const { name_simple, name_arabic, verses_count, translated_name, chapter_number, bismillah_pre } = item;
    const params = { id: chapter_number, bismillah_pre, name_arabic };
    const nightThemeContainer = isNightMode ? styles.nightTheme : null;
    const nightThemeBorder = isNightMode ? styles.nightThemeBorder : null;
    const nightThemeText = isNightMode ? styles.nightThemeTxt : null;
    const nightThemeSubText = isNightMode ? styles.nightThemeSubTxt : null;
    const nightThemeArabicText = isNightMode ? styles.nightThemeArabicTxt : null;

    return (
      <TouchableOpacity onPress={() => navigation.navigate('Chapter', params)}>
        <View style={[styles.listContainer, nightThemeContainer, nightThemeBorder]}>
          <View style={styles.leftContainer}>
            <Text style={[styles.titleTxt, nightThemeText]}>{name_simple}</Text>
            <Text style={[styles.subTxt, nightThemeSubText]}>{translated_name.name} ({verses_count})</Text>
          </View>
          <View style={styles.rightContainer}>
            <Text style={[styles.arabicTxt, nightThemeArabicText]}>{name_arabic}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { chapters, navigation, isFetching, isNightMode } = this.props;
    const { searchKey, isModalVisible } = this.state;
    let filteredChapters = chapters.filter((chapter) => {
      return chapter.name_simple.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1;
    });
    const themeNavbar = isNightMode ? styles.nightThemeNavbar : styles.header;
    const themeStatusBar = isNightMode ? '#273238' : '#5acea1';
    const nightThemeContainer = isNightMode ? styles.nightTheme : null;    

    return (
      <Container style={nightThemeContainer}>
        <Header
          searchBar
          rounded
          style={themeNavbar}
          androidStatusBarColor={themeStatusBar}>
          <Item style={{ flex: 6 }}>
            <Icon active name="search" />
            <Input
              placeholder="Search"
              onChangeText={(text) => this.setState({ searchKey: text })}
            />
          </Item>
          <Right>
            <Button
              transparent
              onPress={() => this.toggleModal()}>
              <Icon name='settings' style={{ color: 'white' }} />
            </Button>
          </Right>
        </Header>
        {isFetching && <Spinner color={'#3cb385'} />}
        <FlatList 
          data={filteredChapters}
          renderItem={({ item }) => this.renderChapterList(item, navigation, isNightMode)}
          keyExtractor={() => Math.random()}
          initialNumToRender={115}
          disableVirtualization={true}
        />
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={() => this.setState({ isModalVisible: false })}
        >
          {this.renderSettingModal()}
        </Modal>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  chapters: state.quran.chapters,
  isFetching: state.quran.isFetchingAllChapters,
  translation: state.setting.translation,
  isNightMode: state.setting.isNightMode,
})

const mapDispatchToProps = {
  loadChapters: ChapterActions.getAllChapter,
  setNightMode: SettingActions.setNightMode,
  setNormalMode: SettingActions.setNormalMode,
  setTranslation: SettingActions.setTranslationMode,
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);