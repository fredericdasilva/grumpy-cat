export async function isMicrophoneAllowed() {
  //console.log("isMicrophoneAllowed");
  navigator.permissions
    .query({
      name: "microphone",
    })
    .then(function (permissionStatus) {
      return permissionStatus.state === "granted";
    });
}

export function enableAutoTTS() {
  if (typeof window === "undefined") {
    return;
  }
  const isiOS =
    navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
  if (!isiOS) {
    return;
  }
  const simulateSpeech = () => {
    const lecture = new SpeechSynthesisUtterance("hello");
    lecture.volume = 0;
    speechSynthesis.speak(lecture);
    document.removeEventListener("click", simulateSpeech);
  };

  document.addEventListener("click", simulateSpeech);
}
