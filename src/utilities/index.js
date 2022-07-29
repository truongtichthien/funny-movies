export const joinCls = (array) => array.filter((e) => !!e).join(' ');

export const validateYouTubeUrl = (url) => {
  const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  const match = url.match(regExp);
  if (match && match[1].length === 11) { // YouTube video ID is almost 11 characters
    return match[1];
  }
  return false;
}
