import React, { useEffect } from 'react';

export const pageLoader = (pageLoaded) => {
    if(pageLoaded) return null;
    alert('test')
    return (
        <div>
            Loading
        </div>
    );
}