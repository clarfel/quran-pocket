import React, { Component } from 'react';
import { Container, Header, Body, Title, Left, Right, Button, Icon, Spinner } from 'native-base';
import { Text, View, ScrollView, FlatList, StyleSheet, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import * as ChapterAction from '../redux/ducks/chapterRedux';
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
  }
});

class ChapterScreen extends Component {
  componentWillMount() {
    const { id } = this.props.navigation.state.params;
    this.props.getChapter(id);
  }

  shouldComponentUpdate(nextProps) {
    const { surah, isFetching } = nextProps;
    if (surah === this.props.surah && isFetching === this.props.isFetching) {
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

  render() {
    const { surah, navigation, isFetching } = this.props;
    
    return (
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
            <Title>
              {surah.name}
            </Title>
          </Body>
          <Right/>
        </Header>
        {isFetching && <Spinner color={'blue'} />}
        {!isFetching && surah && 
          <ScrollView>
            <FlatList 
              data={surah}
              renderItem={({ item }) => this.renderAyahs(item)}
              keyExtractor={() => Math.random()}
            />
          </ScrollView>
        }
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  surah: state.quran.surah,
  isFetching: state.quran.isFetchingChapter,
});

const mapDispatchToProps = {
  getChapter: ChapterAction.getChapter,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChapterScreen);
