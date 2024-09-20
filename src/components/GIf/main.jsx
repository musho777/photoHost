import React, { useState, useMemo, forwardRef } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { BootomModal } from '../BootomSheet';
import Gif from './Gif';
import { GifSvg, GifSvg1, StickerSvg, StickerSvg1 } from '../../assets/svg/Svgs';
import Sticker from './Stickers';

const Main = forwardRef(({ SendSticker }, ref) => {
  const [showGif, setShowGif] = useState(false)
  const snapPoints = useMemo(() => ['80%'], []);

  return (
    <View>
      <BootomModal ref={ref} snapPoints={snapPoints}>
        {showGif ?
          <Gif setSelected={(e) => SendSticker(e)} /> :
          <Sticker setSelected={(e) => SendSticker(e)} />
        }
        <View style={styles.sticker}>
          <TouchableOpacity onPress={() => setShowGif(false)}>
            {showGif ?

              < StickerSvg /> :
              <StickerSvg1 />
            }
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowGif(true)}>
            {showGif ?
              <GifSvg1 /> :
              <GifSvg />
            }

          </TouchableOpacity>
        </View>
      </BootomModal>
    </View >
  );
});

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginRight: 10,
  },
  list: {
    backgroundColor: 'white',
  },
  itemContainer: {
    flex: 1,
    margin: 1,
    height: 'auto'
  },
  image: {
    height: 200,
    objectFit: 'contain',
    width: '100%',
  },
  sticker: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.9)',
    zIndex: 999,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15
  }
});

export default Main;
