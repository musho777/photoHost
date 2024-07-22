import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';

const Gif = ({ setSelected }) => {


  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const api_kay = 'vH1C0TVHpNEFoxXFPMFlqIAkGfZ63rIc'

  useEffect(() => {
    fetchGifs();
  }, [page, searchQuery]);


  const fetchGifs = async () => {
    if (loading) return;
    let response = '';
    if (searchQuery) {
      response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${api_kay}&q=${searchQuery}&limit=12&offset=${(page - 1) * 12}`);
    } else {
      response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${api_kay}&limit=12&offset=${(page - 1) * 12}`);
    }
    const result = await response.json();
    setData(prevData => page === 1 ? result.data : [...prevData, ...result.data]);
    setLoading(false);
  };

  const renderItem = ({ item }) => {
    return <TouchableOpacity onPress={() => setSelected(item.images.fixed_width.url)} style={styles.itemContainer}>
      <FastImage source={{ uri: item.images.fixed_width.url }} style={styles.image} />
    </TouchableOpacity>
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <View>
      <View style={{ paddingHorizontal: 20 }}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            value={query}
            onChangeText={setQuery}
            placeholder="Search GIFs"
          />
        </View>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          contentContainerStyle={styles.list}
        />
      </View>
    </View >
  );
};

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
});

export default Gif;
