import React from 'react'
import ToggleSwitch from './Tooggle'
const Labstatus = () => {
    return (
        <div className='lab'>
            <div>
            <ToggleSwitch label="A-wing" />
            </div>
            <div>
            <ToggleSwitch label="b-wing" />
            </div>
            <div>
            <ToggleSwitch label="c-wing" />
            </div>
            <div>
            <ToggleSwitch label="D-wing" />
            </div>
        </div>
    )
}

export default Labstatus