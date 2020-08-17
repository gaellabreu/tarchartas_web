import React from 'react'
import { Panel } from 'rsuite'

const descriptionStyle = {
    maxHeight: '100px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
}

export default (props) => {

    return <Panel shaded bordered bodyFill style={{ width: 240 }} className={'move'}>
        <img src={props.image_content? `data:image/png; base64, ${props.image_content}` : 'https://via.placeholder.com/240x240'} height="240" alt=""/>
        <Panel header={props.name.toUpperCase()}>
            <p style={descriptionStyle}>
                <small>{props.description.toUpperCase()}</small>
            </p>
        </Panel>
    </Panel>
}

