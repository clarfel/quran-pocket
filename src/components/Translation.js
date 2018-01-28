import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  tafsirContainer: {
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  tafsirTxt: {
    color: '#05c46b',
  },
  nightThemeTxt: {
    color: '#77bbb1',
  },
});

class Translation extends Component {
  render() {
    const { data, style, theme } = this.props;
    const nightThemeText = theme ? styles.nightThemeTxt : styles.tafsirTxt;

    return(
      <View style={[styles.tafsirContainer, style]}>
        <Text style={nightThemeText}>{data}</Text>
      </View>
    );
  }
}

export default Translation;