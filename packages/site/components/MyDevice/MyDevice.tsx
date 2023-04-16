import React, { FC } from 'react';
import { TMyDevice } from 'data/about';
import { i18n } from 'i18n/i18n';
import { MyImage } from 'components/MyImage/MyImage';

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
			<div className={style.MyDeviceImage}>
				<MyImage src={device.image} width={200} height={200} />
			</div>
		</div>
	);
};
