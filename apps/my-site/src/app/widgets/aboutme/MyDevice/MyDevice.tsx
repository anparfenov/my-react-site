import React, { FC } from 'react';
import { TMyDevice } from '#lib/data/about';
import { i18n } from '#lib/i18n/i18n';

import style from './MyDevice.module.css';

type MyDeviceProps = {
  device: TMyDevice;
};

export const MyDevice: FC<MyDeviceProps> = ({ device }) => {
  return (
    <div className={style.MyDevice}>
      <div className={style.MyDeviceLabel}>
        <h4>{i18n.t(device.labelLang)}</h4>
        <p className={style.MyDeviceName}>{device.name}</p>
      </div>
    </div>
  );
};
