import { useEffect, useState } from "react"
import { ScrollView, Text, View } from "react-native"
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
        console.log(user)
        let item = [...data]
        item[0].value = user.city?.name
        item[1].value = user.date_of_birth?.substring(0, 11)
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
    return <ScrollView style={{ paddingHorizontal: 0 }}>
        {data.map((elm, i) => {
            return <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }} key={i}>
                {elm.svg}
                <Text style={[Styles.darkMedium14, { marginLeft: 10 }]}>
                    {elm.value}
                </Text>
            </View>
        })}
    </ScrollView>
}