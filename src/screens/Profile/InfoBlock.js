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
        item[0].value = user.city?.name
        const dateComponents = JSON.stringify(user.date_of_birth)?.substring(0, 11)?.split('-')
        const year = dateComponents && dateComponents[0]?.replace(`"`, '')
        const day = dateComponents && dateComponents[2]
        let month = dateComponents && +dateComponents[1]

        let newDateFormat = ''
        if (month < 10) {
            month = '0' + month
        }
        if (day) {
            newDateFormat = `${day}.${month}.${year}`;
        }

        item[1].value = newDateFormat
        item[2].value = user.gender
        item[3].value = user.mgu
        item[4].value = user.work_type
        item[5].value = user.web
        item[6].value = user.email
        item[7].value = user.phone
        setData(item)
    }
    useEffect(() => {
        GetData()
    }, [user])
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