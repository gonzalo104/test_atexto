export default async (url) => {
  const res = await window.fetch(url)
  const audioBlob = await res.blob()
  const audioUrl = await URL.createObjectURL(audioBlob)
  const audio = await new window.Audio(audioUrl)
  return { audioBlob, audioUrl, audio }
}
