import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Header, Body, Title, Left, Right, Button, Icon, Spinner, ListItem, CheckBox, Input, Item, Content } from 'native-base';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import Modal from 'react-native-modal';
import { Bismillah, Verse, Translation, Error } from '../components';
import * as ChapterActions from '../redux/ducks/chapterRedux';
import * as TranslationActions from '../redux/ducks/translationRedux';

const styles = StyleSheet.create({
  titleHeaderTxt: {
    fontFamily: 'AmiriQuran',
    fontSize: 22,
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  menuItem: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 4,
  },
  btnClose: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  header: {
    backgroundColor: '#3cb385',
  },
  border: {
    borderBottomWidth: 1,
    borderColor: 'silver',
  },
  nightTheme: {
    backgroundColor: '#303030',
  },
  nightThemeNavbar: {
    backgroundColor: '#36474f',
  },
  nightThemeBorder: {
    borderColor: '#000',
  },
  nightThemeTxt: {
    color: '#fff',
  },
});

class ChapterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      verseJump: '',
    }
    this.renderHeader = this.renderHeader.bind(this);
  }

  componentWillMount() {
    const { id } = this.props.navigation.state.params;
    this.props.getChapter(id);
    this.props.getTranslation(id);
  }

  openMenu() {
    this.menu.open();
  }

  goToVerse() {
    const { surah } = this.props;
    const { verseJump, isModalVisible } = this.state;
    const index = parseInt(verseJump) - 1;
    const size = surah.length;
    if (index >= 0 && index < size) {
      this.verses.scrollToIndex({animated: true, index });
    }
    this.setState({ isModalVisible: !isModalVisible });
  }

  renderMenu() {
    const { isModalVisible } = this.state;
    return (
      <Menu ref={(ref) => { this.menu = ref; }}>
        <MenuTrigger>
          <Icon name='md-more' style={{ color: 'white' }} />
        </MenuTrigger>
        <MenuOptions>
          <MenuOption onSelect={() => this.setState({ isModalVisible: !isModalVisible })}>
            <View style={styles.menuItem}>
              <Text style={{ marginLeft: 8, fontSize: 18 }}>Jump to verse..</Text>
            </View>
          </MenuOption>
        </MenuOptions>
      </Menu>
    );
  }

  renderModalForm() {
    const { isModalVisible } = this.state
    const { surah } = this.props;
    const size = surah.length;

    return (
      <View style={styles.modalContent}>
        <Item style={{ marginBottom: 16 }}>
          <Input 
            keyboardType="numeric"
            placeholder={`Verse number ~ (1 - ${size})`}
            style={{ marginTop: 30 }}
            onChangeText={(text) => this.setState({ verseJump: text })}
            maxLength={size}/>
        </Item>
        <Button
          style={styles.header}
          onPress={() => this.goToVerse()}
          block>
          <Text style={{ color: 'white', fontSize: 16 }}>Go</Text>
        </Button>
        <Button
          success
          transparent
          onPress={() => this.setState({ isModalVisible: !isModalVisible })}
          style={styles.btnClose}
        >
          <Icon name="close"/>
        </Button>
      </View>
    );
  }

  renderHeader() {
    const { bismillah_pre } = this.props.navigation.state.params;
    const { isNightMode } = this.props;
    const nightTheme = isNightMode ? styles.nightThemeTxt : null;
    
    if (bismillah_pre) {
      return <Bismillah style={nightTheme}/>
    } 
    return null;
  }

  renderItem(item, index) {
    const { translation, tafsir, isNightMode } = this.props;
    const nightThemeBorder = isNightMode ? styles.nightThemeBorder : styles.border;

    if (translation) {
      return (
        <View>
          <Verse  data={item} theme={isNightMode} />
          <Translation data={tafsir[index].text} style={nightThemeBorder} theme={isNightMode}/>
        </View>
      );
    }
    return <Verse  data={item} style={nightThemeBorder} theme={isNightMode}/>;
  }

  render() {
    const { surah, navigation, isFetching, isNightMode, isFetchingTranslation, error } = this.props;
    const { name_arabic, id } = navigation.state.params;
    const { isModalVisible } = this.state;
    const themeNavbar = isNightMode ? styles.nightThemeNavbar : styles.header;
    const nightThemeContainer = isNightMode ? styles.nightTheme : null;    
    const themeStatusBar = isNightMode ? '#273238' : '#5acea1';

    return (
      <MenuProvider>
        <Container style={nightThemeContainer}>
          <Header
            style={themeNavbar}
            androidStatusBarColor={themeStatusBar}>
            <Left>
              <Button
                onPress={() => navigation.goBack()} 
                transparent>
                <Icon name='arrow-back' style={{ color: 'white' }} />
              </Button>
            </Left>
            <Body style={{ alignItems: 'flex-end' }}>
              <Title style={styles.titleHeaderTxt}>
                {name_arabic}
              </Title>
            </Body>
            <Right>
              <Button
                transparent
                onPress={() => this.openMenu()}>
                {this.renderMenu()}
              </Button>
            </Right>
          </Header>
          {isFetching && isFetchingTranslation && <Spinner color={'#3cb385'} />}
          {!isFetching && surah && !isFetchingTranslation &&
            <FlatList
              ref={(ref) => { this.verses = ref; }}
              data={surah}
              renderItem={({ item, index }) => this.renderItem(item, index)}
              keyExtractor={() => Math.random()}
              ListHeaderComponent={() => this.renderHeader()}
              initialNumToRender={300}
              disableVirtualization={true}
            />
          }
          {error &&
            <Error onPress={() => {
              this.props.getChapter(id);
              this.props.getTranslation(id);
            }}/>
            }
          <Modal isVisible={isModalVisible} style={styles.bottomModal}>
            {this.renderModalForm()}
          </Modal>
        </Container>
      </MenuProvider>
    );
  }
}

ChapterScreen.propTypes = {
  getChapter: PropTypes.func.isRequired,
  getTranslation: PropTypes.func.isRequired,
  surah: PropTypes.array.isRequired,
  tafsir: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isFetchingTranslation: PropTypes.bool.isRequired,
  isNightMode: PropTypes.bool.isRequired,
  translation: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  surah: state.quran.surah,
  tafsir: state.translation.tafsir,
  isFetching: state.quran.isFetchingChapter,
  isFetchingTranslation: state.translation.isFetchingTranslation,
  isNightMode: state.setting.isNightMode,
  translation: state.setting.translation,
  error: state.quran.error,
});

const mapDispatchToProps = {
  getChapter: ChapterActions.getChapter,
  getTranslation: TranslationActions.getTranslation,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChapterScreen);
