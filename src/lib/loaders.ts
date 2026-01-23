export const loadImage = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });

export const loadAudio = (src: string): Promise<HTMLAudioElement> =>
  new Promise((resolve, reject) => {
    const audio = new Audio(src);
    audio.oncanplaythrough = () => resolve(audio);
    audio.onerror = reject;
  });

export const loadJSON = async (src: string) => {
  const res = await fetch(src);
  if (!res.ok) throw new Error(`Failed to load ${src}`);
  return res.json();
};
