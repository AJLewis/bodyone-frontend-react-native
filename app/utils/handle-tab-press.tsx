import {usePathname} from 'expo-router';

/**
 * Handle tab press based on the provided route name.
 *
 * @param {string} routeName - The name of the route to navigate to.
 * @param {object} navigation - The navigation object from React Navigation.
 * @param {string[]} routes - An array of valid routes for the tab.
 * @param {string} defaultRoute - The default route to navigate to if the provided routeName is not in the routes array.
 */
function handleTabPress(
    routeName: string,
    navigation: any,
    routes: string[],
    defaultRoute: string,
    defaultScreen: string
) {
    const currentState = navigation.getState();
    const activeTabIndex = currentState.index;
    const activeTab = currentState.routes[activeTabIndex];
    
    if (activeTab.state) {
        const activeStackIndex = activeTab.state.index;
        const activeStackRoute = activeTab.state.routes[activeStackIndex];

        if (defaultRoute == activeStackRoute?.name) {
            navigation.navigate(defaultRoute, {screen: defaultScreen});
            return;
        }
    }

    if (routes.includes(routeName)) {
        if (routeName.includes('/')) {
            const [navigatorName, screenName] = routeName.split('/');
            navigation.navigate(navigatorName, {screen: screenName});
        } else {
            navigation.navigate(routeName);
        }
    } else {
        navigation.navigate(defaultRoute);
    }
}

export default handleTabPress;
