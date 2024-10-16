import { useCallback, useEffect, useState } from "react"
import { ScrollView, TouchableOpacity, View } from "react-native"
import { CakeSvg, EmailSvg, GenderSvg, LocationSvg, NetWorkSvg, Otrastel, PhoneSvg, ProfetionsSvg, WatchSvg, WorkLocation, WorkLocationSvg } from "../../assets/svg/Svgs"
import { InfoItem } from "./components/infoItem"
import { useFocusEffect } from "@react-navigation/native"
import { InfoArrayItem } from "./components/infoArrayItem"

export const InfoBlock = ({ user }) => {
    const [location, setLocation] = useState('')
    const [date, setDate] = useState('')
    const [gender, setGender] = useState('')
    const [profetion, setProfetion] = useState('')
    const [workLocation, setWorkLocation] = useState('')
    const [userType, setUserType] = useState(true)
    const [web, setWeb] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [graf, setGraf] = useState('')
    const [otrastel, setOtrasel] = useState('')
    const [ooo, setOoo] = useState('')


    const GetData = () => {
        let date = new Date(user.date_of_birth);
        let year = ''
        let month = ''
        let day = ''
        if (user.date_of_birth) {
            year = date.getFullYear();
            month = String(date.getMonth() + 1).padStart(2, '0');
            day = String(date.getDate()).padStart(2, '0');
            setDate(`${day}.${month}.${year}`)
        }
        else {
            setDate(`-`)
        }
        setLocation(user.city?.name ? user.city?.name : '-')
        setGender(user.gender ? user.gender : '-')
        setOoo(user.ooo ? user.ooo : '-')
        setProfetion(user.mgu ? user.mgu : '-')
        setWorkLocation(user.work_type ? user.work_type : '-')
        setWeb(user.web ? user.web : '-')
        setOtrasel(user.otrasl ? user.otrasl : '-')
        setEmail(user.email ? user.email : '-')
        setPhone(user.phone ? user.phone : '-')
        setGraf(user.work_grafik ? user.work_grafik : '-')
        if (user.user_type == 'Legal_entity') {
            setUserType(false)
        }
        else {
            setUserType(true)

        }
    }


    useFocusEffect(
        useCallback(() => {
            GetData()
        }, [user])
    );

    if (userType) {
        return <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableOpacity activeOpacity={1}>
                {userType && <InfoItem svg={<CakeSvg />} value={date} />}
                {userType && <InfoItem svg={<GenderSvg />} value={gender} />}
                {!userType && <InfoItem svg={<EmailSvg />} value={email} />}
                <InfoItem svg={<PhoneSvg />} value={phone} />
                <InfoItem svg={<LocationSvg />} value={location} />
                <InfoItem svg={<Otrastel />} value={otrastel} />
                <InfoItem svg={<WorkLocation />} value={workLocation} />
                <InfoItem svg={<WorkLocationSvg />} value={ooo} />


                <InfoItem svg={<ProfetionsSvg />} value={profetion} />



                {!userType && <InfoItem svg={<NetWorkSvg />} value={web} />}
                {!userType && <InfoItem svg={<WatchSvg />} value={graf} />}
                <View style={{ height: 60, width: '100%' }}></View>
            </TouchableOpacity>
        </ScrollView>
    }
    else {
        return <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableOpacity activeOpacity={1}>
                <InfoItem svg={<LocationSvg />} value={location} />
                <InfoItem svg={<Otrastel />} value={otrastel} />
                <InfoItem svg={<WorkLocationSvg />} value={ooo} />
                <InfoItem svg={<NetWorkSvg />} value={web} />
                <InfoItem svg={<WatchSvg />} value={graf} />
                <InfoItem svg={<PhoneSvg />} value={phone} />
                <InfoItem svg={<EmailSvg />} value={email} />
                {/* <InfoItem svg={<ProfetionsSvg />} value={profetion} /> */}

                <View style={{ height: 60, width: '100%' }}></View>
            </TouchableOpacity>
        </ScrollView>
    }
}