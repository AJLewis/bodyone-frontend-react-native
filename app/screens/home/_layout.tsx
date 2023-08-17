import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {CustomTheme} from '../../../theme/ICustomTheme';
import {PremiumBannerOrganism} from '../../components/premium-banner/PremiumBannerOrganism';
import {HorizontalInfoCardScroll} from '../../templates/horizontal-info-card-scroll-template/HorizontalInfoCardScroll';

const Home: React.FC = () => {
    const {colors} = useTheme() as CustomTheme;
    const cardData = [ 
      { title: "Breakfast", data: [ { title: 'Calories:', value: '612 cals' }, { title: 'Fat:', value: '12g' }, { title: 'Protein:', value: '2g' }, { title: 'Carbs:', value: '3g' }, ], dataTitle: 'Blackberry and Banana Porridge', imageSource: require('../../../assets/images/food.png'), iconName: 'food-croissant', fixedSize: 280 },
      { title: "Strength", data: [ { title: 'Time:', value: '60 mins' }, { title: 'Cals:', value: '612' }, { title: 'Focus:', value: 'Arms' } ], dataTitle: 'Weight Training', imageSource: require('../../../assets/images/strength.png'), iconName: 'arm-flex', fixedSize: 280 },
    ]
    return (
        <View style={styles.container}>
            <View style={{...styles.banner}}>
                <PremiumBannerOrganism />
            </View>
            <View style={{...styles.wrapper}}>
                <View>
                <HorizontalInfoCardScroll
                  title="Coming up"
                  cardsData={cardData}
                />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
    },
    wrapper: {
      marginTop: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    banner: {},
});

export default Home;
