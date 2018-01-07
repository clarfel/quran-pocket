import React, { Component } from 'react';
import { Container, Header, Body, Title, Left, Right, Button, Icon, Spinner, ListItem, CheckBox } from 'native-base';
import { Text, View, ScrollView, FlatList, StyleSheet, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import * as ChapterActions from '../redux/ducks/chapterRedux';
import * as SettingActions from '../redux/ducks/settingRedux';
import { toArabicNumber } from '../utils/arabicText';

const styles = StyleSheet.create({
  arabicTxt: {
    fontFamily: 'quran',
    fontSize: 22,
  },
  ayahContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: 'silver',
  },
  ayahsContent: {
    flex: 9,
    alignItems: 'flex-end',
    paddingHorizontal: 12,
  },
  verseNumContent: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 12,
    paddingTop: 2,
  },
  titleContainer: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'silver',
    paddingVertical: 8,
  },
  titleTxt: {
    fontFamily: 'AmiriQuran',
    fontSize: 28,
  },
  titleHeaderTxt: {
    fontFamily: 'AmiriQuran',
    fontSize: 22,
  }
});

class ChapterScreen extends Component {
  componentWillMount() {
    const { id } = this.props.navigation.state.params;
    this.props.getChapter(id);
  }

  shouldComponentUpdate(nextProps) {
    const { surah, isFetching, isNightMode } = nextProps;
    if (surah === this.props.surah && isFetching === this.props.isFetching && isNightMode === this.props.isNightMode) {
      return false;
    }
    return true;
  }

  renderAyahs(item) {
    const { verse, ayah } = item;
    return (
      <View style={styles.ayahContainer}>
        <View style={styles.verseNumContent}>
          <ImageBackground
            source={require('../../assets/images/black.png')}
            style={{ flex: 1 }}
            imageStyle={{ height: 45, width: 45, resizeMode: 'contain' }}
          >
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={{ fontFamily: 'naskh', fontSize: 16, width: 45, textAlign: 'center', paddingVertical: 9 }}>
                {toArabicNumber(ayah)}
              </Text>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.ayahsContent}>
          <Text style={styles.arabicTxt}>
            {verse}
          </Text>
        </View>
      </View>
    )
  }

  nightModeAction() {
    console.log("change to night mode");
    const { isNightMode } = this.props;
    console.log(isNightMode);
    if (isNightMode) {
      this.props.setNormalMode();
    } else {
      this.props.setNightMode();
    }
  }

  renderMenu() {
    const { isNightMode } = this.props;
    return (
      <Menu>
        <MenuTrigger>
          <Icon name='md-more' style={{ color: 'white' }} />
        </MenuTrigger>
        <MenuOptions>
          <MenuOption onSelect={() => alert(`Save`)}>
            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', paddingVertical: 4 }}>
              <Text style={{ marginLeft: 8 }}>Jump to verse..</Text>
            </View>
          </MenuOption>
          <MenuOption onSelect={() => this.nightModeAction()} >
            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', paddingVertical: 4 }}>
              <CheckBox checked={isNightMode}/>
              <Text style={{ marginLeft: 16 }}>Night Mode</Text>
            </View>
          </MenuOption>
        </MenuOptions>
      </Menu>
    );
  }

  renderBismillah() {
    return (
      <View style={styles.titleContainer}>
        <Text style={styles.titleTxt}>{'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ'}</Text>
      </View>
    )
  }

  render() {
    const { surah, navigation, isFetching, isNightMode } = this.props;
    const { bismillah_pre, name_arabic } = navigation.state.params;
    console.log("bismillah_pre", bismillah_pre);
    return (
      <MenuProvider>
        <Container>
          <Header>
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
              {this.renderMenu()}
            </Right>
          </Header>
          {isFetching && <Spinner color={'blue'} />}
          {!isFetching && surah && 
            <ScrollView>
              {bismillah_pre && this.renderBismillah()}
              <FlatList 
                data={surah}
                renderItem={({ item }) => this.renderAyahs(item)}
                keyExtractor={() => Math.random()}
              />
            </ScrollView>
          }
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
