import {BackHandler} from 'react-native';
import {PERMISSIONS, requestMultiple} from 'react-native-permissions';
// import catchAsync from '../utils/catchAsync';

const permissions = async (accesses = []) => {
  try {
    await requestMultiple(accesses);
  } catch (error) {
    return false;
  }
};

export const getAccess = async () => {
  try {
    await permissions([
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.RECORD_AUDIO,
    ]);
  } catch (error) {
    // console.log(error);
    return BackHandler.exitApp();
  }
};
