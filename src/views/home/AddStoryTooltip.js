import React from 'react'
import Tooltip from '@mui/material/Tooltip';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import PhotoIcon from '@mui/icons-material/Photo';
import { Box, Typography } from '@mui/material';
import styled from '@emotion/styled';

const AddStoryPopupIcon = styled(({ icon: IconComponent, ...props }) => (
    <IconComponent {...props} />
))({
    height: '100px',
    width: '100px',
    color: '#C69C48',
    background: "#F4D480",
    padding: "20px",
    borderRadius: "50%",
    cursor: 'pointer',
})

const AddStoryTooltip = ({ open, setCurrentScreen, onChangeHandler, children }) => {
    return <Tooltip
        title={
            <Box>
                <Typography sx={{ mb: 1, fontSize: '16px', fontWeight: 600, }}>SELECT STORY PHOTO</Typography>
                <Box sx={{ display: 'flex', gap: 2, p: 2 }}>
                    <AddStoryPopupIcon icon={PhotoCameraIcon} />
                    <label htmlFor="story-upload" className="moment-file-upload1"  >
                        <AddStoryPopupIcon icon={PhotoIcon} />
                    </label>
                    <input id="story-upload" type="file" onChange={onChangeHandler} />
                </Box>
            </Box>
        }
        componentsProps={{
            tooltip: {
                sx: {
                    px: 5,
                    py: 3,
                    borderRadius: 2.5,
                    backgroundColor: "#1f2430f0",
                    width: "auto",
                    maxWidth: "450px",
                    // ml: 24,
                },
            },
            arrow: {
                sx: {
                    color: "#1F2430",
                },
            },
        }}
        open={open}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        placement="bottom-start"
        arrow
    >
        {children}
    </Tooltip>
}

export default AddStoryTooltip;
