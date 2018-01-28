import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Bismillah = ({ style }) => {
  console.log(style);
  return (
    <View style={styles.titleContainer}>
      <Text style={[styles.titleTxt, style]}>{'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'silver',
    paddingVertical: 8,
  },
  titleTxt: {
    fontFamily: 'AmiriQuran',
    fontSize: 28,
    color: '#222',
  },
});

export default Bismillah;