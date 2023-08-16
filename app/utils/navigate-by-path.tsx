/**
 * Navigate based on the provided path.
 * 
 * @param {object} navigation - The navigation object from React Navigation.
 * @param {string} path - The path to navigate to.
 */
function NavigateByPath(navigation: any, path: string) {
  // Check if the path contains '/'
  if (path.includes('/')) {
    // Split the path into parts
    const [navigatorName, screenName] = path.split('/');

    // Navigate using the navigator name and screen name
    navigation.navigate(navigatorName, { screen: screenName });
  } else {
    // Navigate normally
    navigation.navigate(path);
  }
}

export default NavigateByPath;