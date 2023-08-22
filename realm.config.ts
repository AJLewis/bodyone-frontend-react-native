import { Theme } from '@react-navigation/native';
import Realm from 'realm';
import UserSchema from './schemas/User.model';
import ThemeSchema from './schemas/Theme.model';
import NavigationMenuSchema from './schemas/NavigationMenu.model';

export const realm = new Realm({ schema: [UserSchema, ThemeSchema, NavigationMenuSchema] });