import { Modal, StyleSheet, View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { Input } from "../../../../ui/Input";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Api, GetCitysAction } from "../../../../store/action/action";
import { Styles } from "../../../../styles/Styles";
import { t } from '../../../../components/lang';
import { AppColors } from "../../../../styles/AppColors";
import axios from "axios";

export const CityModal = ({ visible, close, onPress, setCountry_id, country_id }) => {
    const [searchCitys, setSearchCitys] = useState('');
    const [page, setPage] = useState(1);
    const getCitys = useSelector((st) => st.getCitys);
    const staticdata = useSelector(st => st.static);
    const mainData = useSelector(st => st.mainData);
    const [country, setCounty] = useState({})
    const [countyLoading, setCountryLoading] = useState(true)
    const [countyPage, setCountyPage] = useState(1)
    const [city, setCity] = useState(false)
    const [selectedCounty, setSelectedCountry] = useState(null)

    const dispatch = useDispatch();

    const getCountr = () => {
        axios.post(`${Api}/get_country`, { page: countyPage, }).then((r) => {
            console.log(r.data.data)
            setCounty(r.data.data)
            setCountryLoading(false)
        })
            .catch((r) => {
                setCountryLoading(false)
            })
    }



    useEffect(() => {
        if (city) {
            dispatch(GetCitysAction({ search: searchCitys, page, country_id: selectedCounty }, staticdata.token));
        }
    }, [searchCitys, page, city]);

    useEffect(() => {
        getCountr()
    }, [countyPage])


    const handleLoadMore = () => {
        if (getCitys?.nextPage) {
            setPage(prevPage => prevPage + 1);
        }
    };

    const LoadeMoreCounty = () => {
        if (country?.nextPage) {
            setCountyPage(prevPage => prevPage + 1);
        }
    }

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
            >
                {city ? <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => close()}
                    style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Input
                            onChange={e => {
                                setSearchCitys(e);
                                setPage(1); // Reset page when searching
                            }}
                            value={searchCitys}
                            placeholder={t(mainData.lang).search}
                        />
                        {getCitys?.loading && page === 1 ? (
                            <View style={Styles.loading}>
                                <ActivityIndicator size="large" color="#FFC24B" />
                            </View>
                        ) : (
                            <ScrollView
                                keyboardShouldPersistTaps="handled"
                                showsVerticalScrollIndicator={false}
                                onScroll={({ nativeEvent }) => {
                                    if (nativeEvent.contentOffset.y + nativeEvent.layoutMeasurement.height >= nativeEvent.contentSize.height - 20) {
                                        handleLoadMore();
                                    }
                                }}
                                scrollEventThrottle={400}
                            >
                                {getCitys.data?.map((elm, i) => (
                                    <TouchableOpacity key={i} onPress={() => {
                                        onPress({ name: elm.name, id: elm.id });
                                        close();
                                    }}>
                                        <Text key={i} style={styles.modalText}>{elm.name}</Text>
                                    </TouchableOpacity>
                                ))}
                                {!getCitys.loading && getCitys.data.length === 0 &&
                                    <Text style={styles.modalText}>такого города не существует</Text>
                                }
                            </ScrollView>
                        )}
                    </View>
                </TouchableOpacity> :
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => close()}
                        style={styles.centeredView}>
                        <View style={styles.modalView}>
                            {countyLoading && page === 1 ? (
                                <View style={Styles.loading}>
                                    <ActivityIndicator size="large" color="#FFC24B" />
                                </View>
                            ) : (
                                <ScrollView
                                    keyboardShouldPersistTaps="handled"
                                    showsVerticalScrollIndicator={false}
                                    onScroll={({ nativeEvent }) => {
                                        if (nativeEvent.contentOffset.y + nativeEvent.layoutMeasurement.height >= nativeEvent.contentSize.height - 20) {
                                            LoadeMoreCounty();
                                        }
                                    }}
                                    scrollEventThrottle={400}
                                >
                                    {country.data?.map((elm, i) => {
                                        return <TouchableOpacity key={i} onPress={() => {
                                            setSelectedCountry(elm.id)
                                            setCountry_id(elm.id)
                                            setCity(true)
                                            // onPress({ name: elm.name, id: elm.id });
                                            // close();
                                        }}>
                                            <Text key={i} style={styles.modalText}>{elm.name.trim()}</Text>
                                        </TouchableOpacity>
                                    })}
                                </ScrollView>
                            )}
                        </View>
                    </TouchableOpacity>
                }
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%',
        height: 300,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color: AppColors.BaliHai_Color,
    },
    loadingMore: {
        paddingVertical: 10,
    },
});
