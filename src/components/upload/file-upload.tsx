import { ChangeEvent, FC, useState } from 'react';
import { Box, Button } from '@mui/material';

const FileUpload: FC = () => {
  const [files, setFiles] = useState<Array<string | ArrayBuffer | null>>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const rawFiles = Array.from(e.target.files);
    const selectedFilesPromises: Array<Promise<string | ArrayBuffer | null>> =
      [];

    rawFiles.forEach(rawFile => {
      const reader = new FileReader();
      const filePromise: Promise<string | ArrayBuffer | null> = new Promise(
        resolve => {
          reader.onload = () => {
            resolve(reader.result);
          };
          reader.readAsDataURL(rawFile);
        }
      );
      selectedFilesPromises.push(filePromise);
    });
    Promise.all(selectedFilesPromises).then(selectedFile =>
      setFiles(selectedFile)
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {files?.map((file, index) => {
            return (
              <Box
                sx={{
                  padding: '.25rem',
                }}
                key={index}
              >
                <img
                  src={file as string}
                  alt='selected image preview'
                  style={{
                    maxWidth: '250px',
                    maxHeight: '250px',
                  }}
                />
              </Box>
            );
          })}
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button variant='contained' component='label'>
            Select Files
            <input
              type='file'
              hidden
              multiple
              accept='image/png , image/jpeg, image/webp'
              onChange={handleChange}
            />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FileUpload;
