import React, { Component } from 'react';
import { Container, Header, Body, Title, Left, Right, Button, Icon, Spinner, ListItem, CheckBox, Input, Item, Content } from 'native-base';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import Modal from 'react-native-modal';
import { Bismillah, Verse } from '../components';
import * as ChapterActions from '../redux/ducks/chapterRedux';
import * as SettingActions from '../redux/ducks/settingRedux';

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
  }

  nightModeAction() {
    const { isNightMode } = this.props;
    if (isNightMode) {
      this.props.setNormalMode();
    } else {
      this.props.setNightMode();
    }
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
    const { isNightMode } = this.props;
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
          <MenuOption onSelect={() => this.nightModeAction()} >
            <View style={styles.menuItem}>
              <CheckBox checked={isNightMode}/>
              <Text style={{ marginLeft: 18, fontSize: 18 }}>Night Mode</Text>
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
          onPress={() => this.goToVerse()}
          block>
          <Text style={{ color: 'white', fontSize: 16 }}>Go</Text>
        </Button>
        <Button
          transparent
          onPress={() => this.setState({ isModalVisible: !isModalVisible })}
          style={styles.btnClose}
        >
          <Icon name='close' />
        </Button>
      </View>
    );
  }

  renderHeader() {
    const { bismillah_pre } = this.props.navigation.state.params;
    if (bismillah_pre) {
      return <Bismillah />
    } 
    return null;
  }

  render() {
    const { surah, navigation, isFetching, isNightMode } = this.props;
    const { name_arabic } = navigation.state.params;
    const { isModalVisible } = this.state;

    return (
      <MenuProvider>
        <Container>
          <Header
            style={styles.header}
            androidStatusBarColor="#5acea1">
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
          {isFetching && <Spinner color={'#3cb385'} />}
          {!isFetching && surah && 
            <FlatList
              ref={(ref) => { this.verses = ref; }}
              data={surah}
              renderItem={({ item }) => <Verse  data={item} />}
              keyExtractor={() => Math.random()}
              ListHeaderComponent={() => this.renderHeader()}
              initialNumToRender={300}
              disableVirtualization={true}
            />
          }
          <Modal isVisible={isModalVisible} style={styles.bottomModal}>
            {this.renderModalForm()}
          </Modal>
        </Container>
      </MenuProvider>
    );
  }
}

const mapStateToProps = state => ({
  surah: state.quran.surah,
  isFetching: state.quran.isFetchingChapter,
  isNightMode: state.setting.isNightMode,
});

const mapDispatchToProps = {
  getChapter: ChapterActions.getChapter,
  setNightMode: SettingActions.setNightMode,
  setNormalMode: SettingActions.setNormalMode,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChapterScreen);
