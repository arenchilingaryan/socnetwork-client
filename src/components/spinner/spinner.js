import React from 'react'
import './spinner.scss'

export default function Spinner() {
    return (
        <div className="backdrop">
            <div className="spinner"></div>
            <div className="logo">loding...</div>
        </div>
    )
}
