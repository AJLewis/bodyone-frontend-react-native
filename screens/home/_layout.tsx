import React, { useContext } from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {CustomTheme} from '../../theme/ICustomTheme';
import {PremiumBannerOrganism} from '../../components/premium-banner/PremiumBannerOrganism';
import {HorizontalInfoCardScroll} from '../../templates/horizontal-info-card-scroll-template/HorizontalInfoCardScroll';
import { WORKOUT_ACTIONS } from '../../constants/WorkoutActions';
import { MEAL_ACTIONS } from '../../constants/MealActions';
import { FetchStreaksAward } from '../../services/api/Streaks';
import { UserContext, useUser} from '../../contexts/UserContext';
import { ButtonTabs } from '../../templates/button-tabs/ButtonTabs';

const Home: React.FC = () => {
    const { theme } = useUser();
    const {colors } = theme as CustomTheme
    const context = useContext(UserContext);

    // 
    
    // const loadHomepageData = async () => {
    //     try {
    //       // 1. Fetch streaks award
    //       const streaksAward = await FetchStreaksAward(context?.user?.id);
            
    //       // 2. Fetch 'coming up' data
    //       const currentTime = new Date().getHours();
    //       const nextMeal = await fetchNextMeal(currentTime);
    //       const nextWorkout = await fetchNextWorkout();
      
    //       // 3. Fetch leaderboards
    //       const leaderboards = await fetchLeaderboards();
      
    //       // 4. Fetch today's dietary stats
    //       const todaysDietaryStats = await fetchTodaysDietaryStats();
      
    //       // 5. Fetch today's workout plan
    //       const todaysWorkoutPlan = await fetchTodaysWorkoutPlan();
      
    //       // 6. Fetch today's meal plans
    //       const todaysMealPlans = await fetchTodaysMealPlans();
      
    //       // 7. Fetch health progress charts
    //       const healthProgressCharts = await fetchHealthProgressCharts();
      
    //       return {
    //         streaksAward,
    //         comingUp: { nextMeal, nextWorkout },
    //         leaderboards,
    //         todaysDietaryStats,
    //         todaysWorkoutPlan,
    //         todaysMealPlans,
    //         healthProgressCharts,
    //       };
    //     } catch (error) {
    //       console.error("Error loading homepage data:", error);
    //       throw error;
    //     }
    //   };
    
    const cardData = [ 
      { type: "Meal", title: "Breakfast", data: [ { title: 'Calories:', value: '612 cals' }, { title: 'Fat:', value: '12g' }, { title: 'Protein:', value: '2g' }, { title: 'Carbs:', value: '3g' }, ], dataTitle: 'Blackberry and Banana Porridge', imageSource: require('../../assets/images/food.png'), iconName: 'food-croissant', fixedSize: 280, actions: MEAL_ACTIONS },
      { type: "Workout", title: "Strength", data: [ { title: 'Time:', value: '60 mins' }, { title: 'Cals:', value: '612' }, { title: 'Focus:', value: 'Arms' } ], dataTitle: 'Weight Training', imageSource: require('../../assets/images/strength.png'), iconName: 'arm-flex', fixedSize: 280, actions: WORKOUT_ACTIONS },
    ]
    return (
        <ScrollView style={{...styles.container, backgroundColor: colors.background}}>
            {/* <View style={{...styles.banner, ...styles.banner}}>
                <PremiumBannerOrganism />
            </View> */}
            <View style={{...styles.wrapper}}>
                {/* <View>
                    <HorizontalInfoCardScroll
                    title="Coming up next"
                    cardsData={cardData}
                    />
                </View> */}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingBottom: 30,
        flex: 1,
    },
    banner: {
        marginTop:1,
        marginBottom:25
    },
    wrapper: {
      marginBottom: 10
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 25,
        textAlign: 'center',
    }
});

export default Home;
