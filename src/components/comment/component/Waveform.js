import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Svg, { Rect } from 'react-native-svg';

export const Waveform = ({ currentTime, waveformData, soundInstance, endReach, isPlaying, index }) => {
  const barWidth = 5;
  const gap = 2;

  const waveformWidth = (waveformData?.length) * (barWidth + gap);
  const [selectedBarIndex, setSelectedBarIndex] = useState(-1);
  const seekToTime = (timeInSeconds) => {
    if (soundInstance) {
      setSelectedBarIndex(timeInSeconds)
      soundInstance.setCurrentTime(timeInSeconds);
    }
  };

  const onGestureEvent = (event) => {
    if (isPlaying == index) {
      const x = (event.nativeEvent.absoluteX - 100);
      const index = Math.floor(x / (barWidth + gap)) / 2;
      seekToTime(index)
      if (index >= 0 && index < waveformData?.length) {
        setSelectedBarIndex(index);
      }
      if (index < 0) {
        setSelectedBarIndex(-1)
      }
      if (index == waveformData?.length - 1) {
        setSelectedBarIndex(-1)
      }
    }
  };

  useEffect(() => {
    if (endReach) {
      setSelectedBarIndex(-1)
    }
  }, [endReach])
  if (isPlaying == null) {
    return <View style={styles.container}>
      <Svg height="50" width={200}>
        {waveformData?.map((height, index) => {
          return <Rect
            key={index}
            x={index * (barWidth + gap)}
            y={25 - height / 2}
            width={barWidth}
            height={height}
            ry={3}
            fill={(selectedBarIndex >= index || Math.floor(currentTime) > index) ? 'rgba(255, 217, 83 ,1)' : 'rgba(214, 214, 214,0.7)'}
          />
        })}
      </Svg>
    </View>
  }
  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <View style={styles.container}>
        <Svg height="50" width={200}>
          {waveformData?.map((height, index) => {
            return <Rect
              key={index}
              x={index * (barWidth + gap)}
              y={25 - height / 2}
              width={barWidth}
              height={height}
              ry={3}
              fill={(selectedBarIndex >= index || Math.floor(currentTime) > index) ? 'rgba(255, 217, 83 ,1)' : 'rgba(214, 214, 214,0.7)'}
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
