import { Dimensions } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const getDeviceInfo = () => {
  const deviceType = DeviceInfo.getDeviceType();
  const deviceModel = DeviceInfo.getModel();
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  return {
    deviceType: mapDeviceType(deviceType),
    deviceModel,
    screenWidth: screenWidth.toString(),
    screenHeight: screenHeight.toString(),
  };
};

const mapDeviceType = (type: string) => {
  switch (type) {
    case 'Handset':
      return 'phone';
    case 'Tablet':
      return 'tablet';
    case 'Tv':
      return 'tv';
    case 'Unknown':
    default:
      return 'unknown';
  }
};

export default getDeviceInfo;