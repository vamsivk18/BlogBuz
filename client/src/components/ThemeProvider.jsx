import { useSelector } from 'react-redux'

import React from 'react'

function ThemeProvider({children}) {
    const {theme} = useSelector(state=>state.theme)
    return (
        <div className={theme}>
            <div className='dark:text-gray-200 dark:bg-[rgb(12,23,42)] min-h-screen'>
                {children}
            </div>
        </div>
    )
}

export default ThemeProvider