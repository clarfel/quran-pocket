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
})

class Translation extends Component {
  render() {
    const { data, style } = this.props;

    return(
      <View style={[styles.tafsirContainer, style]}>
        <Text style={styles.tafsirTxt}>{data}</Text>
      </View>
    );
  }
}

export default Translation;