import "./Camera.css";
import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  RefObject,
} from "react";
import { useNavigate } from "react-router-dom";
import { backendAxios } from "../../utils/axiosConfig";
import { BACKEND_UPLOAD_IMAGE_REQUEST } from "../../static/url";
import { useErrorContext } from "../../contexts/useContext";
import { ERROR_ROUTE } from "../../static/routes";
import { backButton, mainButton, webApp } from "../../telegram/webApp";

export const Camera: React.FC = () => {
  const videoRef: RefObject<HTMLVideoElement> = useRef(null);
  const canvasRef: RefObject<HTMLCanvasElement> = useRef(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>("");
  const navigate = useNavigate();

  // error handling
  const errorContext = useErrorContext();

  const handleError = useCallback(
    (error: { message: string }) => {
      errorContext.setError(error.message);
      console.log(errorContext.errorMessage);
      navigate(ERROR_ROUTE, { replace: true });
    },
    [errorContext, navigate]
  );

  const sendPhotoToBackend = useCallback(
    async (photoBlob: Blob) => {
      // if (!user) {
      //   console.error("User data is not available");
      //   return;
      // }

      try {
        // TODO
        const formData = new FormData();
        formData.append("photo", photoBlob, "photo.jpg");

        const response = await backendAxios.post(
          BACKEND_UPLOAD_IMAGE_REQUEST,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // const response = await fetch("http://localhost:3000/upload-image", {
        //   method: "POST",
        //   body: formData,
        // });

        // if (!response.ok) {
        //   throw new Error(`HTTP error! status: ${response.status}`);
        // }

        //const result = JSON.parse(response.data);
        //console.log(result.message);
      } catch (error) {
        // HANDLE ERROR
        console.error("Error sending photo to backend:", error);
        handleError({ message: "Error sending photo to backend:" + error });
      }
    },
    [handleError]
  );

  const takePhoto = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (blob) {
        setPhoto(URL.createObjectURL(blob));
        sendPhotoToBackend(blob);
      }
    }, "image/jpeg");
  }, [sendPhotoToBackend]);

  useEffect(() => {
    const getDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput" && device.label
        );
        setDevices(videoDevices);
        if (videoDevices.length > 0) {
          setSelectedDeviceId(videoDevices[0].deviceId);
        } else {
          setError("No camera devices found");
        }
      } catch (err) {
        console.error("Error enumerating devices", err);
        setError(
          "Error enumerating devices: " + (err as { message: string }).message
        );
      }
    };

    getDevices();
  }, []);

  useEffect(() => {
    const startCamera = async (videoElement: HTMLVideoElement | null) => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const constraints = {
            video: {
              deviceId: selectedDeviceId
                ? { exact: selectedDeviceId }
                : undefined,
            },
          };
          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          if (videoElement) {
            videoElement.srcObject = stream;
            videoElement.play();
          }
        } catch (err) {
          console.error("Error accessing the camera", err);
          setError(
            "Error accessing the camera: " +
              (err as { message: string }).message
          );
        }
      } else {
        setError("getUserMedia is not supported by your browser");
      }
    };

    const videoElement = videoRef.current;

    if (selectedDeviceId) {
      startCamera(videoElement);
    }

    return () => {
      if (videoElement && videoElement.srcObject) {
        (videoElement.srcObject as MediaStream)
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, [selectedDeviceId]);

  useEffect(() => {
    if (!webApp) return;

    const backButtonOnClick = () => {
      mainButton.hide();
      navigate("/");
    };

    if (error) {
      mainButton.hide();
    } else {
      mainButton.show();
      mainButton.setText("Make photo");
      mainButton.onClick(takePhoto);
    }

    if (!backButton.isVisible) {
      backButton.show();
    }

    backButton.onClick(backButtonOnClick);

    return () => {
      mainButton.offClick(takePhoto);
      backButton.offClick(backButtonOnClick);
    };
  }, [error, navigate, takePhoto]);

  const requestCameraAccess = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      setError(null);
    } catch (err) {
      console.error("Error accessing the camera", err);
      setError(
        "Error accessing the camera: " + (err as { message: string }).message
      );
    }
  };

  return (
    <div className="component Camera">
      {error && (
        <div>
          <p style={{ color: "red" }}>{error}</p>
          <button className="adjustable-button" onClick={requestCameraAccess}>
            Request Camera Access
          </button>
        </div>
      )}
      {!error && (
        <div>
          <video ref={videoRef} autoPlay className="capture-block"></video>
          <br />
          <div>
            <label htmlFor="videoSource">Select Camera: </label>
            <select
              id="videoSource"
              className="select-custom"
              onChange={(e) => setSelectedDeviceId(e.target.value)}
              value={selectedDeviceId}
            >
              {devices.map((device) => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label || `Camera ${devices.indexOf(device) + 1}`}
                </option>
              ))}
            </select>
          </div>
          <canvas ref={canvasRef} className="canvas"></canvas>
          {photo && (
            <div>
              <h2>Captured Photo:</h2>
              <img src={photo} alt="Captured" className="capture-block" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Camera;
