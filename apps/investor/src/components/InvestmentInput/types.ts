import React from 'react'

export type OnChangeHandler<T = HTMLInputElement> = ((event: React.ChangeEvent<T>) => void) | void;
