import Accordion from "@gapur/react-native-accordion"
import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native"
import { Styles } from "../../styles/Styles"
import { SafeAreaView } from "react-native-safe-area-context"

export const AboutApplication = () => {
  return <SafeAreaView style={{ paddingHorizontal: 15 }}>
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ gap: 15, marginBottom: 10, }}>
        <Text style={Styles.balihaiMedium13}>Chamba – это приложение для любителей снимать крутые фото и короткие видео событий,
          <View>
            <Text style={styles.line}>
              происходящих не с нами, а вокруг нас!
            </Text>
          </View>
        </Text>
        <Text style={Styles.balihaiMedium13}>
          Представляем приложение, которое перевернет Вашу  ленту и заставит Вас увидеть мир по-новому!
        </Text>
        <View style={{ justifyContent: 'center', alignContent: 'center', flexDirection: 'row', marginTop: 0, marginBottom: 0 }}>
          <Text style={[[{ fontSize: 16, textAlign: 'center', width: 'auto' }, styles.line]]}>
            Вот то, что мы приготовили для Вас:
          </Text>
        </View>
        <Text style={Styles.balihaiMedium13} >
          <Text style={styles.line}>Персональная лента:
            {"\n"}
          </Text>После быстрой регистрации, Вы выбираете любимые рубрики, а их более 35, и получаете контент, подходящий именно Вам!
        </Text>
      </View>
      <View style={{ gap: 15, marginBottom: 20 }}>
        <Text style={Styles.balihaiMedium13}>
          <Text style={[styles.line, { borderBottomWidth: 0 }]}>
            Попутный контент:{"\n"}
          </Text>
          Любите путешествовать? Выбрав эту рубрику, яркий, динамичный, лайтовый  и красочный контент будет предложен вместе с такими рубриками как фрукты, овощи, еда и напитки, города и страны, активный отдых, экстрим, развлечения, природа, времена года, охота и рыбалка, и релакс.                                                                                    Интересуетесь недвижимостью? Мы предложим Вам не только крутой контент о новостройках, но и попутно идеи для строительства, ремонта, ландшафтного дизайна, и даже информацию о строительных инструментах!
          Автоматическая категоризация:Загружаете фото своей любимой собачки? Мы сразу предложим загрузить ее в рубрику “Животные” и покажем его людям, которые обожают пушистых друзей!
          Загружаете фото своей любимой спортивной машины? Мы сразу предложим загрузить ее в рубрику “Транспорт” и Ваш контент точно отправиться тем людям, которые не подписаны на Вас, но выбрали данную рубрику.
          Локальный контент: Получайте контент в первую очередь со своего города! Фестивали, события, интересные места, природные явления и многое другое - все это в Вашей ленте!
        </Text>
        <Text style={Styles.balihaiMedium13}>
          <Text style={[styles.line, { borderBottomWidth: 0 }]}>
            Автоматическая категоризация:
            {"\n"}
          </Text>
          Обожаете свою любимую собачку? Мы сразу предложим загрузить ее в рубрику “Животные” и покажем тем людям, которые любят маленьких пушистиков!
          Вы балдеете от своей спортивной машины? Загрузив ее в рубрику “Транспорт”, Ваш контент направится точно тем людям, которые выбрали эту рубрику.
        </Text>

        <Text style={Styles.balihaiMedium13}>
          <Text style={[styles.line, { borderBottomWidth: 0 }]}>
            Локальный контент:{"\n"}
          </Text>
          Получайте контент в первую очередь со своего города! Фестивали, события, интересные места, природные явления и многое другое - все это в Вашей ленте!
        </Text>

        <Text style={Styles.balihaiMedium13}>
          <Text style={[styles.line, { borderBottomWidth: 0 }]}>
            Информация о коллегах по сфере/отрасли:{"\n"}
          </Text>
          Вы риэлтор, строитель, блогер, бармен, шеф-повар, предоставляете товары и услуги? Мы аккуратно предложим Вам контент от Ваших коллег, как работают другие специалисты, и будьте в курсе последних трендов!
        </Text>

        <Text style={Styles.balihaiMedium13}>
          <Text style={[styles.line, { borderBottomWidth: 0 }]}>
            Скоростная работа:{"\n"}
          </Text>
          Смотрите контент и выкладывайте свои фото в мгновение ока!
        </Text>
        <Text style={Styles.balihaiMedium13}>
          <Text style={[styles.line, { borderBottomWidth: 0 }]}>
            Разнообразие контента:{"\n"}
          </Text>
          От спокойных пейзажей до захватывающих событий, у нас найдется что-то для каждого!
        </Text>
        <Text style={Styles.balihaiMedium13}>
          <Text style={[styles.line, { borderBottomWidth: 0 }]}>
            Активность просмотров:{"\n"}
          </Text>
          Каждый пользователь может посмотреть подробную статистику по загруженной публикации.
          Не тратьте время на скучную ленту! Скачайте приложение и окунитесь в мир интересных открытий!
        </Text>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={[Styles.balihaiMedium13, styles.line, { borderBottomWidth: 0 }]}>Рекомендации</Text>
        <Text style={Styles.balihaiMedium13}>Автор канала не выкладывает:</Text>
        <Text style={[Styles.balihaiMedium13,]}>-Запрещенный контент</Text>
        <Text style={[Styles.balihaiMedium13,]}>-Чужой фото и видео контент</Text>
      </View>
    </ScrollView>                                                                                                                                  
  </SafeAreaView >  
}    

const styles = StyleSheet.create({
  line: {
    color: "#000",
    fontWeight: "700",
    borderBottomColor: "#000",
    borderBottomWidth: 1,
  }
})