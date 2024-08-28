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
    "Разработка программного обеспечения",
    "Кибербезопасность",
    "Анализ данных",
    "Сетевые технологии",
    "Банковские услуги",
    "Инвестиции",
    "Страхование",
    "Финансовый анализ",
    "Лечение и диагностика",
    "Фармацевтика",
    "Медицинские исследования",
    "Биотехнологии",
    "Начальное, среднее и высшее образование",
    "Онлайн-обучение",
    "Разработка учебных программ",
    "Научные исследования",
    "Машиностроение",
    "Химическая промышленность",
    "Легкая промышленность",
    "Продукты питания и напитки",
    "Строительство зданий и сооружений",
    "Недвижимость и управление объектами",
    "Градостроительство",
    "Архитектура и дизайн",
    "Грузоперевозки",
    "Пассажирские перевозки",
    "Управление цепями поставок",
    "Складирование и дистрибуция",
    "Добыча нефти и газа",
    "Электроэнергетика",
    "Альтернативные источники энергии",
    "Энергоэффективность",
    "Мобильные сети",
    "Интернет-провайдеры",
    "Спутниковая связь",
    "Радиовещание и телевидение",
    "Растениеводство",
    "Животноводство",
    "Агрохимия",
    "Переработка сельхозпродукции",
    "Гостиничный бизнес",
    "Рестораны и кафе",
    "Экскурсионные услуги",
    "Курортные и развлекательные комплексы",
    "Адвокатская практика",
    "Судебная система",
    "Нотариат",
    "Правовое консультирование",
    "Продуктовый ритейл",
    "Э-коммерция",
    "Одежда и аксессуары",
    "Торговые центры",
    "Кино и телевидение",
    "Музыка и звукозапись",
    "Видеоигры",
    "Издательское дело",
    "Фундаментальные исследования",
    "Прикладные исследования",
    "Лабораторные исследования",
    "Научные публикации"

  ]

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
