import dynamic from "next/dynamic";
import RecordIcon from "./RecordIcon";

const ReactMediaRecorder = dynamic(
  () => import("react-media-recorder").then((mod) => mod.ReactMediaRecorder),
  {
    ssr: false,
  }
);

function RecordMessage({ handleStop }) {
  return (
    <ReactMediaRecorder
      audio
      onStop={handleStop}
      render={({ status, startRecording, stopRecording }) => (
        <div className='mt-2'>
          <button
            onMouseDown={startRecording}
            onMouseUp={stopRecording}
            className='mic_bg p-4'>
            {" "}
            <RecordIcon
              classText={
                status == "recording"
                  ? "animate-pulse text-red-500"
                  : "text-black"
              }
            />
          </button>
          <p className='mt-2 text-black font-light'>
            {status == "recording" && "Recording"}
          </p>
        </div>
      )}
    />
  );
}

export default RecordMessage;
