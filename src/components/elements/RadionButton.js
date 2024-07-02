import { Radio } from '@mui/material'

const RadionButton = ({ title, checked, onChange }) => {
    return (
        <button className='custom-radio-button' onClick={onChange}>
            <Radio size="sm" checked={checked}
                sx={{
                    '&, &.Mui-checked': {
                        color: '#CDA956',
                    }
                    
                }} />
            {title ? title : 'Radio Button'}
        </button>
    )
}

export default RadionButton
