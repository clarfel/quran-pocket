import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import * as ChapterAction from '../redux/ducks/chapterRedux';

class ChapterScreen extends Component {
  componentWillMount() {
    const { id } = this.props.navigation.state.params;
    this.props.getChapter(id);
  }

  render() {
    console.log(this.props.surah);
    return (
      <View>
        <Text>Chapter Screen</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  surah: state.quran.surah,
});

const mapDispatchToProps = {
  getChapter: ChapterAction.getChapter,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChapterScreen);
