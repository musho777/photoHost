import React, { useState, useEffect, useRef, useMemo, forwardRef } from 'react';
import { View, Image, StyleSheet, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetModal } from '@gorhom/bottom-sheet';
import { FlatList } from 'react-native-gesture-handler';
import { BootomModal } from '../BootomSheet';
import FastImage from 'react-native-fast-image';
import Gif from './Gif';
import { GifSvg, StickerSvg } from '../../assets/svg/Svgs';
import Sticker from './Stickers';

const Main = forwardRef(({ }, ref) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const bottomSheetRef = useRef(null);
  const [showGif, setShowGif] = useState(false)
  const api_kay = 'vH1C0TVHpNEFoxXFPMFlqIAkGfZ63rIc'


  const snapPoints = useMemo(() => ['80%'], []);
  return (
    <View>
      <BootomModal ref={ref} snapPoints={snapPoints}>
        {showGif ?
          <Gif /> :
          <Sticker />
        }
        <View style={styles.sticker}>
          <TouchableOpacity onPress={() => setShowGif(false)}>
            <StickerSvg />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowGif(true)}>
            <GifSvg />
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
