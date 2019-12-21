import React from 'react'

import {
    Input,
    Icon,
} from '@jibrelcom/ui'
import style from './style.scss'
import isRequired from 'utils/validators/isRequired'
import {useI18n} from 'app/i18n'


interface DirectorFieldsProps {
    isPrimary: boolean;
    index?: number;
    deleteHandler: () => void;
}


export const DirectorFields: React.FunctionComponent<DirectorFieldsProps>  = ({ isPrimary, index = 0, deleteHandler}) => {
    const i18n = useI18n()
    return  (
        <section>
            {!isPrimary &&
            <div className={style.additionalTitle}>
              <h2 className={style.title}>Director {index+1}</h2>
              <Icon name='ic_close_24' onClick={deleteHandler}/>
            </div>
            }

            <Input
                name={`directors[${index}].fullName`}
                label="Full Legal Name"
                validate={isRequired({i18n})}
            />
        </section>
    )
}
