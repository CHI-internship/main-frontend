import { IBase64Documents } from '../types'

export async function base64(file: any) {
  const reader = new FileReader()
  const stringBase64 = await new Promise(resolve => {
    reader.onload = () => resolve(reader.result)
    reader.readAsDataURL(file)
  }).then(data => data).catch(() => '')

  return stringBase64
}

export async function multipleBase64(files: any) {
  const base64Files: IBase64Documents[] = [];
  for (let i = 0; i < files.length; i++) {
    const file = files.item(i);
    const fileExt = file.type.split('/')[1];
    const base64File = await base64(file).then((data: any) => data); // fix any
    base64Files.push({ base64File, ext: fileExt });
  }
  return base64Files;
}
