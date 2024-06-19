import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { useErrorContext } from "../contexts/useContext";
import { useNavigate } from "react-router-dom";
import { ERROR_ROUTE } from "../static/routes";

const DATA_AVAILABLE_EVENT = "dataavailable";

//

export const VideoFromCamera = () => {
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);

  // error handling
  // TODO CAN IT BE EXTRACTED AS A REUSABLE SOMETHING???
  const errorContext = useErrorContext();
  const navigate = useNavigate();

  const handleError = useCallback(
    (error: { message: string }) => {
      errorContext.setError(error.message);
      navigate(ERROR_ROUTE, { replace: true });
    },
    [errorContext, navigate]
  );

  //

  const handleDataAvailable = useCallback(
    (event: BlobEvent) => {
      if (event.data.size > 0) {
        setRecordedChunks((prev) => prev.concat(event.data));
      }
    },
    [setRecordedChunks]
  );

  const handleStartCaptureClick = useCallback(() => {
    if (webcamRef.current && webcamRef.current.stream) {
      //
      setCapturing(true);
      try {
        mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
          mimeType: "video/webm",
        });
        mediaRecorderRef.current.addEventListener(
          DATA_AVAILABLE_EVENT,
          handleDataAvailable
        );
        mediaRecorderRef.current.start();
      } catch (error) {
        handleError({ message: (error as Error).message });
      }
    } else {
      handleError({ message: "Webcam stream not found" });
    }
  }, [
    webcamRef,
    setCapturing,
    mediaRecorderRef,
    handleError,
    handleDataAvailable,
  ]);

  const handleStopCaptureClick = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setCapturing(false);
    }
  }, [mediaRecorderRef, setCapturing]);

  const handleDownload = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style.display = "none";
      a.href = url;
      a.download = "react-webcam-stream-capture.webm";
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

  return (
    <>
      <Webcam audio={false} mirrored={true} ref={webcamRef} />
      {capturing ? (
        <button onClick={handleStopCaptureClick}>Stop Capture</button>
      ) : (
        <button onClick={handleStartCaptureClick}>Start Capture</button>
      )}
      {recordedChunks.length > 0 && (
        <button onClick={handleDownload}>Download</button>
      )}
      {/* TODO: add take a picture button */}
    </>
  );
};
