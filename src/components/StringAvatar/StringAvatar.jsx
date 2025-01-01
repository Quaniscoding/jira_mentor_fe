import React from 'react'

export default function StringAvatar(name) {
    if (name) {
        const nameParts = name?.split(' ');
        const initials = nameParts
            .slice(0, 2)
            .map(part => part[0]?.toUpperCase())
            .join('');

        return {
            // sx: {
            //     bgcolor: stringToColor(name),
            // },
            children: initials,
        };
    }
    return null;
}
