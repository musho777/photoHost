import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { FlatList, PermissionsAndroid, Platform, RefreshControl, StatusBar, Text, View } from "react-native"
import Contacts from 'react-native-contacts';
import { Api } from "../../store/action/action";
import { SearchItem } from "../Search/component/searchItem";
import { Styles } from "../../styles/Styles";
import { t } from "../../components/lang";
import { useSelector } from "react-redux";

export const ContactsPage = ({ navigation }) => {

  const [myContacts, setMyContacts] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [nextPage, setNextPage] = useState(null)
  const [data, setData] = useState([])
  const mainData = useSelector(st => st.mainData);




  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: 'Contacts Permission',
            message: 'This app needs access to your contacts.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true;
    }
  };


  const getContacts = async () => {
    const hasPermission = await requestPermission();
    if (hasPermission) {
      Contacts.getAll()
        .then(contacts => {
          const phoneNumbers = contacts.map(contact => ({
            name: contact.displayName,
            phoneNumbers: contact.phoneNumbers.map(phone => phone.number),
          }));
          setMyContacts(phoneNumbers)
        })
        .catch(error => {
          console.error(error);
        });
    } else {
    }
  };

  const SincronContacts = async (contact) => {
    setLoading(true)
    var myHeaders = new Headers();
    const token = await AsyncStorage.getItem('token')
    myHeaders.append('Authorization', `Bearer ${token}`);
    let phones = []

    contact.map((elm, i) => {
      if (elm.phoneNumbers[0]) {
        phones.push(elm.phoneNumbers[0])
      }
    })
    var formdata = new FormData();
    formdata.append("phones[]", phones);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    fetch(`${Api}/search_user`, requestOptions)
      .then(response => response.json())
      .then(r => {
        if (r.status) {
          setLoading(false)
          let item = data
          r.data.data.map((elm, i) => {
            item.push(elm)
          })
          setNextPage(r.data.next_page_url)
          setData(item)
        }
        else {
          setLoading(false)
        }
      })
      .catch(error => {
        setLoading(false)
      });
  }

  const renderItem = ({ item }) => {
    return (
      <View style={{ marginHorizontal: 15 }}>
        <SearchItem
          key={item.id}
          data={item}
        />
      </View>
    );
  };

  useEffect(() => {
    if (myContacts) {
      SincronContacts(myContacts)
    }
  }, [myContacts])

  useEffect(() => {
    requestPermission()
    getContacts()
  }, [])

  return <View style={{ marginTop: 10 }}>
    <FlatList
      refreshControl={
        <RefreshControl refreshing={loading} />
      }
      keyExtractor={item => item.id.toString()}
      data={data}
      enableEmptySections={true}
      ListEmptyComponent={() => {
        if (!loading) {
          return <Text style={[Styles.darkMedium14, { textAlign: 'center' }]}>{t(mainData.lang).Notfound}</Text>;
        }
      }}
      renderItem={renderItem}
      onEndReached={() => {
        if (nextPage) {
          setPage(page + 1)
        }
      }}
    />
  </View>
}