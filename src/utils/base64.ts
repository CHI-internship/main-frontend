export async function base64(file: any) {
  const reader = new FileReader()
  const stringBase64 = await new Promise(resolve => {
    reader.onload = () => resolve(reader.result)
    reader.readAsDataURL(file)
  }).then(data => data).catch(() => '')

  return stringBase64
}
