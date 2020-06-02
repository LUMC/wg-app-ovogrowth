import React, { useEffect } from 'react';
import ReactDOM from 'react-dom'

export const pageLoader = (pageLoaded) => {
    return ReactDOM.createPortal(
        <>
            tersttstst
        </>,
        document.getElementById('test')
    )
}