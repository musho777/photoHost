import React, { useRef, useState, useEffect } from 'react';
import { View, PanResponder, StyleSheet } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Svg, { Rect } from 'react-native-svg';

export const Waveform = ({ waveformData }) => {
  const barWidth = 5;  // Width of each bar
  const gap = 2;        // Gap between bars
  const waveformWidth = (waveformData.length) * (barWidth + gap);
  const [selectedBarIndex, setSelectedBarIndex] = useState(-1);
  // Handle swiping
  const onGestureEvent = (event) => {
    const x = event.nativeEvent.absoluteX - 100;
    console.log(x, 'xxxxx')
    const index = Math.floor(x / (barWidth + gap)); // Calculate the index of the bar
    if (index >= 0 && index < waveformData.length) {
      setSelectedBarIndex(index);
    }
    if (index < 0) {
      setSelectedBarIndex(-1)
    }
  };
  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <View style={styles.container}>
        <Svg height="50" width={200}>
          {waveformData.map((height, index) => {
            return <Rect
              key={index}
              x={index * (barWidth + gap)}  // Calculate x position with width and gap
              y={25 - height / 2}  // Position vertically in the middle
              width={barWidth}
              height={height}
              ry={3}
              fill={selectedBarIndex >= index ? 'rgba(255, 217, 83 ,1)' : 'rgba(214, 214, 214,0.7)'}
            />
          })}
        </Svg>
      </View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    // borderWidth: 1,
  },
});
