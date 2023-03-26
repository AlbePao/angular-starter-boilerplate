import { AppTheme } from '@lib/services/theme';

type StorageObjectMap = {
  'App/session': {
    user: string;
    token: string;
  };
  'App/theme': AppTheme;
};

export type StorageObjectType = keyof StorageObjectMap;

export type StorageObjectData<T extends StorageObjectType> = {
  type: T;
  data: StorageObjectMap[T];
};
