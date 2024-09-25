import { useCallback, useEffect, useState } from "react"
import { ScrollView, TouchableOpacity } from "react-native"
import { CakeSvg, EmailSvg, GenderSvg, LocationSvg, NetWorkSvg, Otrastel, PhoneSvg, ProfetionsSvg, WatchSvg, WorkLocation } from "../../assets/svg/Svgs"
import { InfoItem } from "./components/infoItem"
import { useFocusEffect } from "@react-navigation/native"

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

    return <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity activeOpacity={1}>
            {userType && <InfoItem svg={<CakeSvg />} value={date} />}
            <InfoItem svg={<LocationSvg />} value={location} />
            <InfoItem svg={<Otrastel />} value={otrastel} />
            <InfoItem svg={<ProfetionsSvg />} value={profetion} />
            <InfoItem svg={<WorkLocation />} value={workLocation} />
            {!userType && <InfoItem svg={<NetWorkSvg />} value={web} />}
            {!userType && <InfoItem svg={<WatchSvg />} value={graf} />}
            {userType && <InfoItem svg={<GenderSvg />} value={gender} />}
            <InfoItem svg={<EmailSvg />} value={email} />
            <InfoItem svg={<PhoneSvg />} value={phone} />
        </TouchableOpacity>
    </ScrollView>
}