import React, { FC, ReactElement } from 'react';
import { Nav } from 'features/navigation';
import { i18n } from 'i18n/i18n';
import { range } from 'utils/utils';
import style from './ZoomWord.module.css';

type ZoomWordProps = Pick<Nav, "nameLang"> & { children: ReactElement };

export const ZoomWord: FC<ZoomWordProps> = ({ nameLang, children }) => {
    return (
        <div className={style.ZoomWord}>
            <div className={style.ZoomWordList}>
                {range(0, 6).map((i) => (
                    <span key={i} className={style.ZoomWordListText}>
                        {i18n.t(nameLang)}
                    </span>
                ))}
            </div>
            { children }
        </div>
    );
};
