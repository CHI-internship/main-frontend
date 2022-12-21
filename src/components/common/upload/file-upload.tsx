import { Box, Button } from '@mui/material';
import { ChangeEvent } from 'react';

import { base64 } from '../../../utils';

interface IFileUploadProps {
  callback: (param: any) => void
  multiple?: boolean
}

export const FileUpload: React.FC<IFileUploadProps> = ({ callback, multiple }) => {
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      let result
      if (multiple) {
        result = []
        for (let file of Array.from(e.target.files)) {
          const stringBase64 = await base64(file)
          if (stringBase64) result.push(stringBase64)
        }
      } else result = await base64(e.target.files[0])
      callback(result)
    }
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Button variant='contained' component='label'>
        {multiple ? 'Select files' : 'Select'}
        <input type='file' hidden multiple={multiple}
          accept='image/png , image/jpeg, image/webp'
          onChange={handleChange} />
      </Button>
    </Box>
  )
}

FileUpload.defaultProps = {
  multiple: false
}