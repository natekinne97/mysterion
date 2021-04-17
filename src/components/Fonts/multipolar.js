import React from 'react'
import { idGenerator } from './service'
import { get, isEmpty } from 'lodash'
import { useState } from 'react'
import fontStyle from './fontStyle'

const Multipolar = ({ fonts }) => {
    const [ selectedFont, setSelectedFont ] = useState(null)
    const [ allowEdit, setAllowEdit ] = useState(false)

    if (!fonts) return null

    const fontStyles = get(fonts, 'styles')

    const handleChange = (change) => {
        setSelectedFont(change)
    }

    const makeEditable = () => {
        if (!allowEdit) {
            setAllowEdit(true)
        }
    }

    // fonts
    return (
        <div className={fontStyle.fonts}>

            <div className={fontStyle.fontContainer}>
                {/*  */}
                <div className={fontStyle.fontNamesTitle}>
                    {/* font-names */}
                    <div>
                        {/* font-class-name */}
                        <p className="text-red-600 text-opacity-100">{fonts?.title}</p>
                        <div className={fontStyle.variants}>
                            {!isEmpty(fontStyles) && fontStyles.map(font => (
                                <h4 style={{ fontFamily: font }} key={idGenerator(309)}>{font}</h4>
                            ))}
                        </div>
                    </div>
                    <h3 className="char">&?</h3>
                </div>
                <div className={fontStyle.selector}>
                    <select className="type-selector" onChange={e => handleChange(e.target.value)}>
                        {!isEmpty(fontStyles) && fontStyles.map(font => (
                            <option key={idGenerator(200)} value={font}>{font}</option>
                        ))}
                    </select>
                    <p className={fontStyle.selectorP}>Type with specimen</p>
                </div>
                <p onClick={makeEditable} className={fontStyle.tryFont} style={{ fontFamily: selectedFont }} contentEditable={allowEdit}>
                    "They promised us flying cars but all we got was 150 characters" - Peter Thiel
                </p>
            </div>
        </div>
    )
}

export default Multipolar
