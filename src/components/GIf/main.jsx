import React, { useState, useMemo, forwardRef } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { BootomModal } from '../BootomSheet';
import Gif from './Gif';
import { GifSvg, GifSvg1, StickerSvg, StickerSvg1 } from '../../assets/svg/Svgs';
import Sticker from './Stickers';
import Sound from 'react-native-sound';
import { useDispatch, useSelector } from 'react-redux';
import { newMessageAction } from '../../store/action/action';

const Main = forwardRef(({ route }, ref) => {

  const [showGif, setShowGif] = useState(false)
  const snapPoints = useMemo(() => ['80%'], []);
  const music = new Sound('send.mp3', Sound.MAIN_BUNDLE, (error) => { });
  const staticdata = useSelector(st => st.static);
  const dispatch = useDispatch()

  const SendSticker = (e) => {
    music.play()
    setTimeout(() => {
      music.stop()
    }, 2000);
    dispatch(newMessageAction({ message: e, receiver_id: route.params.id }, staticdata.token));
    ref.current?.close()
  }

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
