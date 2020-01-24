import React from 'react'
import { useI18n } from '@jibrelcom/i18n'

import {
  Icon,
  Input,
} from '@jibrelcom/ui'

import isRequired from 'utils/validators/isRequired'

import style from '../style.scss'

interface DirectorFieldsProps {
  deleteHandler: () => void;
  index?: number;
  isPrimary: boolean;
}

export const DirectorFields: React.FunctionComponent<DirectorFieldsProps>  = ({
  deleteHandler,
  index = 0,
  isPrimary,
}) => {
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
