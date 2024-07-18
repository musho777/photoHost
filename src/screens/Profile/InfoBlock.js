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
        if (user.date_of_birth1) {
            if (user.date_of_birth1.includes('.')) {
                dateComponents = user.date_of_birth1.split('.')
            }
            else {
                dateComponents = user.date_of_birth1.split('-')
            }
            year = dateComponents[0]
            day = dateComponents[2]
            month = dateComponents[1]
        }
        else {
            dateComponents = JSON.stringify(user.date_of_birth)?.substring(0, 11)?.split('-')
            year = dateComponents && dateComponents[0]?.replace(`"`, '')
            day = dateComponents && +dateComponents[2]
            month = dateComponents && dateComponents[1]
        }
        let newDateFormat = ''
        if (month?.length == 1) {
            month = `0${month}`
        }
        if (JSON.stringify(day)?.length == 1 || day.length == 1) {
            day = `0${day}`
        }
        if (day) {
            newDateFormat = `${day}.${month}.${year}`;
        }

        item[0].value = user.city?.name ? user.city?.name : user.city?.value
        item[1].value = newDateFormat
        item[2].value = user.gender ? user.gender : ''
        item[3].value = user.mgu
        item[4].value = user.work_type
        item[5].value = user.web
        item[6].value = user.email
        item[7].value = user.phone
        setData(item)
    }
    useEffect(() => {
        GetData()
    }, [user.mgu, user.phone, user.work_type, user.email, user.gender, user.date_of_birth1, user.city, user.web])


    return <View >
        {data.map((elm, i) => {
            return <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, paddingHorizontal: 5 }} key={i}>
                {elm.svg}
                <Text style={[Styles.darkMedium14, { marginLeft: 10 }]}>
                    {elm.value}
                </Text>
            </View>
        })}
    </View>
}