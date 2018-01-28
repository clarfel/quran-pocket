import React, { Component } from 'react';
import { View, ImageBackground, Text, StyleSheet } from 'react-native';
import { toArabicNumber } from '../utils/arabicText';

const styles = StyleSheet.create({
  arabicTxt: {
    fontFamily: 'quran',
    fontSize: 22,
    color: '#222',
  },
  ayahContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  ayahsContent: {
    flex: 9,
    alignItems: 'flex-end',
    paddingHorizontal: 12,
  },
  verseNumContainer: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 12,
    paddingTop: 2,
  },
  verseImage: {
    height: 45,
    width: 45,
    resizeMode: 'contain',
  },
  verseNumTxt: {
    fontFamily: 'naskh',
    fontSize: 16,
    width: 45,
    textAlign: 'center',
    paddingVertical: 9
  },
  verseNumContent: {
    flex: 1,
    alignItems: 'center'
  },
  nightTheme: {
    backgroundColor: '#303030',
  },
  nightThemeArabicTxt: {
    color: '#ececec',
  },
  nightThemeSubTxt: {
    color: '#9c9c9c',
  },
  nightThemeNavbar: {
    backgroundColor: '#36474f',
  },
  nightThemeBorder: {
    borderColor: '#333',
  },
});

class Verse extends Component {
  render() {
    const { data, style, theme } = this.props;
    const { verse, ayah } = data;
    const nightThemeBorder = theme ? styles.nightThemeBorder : null;
    const nightThemeArabicText = theme ? styles.nightThemeArabicTxt : null;
    const nightThemeSubText = theme ? styles.nightThemeSubTxt : null;
    const verseImage = theme ? require('../../assets/images/white.png') : require('../../assets/images/black.png'); 

    return (
      <View style={[styles.ayahContainer, style, nightThemeBorder]}>
        <View style={styles.verseNumContainer}>
          <ImageBackground
            source={verseImage}
            style={{ flex: 1 }}
            imageStyle={styles.verseImage}
          >
            <View style={styles.verseNumContent}>
              <Text style={[styles.verseNumTxt, nightThemeSubText]}>
                {toArabicNumber(ayah)}
              </Text>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.ayahsContent}>
          <Text style={[styles.arabicTxt, nightThemeArabicText]}>
            {verse}
          </Text>
        </View>
      </View>
    );
  }
}

export default Verse;