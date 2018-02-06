import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, ViewPropTypes } from 'react-native';

const Bismillah = ({ style }) => {
  return (
    <View style={styles.titleContainer}>
      <Text style={[styles.titleTxt, style]}>{'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ'}</Text>
    </View>
  );
};

Bismillah.propTypes = {
  style: ViewPropTypes.style,
};

Bismillah.defaultProps = {
  style: {},
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
