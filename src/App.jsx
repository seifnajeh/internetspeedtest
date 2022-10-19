import { useRef, useState } from "react";
import { BarLoader } from "react-spinners";
import "./App.css";

function App() {
  const [showed, setShowed] = useState(true);

  const Ref = useRef();

  var imageAddr =
    "https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg";
  var downloadSize = 7214054; //bytes

  const ShowProgressMessage = (msg) => {
    if (console) {
      if (typeof msg == "string") {
        console.log(msg);
      } else {
        for (var i = 0; i < msg.length; i++) {
          console.log(msg[i]);
        }
      }
    }

    var oProgress = document.getElementById("test");
    if (oProgress) {
      var actualHTML = typeof msg == "string" ? msg : msg.join("<br />");
      oProgress.innerHTML = actualHTML;
    }
  };

  const InitiateSpeedDetection = () => {
    // ShowProgressMessage("Loading the image, please wait...");
    window.setTimeout(MeasureConnectionSpeed, 1);
  };

  if (window.addEventListener) {
    window.addEventListener("load", InitiateSpeedDetection, false);
  } else if (window.attachEvent) {
    window.attachEvent("onload", InitiateSpeedDetection);
  }

  const MeasureConnectionSpeed = () => {
    var startTime, endTime;
    var download = new Image();
    download.onload = () => {
      setShowed(false);
      endTime = new Date().getTime();
      showResults();
    };

    download.onerror = (err, msg) => {
      ShowProgressMessage("Invalid image, or error downloading");
    };

    startTime = new Date().getTime();
    var cacheBuster = "?nnn=" + startTime;
    download.src = imageAddr + cacheBuster;

    const showResults = () => {
      var duration = (endTime - startTime) / 1000;
      var bitsLoaded = downloadSize * 8;
      var speedBps = (bitsLoaded / duration).toFixed(2);
      var speedKbps = (speedBps / 1024).toFixed(2);
      var speedMbps = (speedKbps / 1024).toFixed(2);
      ShowProgressMessage(["Debit mta3ek tawa:", speedMbps + " Mbps"]);
    };
  };
  return (
    <div className="App">
      <BarLoader color="#ffffff" loading={showed} size={150} />
      <div id="test" ref={Ref}></div>
    </div>
  );
}

export default App;
