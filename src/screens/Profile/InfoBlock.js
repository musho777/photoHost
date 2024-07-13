import { useEffect, useState } from "react"
import { Text, View } from "react-native"
import { CakeSvg, EmailSvg, GenderSvg, LocationSvg, NetWorkSvg, PhoneSvg, ProfetionsSvg, WorkLocation } from "../../assets/svg/Svgs"
import { Styles } from "../../styles/Styles"

export const InfoBlock = ({ user }) => {
    const [data, setData] = useState([
        { svg: <LocationSvg />, value: '' },
        { svg: <CakeSvg />, value: '' },
        { svg: <GenderSvg />, value: '' },
        { svg: <ProfetionsSvg />, value: '' },
        { svg: <WorkLocation />, value: '' },
        { svg: <NetWorkSvg />, value: '' },
        { svg: <EmailSvg />, value: '' },
        { svg: <PhoneSvg />, value: '' },
    ])


    const GetData = () => {
        let item = [...data]
        let dateComponents = ''
        let year = ''
        let day = ''
        let month = ''
        console.log(user.date_of_birth1, 'user.date_of_birth1')
        if (user.date_of_birth1) {
            if (user.date_of_birth1.includes('.')) {
                dateComponents = user.date_of_birth1.split('.')
            }
            else {
                dateComponents = user.date_of_birth1.split('-')
            }
            console.log(dateComponents, 'dateComponents')
            year = dateComponents[0]
            day = dateComponents[1]
            month = dateComponents[2]
        }
        else {
            dateComponents = JSON.stringify(user.date_of_birth)?.substring(0, 11)?.split('-')
            year = dateComponents && dateComponents[0]?.replace(`"`, '')
            day = dateComponents && dateComponents[2]
            month = dateComponents && +dateComponents[1]
        }

        if (day?.length == 1) {
            day = `0${day}`
        }
        if (month?.length == 1) {
            month = `0${month}`
        }
        let newDateFormat = ''
        if (month < 10) {
            month = '0' + month
        }
        if (day) {
            newDateFormat = `${day}.${month}.${year}`;
        }
        item[1].value = newDateFormat
        item[2].value = user.gender
        item[6].value = user.email
        item[7].value = user.phone
        setData(item)
    }
    useEffect(() => {
        GetData()
    }, [user.date_of_birth1])
    return <View >
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, paddingHorizontal: 5 }}>
            <LocationSvg />
            <Text style={[Styles.darkMedium14, { marginLeft: 10 }]}>
                {user.city?.name}
            </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, paddingHorizontal: 5 }}>
            <CakeSvg />
            <Text style={[Styles.darkMedium14, { marginLeft: 10 }]}>
                {data[1].value}
            </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, paddingHorizontal: 5 }}>

        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, paddingHorizontal: 5 }}>
            <ProfetionsSvg />
            <Text style={[Styles.darkMedium14, { marginLeft: 10 }]}>
                {user.mgu}
            </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, paddingHorizontal: 5 }}>
            <WorkLocation />
            <Text style={[Styles.darkMedium14, { marginLeft: 10 }]}>
                {user.work_type}
            </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, paddingHorizontal: 5 }}>
            <NetWorkSvg />
            <Text style={[Styles.darkMedium14, { marginLeft: 10 }]}>
                {user.web}
            </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, paddingHorizontal: 5 }}>
            <EmailSvg />
            <Text style={[Styles.darkMedium14, { marginLeft: 10 }]}>
                {user.email}
            </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, paddingHorizontal: 5 }}>
            <PhoneSvg />
            <Text style={[Styles.darkMedium14, { marginLeft: 10 }]}>
                {user.phone}
            </Text>
        </View>
        {/* {data.map((elm, i) => {
            return <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, paddingHorizontal: 5 }} key={i}>
                {elm.svg}
                <Text style={[Styles.darkMedium14, { marginLeft: 10 }]}>
                    {elm.value}
                </Text>
            </View>
        })} */}
    </View>
}