import { useEffect, useState } from "react"
import { ScrollView, TouchableOpacity } from "react-native"
import { CakeSvg, EmailSvg, GenderSvg, LocationSvg, NetWorkSvg, PhoneSvg, ProfetionsSvg, WatchSvg, WorkLocation } from "../../assets/svg/Svgs"
import { InfoItem } from "./components/infoItem"

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


    const GetData = () => {
        let date = new Date(user.date_of_birth);

        const year = date.getFullYear();
        console.log(date, '11')
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        setDate(`${day}.${month}.${year}`)
        setLocation(user.city?.name ? user.city?.name : '-')
        setGender(user.gender ? user.gender : '-')
        setProfetion(user.mgu ? user.mgu : '-')
        setWorkLocation(user.work_type ? user.work_type : '-')
        setWeb(user.web ? user.web : '-')
        setEmail(user.email ? user.email : '-')
        setPhone(user.phone ? user.phone : '-')
        setGraf(user.work_grafik ? user.work_grafik : '-')
        console.log(user.user_type)
        if (user.user_type == 'Legal_entity') {
            setUserType(false)
        }
    }
    useEffect(() => {
        GetData()
    }, [user.mgu, user.phone, user.work_type, user.email, user.gender, user.date_of_birth, user.city, user.web])


    return <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity activeOpacity={1}>
            <InfoItem svg={<LocationSvg />} value={location} />
            {userType && <InfoItem svg={<CakeSvg />} value={date} />}
            {userType && <InfoItem svg={<GenderSvg />} value={gender} />}
            <InfoItem svg={<ProfetionsSvg />} value={profetion} />
            <InfoItem svg={<WorkLocation />} value={workLocation} />
            {!userType && <InfoItem svg={<NetWorkSvg />} value={web} />}
            {!userType && <InfoItem svg={<WatchSvg />} value={graf} />}
            <InfoItem svg={<EmailSvg />} value={email} />
            <InfoItem svg={<PhoneSvg />} value={phone} />
        </TouchableOpacity>
    </ScrollView>
}