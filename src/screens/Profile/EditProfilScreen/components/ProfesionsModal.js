import { Modal, StyleSheet, View, ScrollView, TouchableOpacity, Text } from "react-native";
import { Input } from "../../../../ui/Input";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { t } from '../../../../components/lang';
import { AppColors } from "../../../../styles/AppColors";

export const ProfesionsModal = ({ visible, close, onPress }) => {
  const [search, setSearch] = useState('');
  const mainData = useSelector(st => st.mainData);
  const [profesions, setProfesins] = useState([])

  const constProfesions = [
    "Агрохимия",
    "Авиационные перевозки",
    "Автомобильные перевозки",
    "Автомобилестроение",
    "Альтернативные виды топлива",
    "Анимация и мультимедиа",
    "Аренда автомобилей",
    "Архивное дело и библиотечное обслуживание",
    "Архитектура и дизайн",
    "Биотехнологии",
    "Благотворительность и НКО",
    "Ветеринария",
    "Возобновляемая энергетика",
    "Водоснабжение и очистка сточных вод",
    "Гидроэнергетика",
    "Горнодобывающая промышленность",
    "Гостиницы и хостелы",
    "Гражданское строительство",
    "Дистанционная поддержка (аутсорсинг)",
    "Дизайн и архитектура",
    "Детские сады и ясли",
    "Еда и напитки",
    "Железнодорожные перевозки",
    "Здравоохранение",
    "Игровая индустрия",
    "Информационные технологии",
    "Картографическая промышленность",
    "Кибербезопасность",
    "Киберспорт",
    "Киноиндустрия",
    "Кондитерская промышленность",
    "Косметическая индустрия",
    "Культура и искусство",
    "Климатические технологии",
    "Легкая промышленность",
    "Логистика и складское хозяйство",
    "Машиностроение",
    "Медицинское оборудование",
    "Медицинские услуги",
    "Метеорология",
    "Микроэлектроника",
    "Недвижимость",
    "Нанотехнологии",
    "Облачные вычисления",
    "Образование",
    "Общественные организации",
    "Онлайн-образование",
    "Организация мероприятий",
    "Пивоварение",
    "Планирование и проектирование",
    "Почтовая служба",
    "Психология и психотерапия",
    "Разработка программного обеспечения",
    "Робототехника",
    "Рынок труда",
    "Садоводство и ландшафтный дизайн",
    "Сельское хозяйство",
    "Семейные услуги",
    "Синтетические материалы",
    "Спасательные службы",
    "Спорт и фитнес",
    "Страхование",
    "Строительство",
    "Табачная промышленность",
    "Текстильная промышленность",
    "Торговля",
    "Транспорт и логистика",
    "Туризм и гостиничный бизнес",
    "Управление отходами",
    "Управление недвижимостью",
    "Фармацевтика",
    "Финансовый сектор",
    "Финансовое консультирование",
    "Химическая промышленность",
    "Цифровая экономика",
    "Частные охранные предприятия",
    "Энергетика",
    "Электроприборы",
    "Электронная коммерция",
    "Юридические услуги",
    "Экология и охрана окружающей среды"
  ];


  useEffect(() => {
    setProfesins(constProfesions)
  }, [])


  const SearcProfesions = (e) => {
    setSearch(e)
    let data = profesions.filter(elm => elm.toUpperCase().includes(e.toUpperCase()))
    setProfesins(data)
    if (e == '') {
      setProfesins(constProfesions)
    }
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => close()}
          style={styles.centeredView}>
          <View style={styles.modalView}>
            <Input
              onChange={e => {
                SearcProfesions(e);
              }}
              value={search}
              placeholder={t(mainData.lang).search}
            />
            <ScrollView
              showsVerticalScrollIndicator={false}
              scrollEventThrottle={400}
            >
              {profesions.map((elm, i) => (
                <TouchableOpacity key={i} onPress={() => {
                  onPress(elm);
                  close();
                }}>
                  <Text key={i} style={styles.modalText}>{elm}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
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
    color: 'black',
    color: AppColors.BaliHai_Color,
  },
  loadingMore: {
    paddingVertical: 10,
  },
});
