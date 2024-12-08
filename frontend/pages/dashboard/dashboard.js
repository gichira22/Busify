import { useEffect, useState } from "react";
import mqtt from "mqtt";

export default function Dashboard() {
  const [busLocation, setBusLocation] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    const client = mqtt.connect("mqtt://broker.hivemq.com");
    client.on("connect", () => {
      client.subscribe("busify/locations");
    });

    client.on("message", (topic, message) => {
      const location = JSON.parse(message.toString());
      setBusLocation(location);
    });

    return () => {
      client.end();
    };
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <h1 className="text-3xl text-blue-600 font-bold">
        Bus Tracking Dashboard
      </h1>
      <p className="mt-4 text-lg">
        Current Bus Location: Lat {busLocation.lat}, Lng {busLocation.lng}
      </p>
      {/* Add Map Component Here */}
    </div>
  );
}
