import { useState, useEffect } from "react";
import { BarLoader } from "react-spinners";
import "./App.css";

function App() {
  const [showed, setShowed] = useState(true);
  const [speed, setSpeed] = useState(null);
  const [wait, setWait] = useState(true);

  var imageAddr =
    "https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg";
  var downloadSize = 7214054; //bytes

  useEffect(() => {
    // on mount
    MeasureConnectionSpeed();
    return () => {
      // dismount
    };
  }, []);

  const MeasureConnectionSpeed = () => {
    var startTime, endTime;
    var download = new Image();
    download.onload = () => {
      setShowed(false);
      endTime = new Date().getTime();
      showResults();
    };

    download.onerror = (err, msg) => {
      setSpeed("Error");
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
      setSpeed(speedMbps);
    };
  };
  setTimeout(() => {
    setWait(false);
  }, 5000);
  if (showed)
    return (
      <div className="App">
        <BarLoader color="#ffffff" loading={showed} size={150} />
        {!wait && (
          <div id="wait-msg">
            Stanna chwaya, tnajem to9eed chwaya seconds okhrin :)
          </div>
        )}
      </div>
    );
  return (
    <div className="App">
      <div id="test">
        Debit mtaak (ta9riban) <br />
        {speed} Mbps
      </div>
    </div>
  );
}

export default App;
