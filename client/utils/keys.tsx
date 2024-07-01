const ignoredKeys = [
  "Enter",
  "Delete",
  "Tab",
  "CapsLock",
  "Shift",
  "Control",
  "Alt",
  "Meta",
  "Escape",
  "Fn",
  "FnLock",
  "Hyper",
  "Super",
  "OS",
  // Up, down, left and right keys
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  // volume keys
  "AudioVolumeUp",
  "AudioVolumeDown",
  "AudioVolumeMute",
  // special keys
  "End",
  "PageDown",
  "PageUp",
  "Clear",
  "Home",
  "CapsLock",
  "Shift",
  "Control",
  "Alt",
  "Meta",
];

export const isIgnoredKey = (key: string): boolean => {
  if (ignoredKeys.includes(key)) return true;
  return false;
};
