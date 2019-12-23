import React from 'react'

import {
    BigButton,
} from '@jibrelcom/ui'
import {router} from 'app/router'

import ProfileLayout from 'layouts/ProfileLayout'

import style from './style.scss'

export default () => (
    <ProfileLayout>
        <div className={style.background}>
            <h1 className={style.title}>
                {'Success!'}
            </h1>

            <div className={style.content}>
                <h2 className={style.subtitle}>
                    {'We\'re Verifying Your Identity'}
                </h2>
                <article className={style.article}>
                    {'This can take from 1-5 business days. Once we\'ve verified your details, you will receive a confirmation via email. Meanwhile, you can view the investment opportunities on Jibrel.'}
                </article>
            </div>

            <BigButton className={style.submit} onClick={() => router.navigate('Account')}>
                {'BACK TO MAIN'}
            </BigButton>
        </div>
    </ProfileLayout>
)
