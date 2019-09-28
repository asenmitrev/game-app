import React from 'react';
import './EventLog.scss';

export default function EventLog({log}) {
    return (
        <div className="event-log">{log}</div>
    )
}